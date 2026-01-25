import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-hero-banner',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.scss',
  standalone: true
})
export class HeroBannerComponent {
  scrollToPractices(): void {
    const element = document.getElementById('practice-areas-list');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
