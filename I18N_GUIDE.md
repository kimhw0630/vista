# i18n Implementation Guide

## Overview
Custom internationalization (i18n) system for VISTA Law firm website with English and Korean language support.

## Features
✅ English (default) and Korean language support
✅ Reactive state management with Angular signals
✅ LocalStorage persistence across sessions
✅ Lazy loading with HTTP caching
✅ Automatic fallback to English
✅ Parameter interpolation support
✅ Dot notation for nested keys
✅ Language switcher with flag icons

## File Structure
```
src/
├── assets/i18n/
│   ├── en.json          # English translations
│   └── ko.json          # Korean translations
├── app/
│   ├── services/
│   │   └── translation.service.ts
│   ├── pipes/
│   │   └── translate.pipe.ts
│   ├── components/
│   │   └── language-switcher/
│   │       ├── language-switcher.ts
│   │       ├── language-switcher.html
│   │       └── language-switcher.scss
│   └── directives/
│       └── click-outside.directive.ts
```

## Usage Examples

### 1. Using the Translate Pipe (Template)

#### Basic Translation
```html
<h1>{{ 'home.hero.title' | translate }}</h1>
<p>{{ 'about.philosophy.description' | translate }}</p>
```

#### With Parameter Interpolation
```html
<button>{{ 'attorneys.profile.contactAttorney' | translate:{ name: attorney.name } }}</button>
<p>{{ 'home.trustIndicators.yearsExperience' | translate:{ years: 25 } }}</p>
```

### 2. Using TranslationService (Component)

```typescript
import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';

export class MyComponent {
  constructor(private translationService: TranslationService) {}

  // Get instant translation
  getTitle(): string {
    return this.translationService.instant('home.hero.title');
  }

  // With parameters
  getWelcome(name: string): string {
    return this.translationService.instant('welcome.message', { name });
  }

  // Change language programmatically
  switchToKorean(): void {
    this.translationService.setLanguage('ko');
  }

  // Get current language
  getCurrentLang(): string {
    return this.translationService.getCurrentLanguage();
  }

  // Subscribe to language changes
  ngOnInit() {
    this.translationService.language$.subscribe(lang => {
      console.log('Language changed to:', lang);
    });
  }
}
```

### 3. Adding New Translations

#### Step 1: Add to en.json
```json
{
  "newSection": {
    "title": "New Section Title",
    "subtitle": "This is a subtitle",
    "cta": "Click here for {{action}}"
  }
}
```

#### Step 2: Add to ko.json (same keys, translated values)
```json
{
  "newSection": {
    "title": "새 섹션 제목",
    "subtitle": "이것은 부제목입니다",
    "cta": "{{action}}을 위해 여기를 클릭하세요"
  }
}
```

#### Step 3: Use in template
```html
<h2>{{ 'newSection.title' | translate }}</h2>
<p>{{ 'newSection.subtitle' | translate }}</p>
<button>{{ 'newSection.cta' | translate:{ action: 'more info' } }}</button>
```

## Translation File Structure

### Dot Notation Format
Use nested objects for better organization:

```json
{
  "page": {
    "section": {
      "component": {
        "key": "value"
      }
    }
  }
}
```

Access with: `page.section.component.key`

### Best Practices
1. **Keep keys consistent** between en.json and ko.json
2. **Use descriptive keys**: `home.hero.title` instead of `h1`
3. **Group by page/component**: `attorneys.profile.yearsExperience`
4. **Common translations**: Use `common.` prefix for reusable text
5. **Parameter naming**: Use clear names like `{{name}}`, `{{count}}`

## Language Switcher

The language switcher is already integrated in the header component and features:
- 🇨🇦 Canadian flag for English
- 🇰🇷 Korean flag for Korean
- Dropdown UI with current selection indicator
- Click-outside to close dropdown
- Automatic UI updates on language change

## How It Works

### 1. Translation Service
- **State Management**: Uses Angular signals for reactive state
- **LocalStorage**: Saves language preference (key: 'vista_language')
- **Lazy Loading**: JSON files loaded on-demand via HTTP
- **Caching**: Translations cached in memory after first load
- **Fallback**: Automatically falls back to English if translation missing

### 2. Translate Pipe
- **Pure: false**: Re-evaluates on every change detection
- **Reactive**: Subscribes to language changes
- **Cached**: Implements internal caching to minimize lookups
- **Auto-update**: UI updates automatically when language changes

### 3. Language Persistence
- Selected language saved to localStorage
- Persists across browser sessions
- Automatically loaded on app initialization

## API Reference

### TranslationService Methods

```typescript
// Change language
setLanguage(language: 'en' | 'ko'): void

// Get current language
getCurrentLanguage(): 'en' | 'ko'

// Instant translation (synchronous)
instant(key: string, params?: object): string

// Get translation as observable
get(key: string, params?: object): Observable<string>

// Alias for instant
translate(key: string, params?: object): string

// Observable of language changes
language$: Observable<'en' | 'ko'>
```

### TranslatePipe

```html
<!-- Basic usage -->
{{ 'key' | translate }}

<!-- With parameters -->
{{ 'key' | translate:{ param1: value1, param2: value2 } }}
```

## Testing Translations

### Quick Test
1. Load the app
2. Click language switcher in header
3. Select Korean (🇰🇷)
4. Verify all text changes to Korean
5. Refresh page - Korean should persist
6. Switch back to English (🇨🇦)

### Console Testing
```javascript
// In browser console
const service = window.ng.getComponent(document.querySelector('app-root')).injector.get('TranslationService');
service.setLanguage('ko'); // Switch to Korean
service.getCurrentLanguage(); // Get current
```

## Troubleshooting

### Translation not showing
- Check if key exists in both en.json and ko.json
- Verify dot notation path is correct
- Check browser console for warnings

### Language not persisting
- Check localStorage for 'vista_language' key
- Verify browser allows localStorage

### JSON file not loading
- Check file path: `/assets/i18n/${lang}.json`
- Verify JSON syntax is valid
- Check browser network tab for 404 errors

## Future Enhancements

Possible improvements:
- Add more languages (Spanish, Japanese, etc.)
- Translation management interface
- Missing translation reporter
- RTL language support
- Language detection from browser
- Server-side rendering (SSR) support
