import { Component } from '@angular/core';
import { HeroBannerComponent } from '../../components/practice-areas/hero-banner/hero-banner';
// import { FilterTabsComponent } from '../../components/practice-areas/filter-tabs/filter-tabs';
import { AreasGridComponent } from '../../components/practice-areas/areas-grid/areas-grid';
import { StatsSectionComponent } from '../../components/practice-areas/stats-section/stats-section';
import { TestimonialQuoteComponent } from '../../components/practice-areas/testimonial-quote/testimonial-quote';
import { CtaComponent } from '../../../components/cta/cta';

@Component({
  selector: 'app-practice-areas',
  imports: [
    HeroBannerComponent,
    // FilterTabsComponent,
    AreasGridComponent,
    StatsSectionComponent,
    TestimonialQuoteComponent,
    CtaComponent
  ],
  templateUrl: './practice-areas.html',
  styleUrl: './practice-areas.scss',
  standalone: true
})
export class PracticeAreasComponent {

}
