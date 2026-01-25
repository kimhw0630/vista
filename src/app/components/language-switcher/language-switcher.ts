import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from '../../services/translation.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string; // Emoji flag
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './language-switcher.html',
  styleUrls: ['./language-switcher.scss']
})
export class LanguageSwitcherComponent {
  isOpen = false;
  
  languages: LanguageOption[] = [
    { code: 'en', label: 'English', flag: 'images/flags/ca.svg' },
    { code: 'ko', label: '한국어', flag: 'images/flags/kr.svg' }
  ];

  constructor(
    public translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {}

  get currentLanguage(): LanguageOption {
    const current = this.translationService.getCurrentLanguage();
    return this.languages.find(lang => lang.code === current) || this.languages[0];
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(language: LanguageOption): void {
    if (language.code !== this.translationService.getCurrentLanguage()) {
      this.translationService.setLanguage(language.code);
    }
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
