import { ApplicationConfig, provideBrowserGlobalErrorListeners, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslationService } from './services/translation.service';

import { routes } from './app.routes';

// Initialize translations before app starts
export function initializeTranslations(translationService: TranslationService) {
  return () => {
    const currentLang = translationService.getCurrentLanguage();
    return new Promise<void>((resolve) => {
      translationService['loadTranslations'](currentLang).subscribe({
        next: () => resolve(),
        error: () => resolve() // Continue even if loading fails
      });
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslations,
      deps: [TranslationService],
      multi: true
    }
  ]
};
