import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from '../components/footer/footer';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  protected readonly title = signal('vista');
  
  // Initialize translation service to load translations on app start
  constructor(
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    // Listen for language changes and trigger change detection
    this.translationService.language$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
