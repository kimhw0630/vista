import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-page-hero',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.scss',
  standalone: true
})
export class PageHeroComponent {

}
