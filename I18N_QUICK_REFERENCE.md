# i18n Quick Reference Card

## 🚀 Common Usage Patterns

### In Templates (HTML)
\`\`\`html
<!-- Simple translation -->
{{ 'key.path' | translate }}

<!-- With parameters -->
{{ 'key.with.param' | translate:{ name: 'John', count: 5 } }}

<!-- Example: Navigation -->
<a routerLink="/about">{{ 'header.about' | translate }}</a>

<!-- Example: Button -->
<button>{{ 'common.contactUs' | translate }}</button>

<!-- Example: Heading with param -->
<h1>{{ 'attorneys.profile.contactAttorney' | translate:{ name: attorney.name } }}</h1>
\`\`\`

### In Components (TypeScript)
\`\`\`typescript
import { TranslationService } from './services/translation.service';

constructor(private translationService: TranslationService) {}

// Get instant translation
title = this.translationService.instant('home.hero.title');

// With parameters
welcome = this.translationService.instant('welcome.message', { name: 'John' });

// Change language
this.translationService.setLanguage('ko');

// Get current language
currentLang = this.translationService.getCurrentLanguage();

// Subscribe to changes
this.translationService.language$.subscribe(lang => {
  console.log('Language changed to:', lang);
});
\`\`\`

## 📋 Translation Key Structure

\`\`\`
common.*              - Reusable across site
header.*              - Header navigation
footer.*              - Footer content
home.*                - Home page
  └─ hero.*           - Hero section
  └─ trustIndicators.* - Trust indicators
about.*               - About page
attorneys.*           - Attorneys page
  └─ profile.*        - Attorney profile
  └─ search.*         - Search/filter
practiceAreas.*       - Practice areas
contact.*             - Contact page
  └─ form.*           - Contact form
  └─ info.*           - Contact info
\`\`\`

## 🎯 Adding New Translations

### 1. Add to en.json
\`\`\`json
{
  "mySection": {
    "title": "My Title",
    "subtitle": "My Subtitle",
    "cta": "Click {{action}}"
  }
}
\`\`\`

### 2. Add to ko.json (same keys!)
\`\`\`json
{
  "mySection": {
    "title": "내 제목",
    "subtitle": "내 부제",
    "cta": "{{action}} 클릭"
  }
}
\`\`\`

### 3. Use in template
\`\`\`html
<h2>{{ 'mySection.title' | translate }}</h2>
<p>{{ 'mySection.subtitle' | translate }}</p>
<button>{{ 'mySection.cta' | translate:{ action: 'here' } }}</button>
\`\`\`

## 🔧 Language Switcher

Already integrated in header! Users can click:
- 🇨🇦 for English
- 🇰🇷 for Korean

Language persists in localStorage automatically.

## ⚡ Pro Tips

1. **Always use translate pipe in templates** - it auto-updates on language change
2. **Use instant() in components** - for one-time translations
3. **Keep keys consistent** - same structure in en.json and ko.json
4. **Use descriptive keys** - \`attorneys.profile.email\` not \`ape\`
5. **Group by feature** - easier to maintain
6. **Check console** - warnings show missing translations

## 🛠️ Debugging

\`\`\`typescript
// Get current language
console.log(this.translationService.getCurrentLanguage());

// Check localStorage
console.log(localStorage.getItem('vista_language'));

// Get translation directly
console.log(this.translationService.instant('home.hero.title'));
\`\`\`

## 📝 Checklist for New Components

- [ ] Import TranslatePipe in component
- [ ] Replace hardcoded text with {{ 'key' | translate }}
- [ ] Add translation keys to en.json
- [ ] Add same keys to ko.json (with Korean values)
- [ ] Test in both languages
- [ ] Check console for missing translations

## 🎨 Example Component Setup

\`\`\`typescript
import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [TranslatePipe],
  template: \`
    <h1>{{ 'myComponent.title' | translate }}</h1>
    <p>{{ 'myComponent.description' | translate:{ name: userName } }}</p>
  \`
})
export class MyComponent {
  userName = 'John';
}
\`\`\`

## 🌐 Available Languages

- **en** - English (default) 🇨🇦
- **ko** - Korean (한국어) 🇰🇷

## 📚 Full Documentation

See [I18N_GUIDE.md](I18N_GUIDE.md) for complete documentation.

---

**Quick Support**: Check browser console for warnings about missing translations!
