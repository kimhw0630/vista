import { Component, OnInit } from '@angular/core';
import { HeroBannerComponent } from '../../components/practice-areas/hero-banner/hero-banner';
// import { FilterTabsComponent } from '../../components/practice-areas/filter-tabs/filter-tabs';
import { AreasGridComponent } from '../../components/practice-areas/areas-grid/areas-grid';
import { StatsSectionComponent } from '../../components/practice-areas/stats-section/stats-section';
import { TestimonialQuoteComponent } from '../../components/practice-areas/testimonial-quote/testimonial-quote';
import { CtaComponent } from '../../../components/cta/cta';
import { SeoService } from '../../services/seo.service';

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
export class PracticeAreasComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Practice Areas - Legal Services by VISTA Law',
      description: 'Comprehensive legal services including family law, immigration law, real estate law, corporate law, and more. Expert lawyers serving Toronto and Ontario.',
      keywords: 'family law, immigration law, real estate law, corporate law, legal services Toronto, Ontario lawyers',
      url: 'https://vistallp.ca/practice-areas'
    });
  }
}
