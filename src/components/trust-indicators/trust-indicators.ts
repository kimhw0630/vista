import { Component } from '@angular/core';
import { TranslatePipe } from '../../app/pipes/translate.pipe';

@Component({
  selector: 'app-trust-indicators',
  imports: [TranslatePipe],
  templateUrl: './trust-indicators.html',
  styleUrl: './trust-indicators.scss',
  standalone: true
})
export class TrustIndicatorsComponent {

}
