import { Component } from '@angular/core';
import { TranslatePipe } from '../../app/pipes/translate.pipe';

@Component({
  selector: 'app-testimonials',
  imports: [TranslatePipe],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
  standalone: true
})
export class TestimonialsComponent {

}
