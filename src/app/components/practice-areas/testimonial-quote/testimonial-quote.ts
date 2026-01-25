import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-testimonial-quote',
  imports: [TranslatePipe],
  templateUrl: './testimonial-quote.html',
  styleUrl: './testimonial-quote.scss',
  standalone: true
})
export class TestimonialQuoteComponent {

}
