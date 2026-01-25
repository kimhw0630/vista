import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-hero-section',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  standalone: true
})
export class HeroSectionComponent {
  scrollToMilestones() {
    const element = document.getElementById('ourstory');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
