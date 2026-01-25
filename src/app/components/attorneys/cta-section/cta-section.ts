import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-cta-section',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
  standalone: true
})
export class CtaSectionComponent {

}
