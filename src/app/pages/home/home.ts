import { Component } from '@angular/core';
import { HeroComponent } from '../../../components/hero/hero';
import { TrustIndicatorsComponent } from '../../../components/trust-indicators/trust-indicators';
import { PracticeAreasComponent } from '../../../components/practice-areas/practice-areas';
import { AttorneysComponent } from '../../../components/attorneys/attorneys';
import { TestimonialsComponent } from '../../../components/testimonials/testimonials';
import { CtaComponent } from '../../../components/cta/cta';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    TrustIndicatorsComponent,
    PracticeAreasComponent,
    AttorneysComponent,
    TestimonialsComponent,
    CtaComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})
export class HomeComponent {

}
