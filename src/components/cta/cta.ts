import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../app/pipes/translate.pipe';

@Component({
  selector: 'app-cta',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './cta.html',
  styleUrl: './cta.scss',
  standalone: true
})
export class CtaComponent {

}
