import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

/**
 * TranslatePipe - Translates keys to localized strings
 * 
 * Usage:
 *   {{ 'home.hero.title' | translate }}
 *   {{ 'attorneys.profile.contactAttorney' | translate:{ name: attorney.name } }}
 */
@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private lastKey: string = '';
  private lastParams?: { [key: string]: string | number };
  private lastValue: string = '';
  private subscription?: Subscription;
  private initialized = false;

  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {}

  transform(key: string, params?: { [key: string]: string | number }): string {
    if (!key) return '';
    
    // Check if we need to update the subscription
    const paramsChanged = JSON.stringify(params) !== JSON.stringify(this.lastParams);
    if (!this.initialized || key !== this.lastKey || paramsChanged) {
      this.lastKey = key;
      this.lastParams = params;
      this.initialized = true;
      
      // Unsubscribe from previous subscription
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      
      // Subscribe to language changes
      this.subscription = this.translationService.currentLanguage$.subscribe(() => {
        this.lastValue = this.translationService.translate(key, params);
        this.cdr.markForCheck();
      });
      
      // Get initial value
      this.lastValue = this.translationService.translate(key, params);
    }
    
    return this.lastValue;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
