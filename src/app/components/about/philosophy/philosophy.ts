import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-philosophy',
  imports: [TranslatePipe],
  templateUrl: './philosophy.html',
  styleUrl: './philosophy.scss',
  standalone: true
})
export class PhilosophyComponent {

}
