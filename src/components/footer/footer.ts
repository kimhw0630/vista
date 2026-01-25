import { Component } from '@angular/core';
import { TranslatePipe } from '../../app/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  standalone: true
})
export class FooterComponent {

}
