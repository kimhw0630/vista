import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

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
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: string, params?: { [key: string]: string | number }): string {
    if (!key) return '';
    
    // Simply get the translation - pure: false ensures this runs on every change detection
    return this.translationService.translate(key, params);
  }
}
