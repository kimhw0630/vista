import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-hero-section',
  imports: [TranslatePipe],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  standalone: true
})
export class HeroSectionComponent {

}
