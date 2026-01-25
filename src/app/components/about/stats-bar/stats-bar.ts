import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-stats-bar',
  imports: [TranslatePipe],
  templateUrl: './stats-bar.html',
  styleUrl: './stats-bar.scss',
  standalone: true
})
export class StatsBarComponent {

}
