import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../app/pipes/translate.pipe';
import { TranslationService } from '../../app/services/translation.service';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslatePipe, CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  standalone: true
})
export class HeroComponent {
  translationService = inject(TranslationService);

  get currentLanguage(): string {
    return this.translationService.getCurrentLanguage();
  }
}
