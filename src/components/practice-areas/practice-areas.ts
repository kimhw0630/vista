import { Component } from '@angular/core';
import { TranslatePipe } from '../../app/pipes/translate.pipe';

@Component({
  selector: 'app-practice-areas',
  imports: [TranslatePipe],
  templateUrl: './practice-areas.html',
  styleUrl: './practice-areas.scss',
  standalone: true
})
export class PracticeAreasComponent {

}
