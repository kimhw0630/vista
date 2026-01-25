import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-stats-section',
  imports: [TranslatePipe],
  templateUrl: './stats-section.html',
  styleUrl: './stats-section.scss',
  standalone: true
})
export class StatsSectionComponent {

}
