import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, LanguageSwitcherComponent, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true
})
export class HeaderComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
