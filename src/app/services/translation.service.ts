import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export type Language = 'en' | 'ko';

export interface TranslationData {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'vista_language';
  private readonly DEFAULT_LANGUAGE: Language = 'en';
  
  private currentLanguageSubject = new BehaviorSubject<Language>(this.getStoredLanguage());
  private translations: { [lang: string]: TranslationData } = {};
  private loadingLanguages = new Set<string>();
  
  // Public observables
  public currentLanguage$ = this.currentLanguageSubject.asObservable();
  public language$ = this.currentLanguage$;

  constructor(private http: HttpClient) {
    // Constructor is intentionally minimal
    // Translation loading is handled by APP_INITIALIZER in app.config.ts
  }

  /**
   * Get stored language from localStorage or return default
   */
  private getStoredLanguage(): Language {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return (stored === 'en' || stored === 'ko') ? stored : this.DEFAULT_LANGUAGE;
    } catch {
      return this.DEFAULT_LANGUAGE;
    }
  }

  /**
   * Check if language translations are loaded
   */
  isLanguageLoaded(lang: string): boolean {
    return !!this.translations[lang];
  }

  /**
   * Ensure translations are loaded for current language
   */
  ensureTranslationsLoaded(): Promise<boolean> {
    const currentLang = this.getCurrentLanguage();
    if (this.translations[currentLang]) {
      return Promise.resolve(true);
    }
    
    return new Promise((resolve) => {
      this.loadTranslations(currentLang).subscribe({
        next: () => resolve(true),
        error: () => resolve(false)
      });
    });
  }

  /**
   * Load translation file for the specified language
   */
  private loadTranslations(lang: Language): Observable<TranslationData> {
    // Return cached translations if already loaded
    if (this.translations[lang]) {
      return of(this.translations[lang]);
    }

    // If already loading this language, return empty for now
    if (this.loadingLanguages.has(lang)) {
      return of({});
    }

    // Mark language as loading
    this.loadingLanguages.add(lang);

    return this.http.get<TranslationData>(`assets/i18n/${lang}.json`).pipe(
      map(translations => {
        this.translations[lang] = translations;
        this.loadingLanguages.delete(lang);
        return translations;
      }),
      catchError(() => {
        console.warn(`Failed to load translations for language: ${lang}`);
        this.loadingLanguages.delete(lang);
        // If it's not the fallback language, try to load fallback
        if (lang !== this.DEFAULT_LANGUAGE && this.translations[this.DEFAULT_LANGUAGE]) {
          return of(this.translations[this.DEFAULT_LANGUAGE]);
        }
        return of({});
      })
    );
  }

  /**
   * Change the current language
   */
  setLanguage(lang: Language): void {
    // If language hasn't changed, do nothing
    if (this.currentLanguageSubject.value === lang) {
      return;
    }

    // Store in localStorage first
    try {
      localStorage.setItem(this.STORAGE_KEY, lang);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
    
    // Load translations if not already loaded
    if (!this.translations[lang]) {
      this.loadTranslations(lang).subscribe({
        next: () => {
          // Update current language after translations are loaded
          this.currentLanguageSubject.next(lang);
        },
        error: () => {
          // Even on error, update the language (will fallback to default)
          this.currentLanguageSubject.next(lang);
        }
      });
    } else {
      // Translations already loaded, immediately update
      this.currentLanguageSubject.next(lang);
    }
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  /**
   * Translate a key using dot notation
   * Supports parameter interpolation: translate('welcome.message', { name: 'John' })
   */
  translate(key: string, params?: { [key: string]: string | number }): string {
    const lang = this.getCurrentLanguage();
    
    // Check if translations are loaded for current language
    if (!this.translations[lang]) {
      // If current language is not loaded but fallback is available, use fallback
      if (lang !== this.DEFAULT_LANGUAGE && this.translations[this.DEFAULT_LANGUAGE]) {
        const translation = this.getNestedTranslation(this.translations[this.DEFAULT_LANGUAGE], key);
        return translation || key;
      }
      
      // If neither current nor fallback is loaded, trigger loading for current language
      if (!this.loadingLanguages.has(lang)) {
        this.loadTranslations(lang).subscribe();
      }
      
      return key; // Return key as placeholder until loaded
    }
    
    let translation = this.getNestedTranslation(this.translations[lang], key);
    
    // Fallback to English if translation not found
    if (!translation && lang !== this.DEFAULT_LANGUAGE && this.translations[this.DEFAULT_LANGUAGE]) {
      translation = this.getNestedTranslation(this.translations[this.DEFAULT_LANGUAGE], key);
    }
    
    // If still no translation found, return the key
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }

    // Replace parameters if provided
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(new RegExp(`{{${param}}}`, 'g'), String(params[param]));
      });
    }

    return translation;
  }

  /**
   * Get nested value from object using dot notation
   * Example: getNestedTranslation({home: {hero: {title: 'Welcome'}}}, 'home.hero.title') => 'Welcome'
   */
  private getNestedTranslation(obj: any, key: string): string {
    const keys = key.split('.');
    let result = obj;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return '';
      }
    }
    
    return typeof result === 'string' ? result : '';
  }

  /**
   * Instantly get translation (synchronous)
   * Use this when you're sure translations are already loaded
   */
  instant(key: string, params?: { [key: string]: string | number }): string {
    return this.translate(key, params);
  }

  /**
   * Get translation as observable (for async pipe usage)
   */
  getTranslation$(key: string, params?: { [key: string]: string | number }): Observable<string> {
    return this.currentLanguage$.pipe(
      map(() => this.translate(key, params))
    );
  }
}
