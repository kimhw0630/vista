import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Demo component showing i18n usage examples
 * This is for demonstration purposes - can be deleted in production
 */
@Component({
  selector: 'app-i18n-demo',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">i18n Demo</h1>
      
      <!-- Language Switcher -->
      <div class="mb-8 p-4 bg-gray-100 rounded">
        <h2 class="text-xl font-semibold mb-4">Current Language: {{ currentLanguage }}</h2>
        <div class="flex gap-4">
          <button 
            (click)="switchToEnglish()"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Switch to English
          </button>
          <button 
            (click)="switchToKorean()"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Switch to Korean (한국어)
          </button>
        </div>
      </div>

      <!-- Translation Examples -->
      <div class="space-y-6">
        <!-- Basic Translation -->
        <section class="p-4 border rounded">
          <h3 class="font-bold mb-2">1. Basic Translation (Pipe)</h3>
          <p class="text-gray-700">{{ 'home.hero.title' | translate }}</p>
          <code class="text-sm bg-gray-100 p-2 block mt-2">
            {{"{{ 'home.hero.title' | translate }}"}}
          </code>
        </section>

        <!-- Nested Translation -->
        <section class="p-4 border rounded">
          <h3 class="font-bold mb-2">2. Nested Key Translation</h3>
          <p class="text-gray-700">{{ 'attorneys.profile.practiceAreas' | translate }}</p>
          <code class="text-sm bg-gray-100 p-2 block mt-2">
            {{"{{ 'attorneys.profile.practiceAreas' | translate }}"}}
          </code>
        </section>

        <!-- Translation with Parameters -->
        <section class="p-4 border rounded">
          <h3 class="font-bold mb-2">3. Translation with Parameters</h3>
          <p class="text-gray-700">{{ 'attorneys.profile.contactAttorney' | translate:{ name: 'John Doe' } }}</p>
          <code class="text-sm bg-gray-100 p-2 block mt-2">
            {{"{{ 'attorneys.profile.contactAttorney' | translate:{ name: 'John Doe' } }}"}}
          </code>
        </section>

        <!-- Programmatic Translation -->
        <section class="p-4 border rounded">
          <h3 class="font-bold mb-2">4. Programmatic Translation (Service)</h3>
          <p class="text-gray-700">{{ programmaticTranslation }}</p>
          <code class="text-sm bg-gray-100 p-2 block mt-2">
            this.translationService.instant('home.hero.subtitle')
          </code>
        </section>

        <!-- Multiple Translations -->
        <section class="p-4 border rounded">
          <h3 class="font-bold mb-2">5. Multiple Translations</h3>
          <ul class="list-disc list-inside space-y-1 text-gray-700">
            <li>{{ 'header.home' | translate }}</li>
            <li>{{ 'header.about' | translate }}</li>
            <li>{{ 'header.attorneys' | translate }}</li>
            <li>{{ 'header.practiceAreas' | translate }}</li>
            <li>{{ 'header.contact' | translate }}</li>
          </ul>
        </section>

        <!-- Common Translations -->
        <section class="p-4 border rounded">
          <h3 class="font-bold mb-2">6. Common Translations (Reusable)</h3>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-green-500 text-white rounded">
              {{ 'common.contactUs' | translate }}
            </button>
            <button class="px-4 py-2 bg-green-500 text-white rounded">
              {{ 'common.learnMore' | translate }}
            </button>
            <button class="px-4 py-2 bg-green-500 text-white rounded">
              {{ 'common.getStarted' | translate }}
            </button>
          </div>
        </section>
      </div>

      <!-- Debug Info -->
      <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 class="font-bold mb-2">Debug Info</h3>
        <ul class="text-sm space-y-1">
          <li><strong>Current Language:</strong> {{ currentLanguage }}</li>
          <li><strong>Stored in LocalStorage:</strong> {{ storedLanguage }}</li>
          <li><strong>Language Observable:</strong> Updates automatically on change</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class I18nDemoComponent {
  currentLanguage: string;
  programmaticTranslation: string;
  storedLanguage: string | null;

  constructor(public translationService: TranslationService) {
    this.currentLanguage = this.translationService.getCurrentLanguage();
    this.programmaticTranslation = this.translationService.instant('home.hero.subtitle');
    this.storedLanguage = localStorage.getItem('vista_language');

    // Subscribe to language changes
    this.translationService.language$.subscribe((lang: string) => {
      this.currentLanguage = lang;
      this.programmaticTranslation = this.translationService.instant('home.hero.subtitle');
      this.storedLanguage = localStorage.getItem('vista_language');
    });
  }

  switchToEnglish(): void {
    this.translationService.setLanguage('en');
  }

  switchToKorean(): void {
    this.translationService.setLanguage('ko');
  }
}
