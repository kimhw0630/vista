import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../../../components/hero/hero';
import { TrustIndicatorsComponent } from '../../../components/trust-indicators/trust-indicators';
import { PracticeAreasComponent } from '../../../components/practice-areas/practice-areas';
import { AttorneysComponent } from '../../../components/attorneys/attorneys';
import { TestimonialsComponent } from '../../../components/testimonials/testimonials';
import { CtaComponent } from '../../../components/cta/cta';
import { SeoService } from '../../services/seo.service';

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
export class HomeComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'VISTA Law - Expert Legal Services in Toronto, Ontario',
      description: 'VISTA Law provides comprehensive legal services including family law, immigration, real estate, and corporate law. Experienced lawyers serving Toronto and the Greater Toronto Area.',
      keywords: 'lawyer Toronto, legal services Ontario, family law Toronto, immigration lawyer Canada, real estate lawyer GTA',
      url: 'https://vistallp.ca'
    });

    // Add structured data for legal service
    this.seoService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      'name': 'VISTA Law',
      'image': 'https://vistallp.ca/images/logo.png',
      'description': 'Expert legal services in Toronto, Ontario specializing in family law, immigration, real estate, and corporate law.',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '26 Glen Cameron Road',
        'addressLocality': 'Markham',
        'addressRegion': 'ON',
        'postalCode': 'L6C 1Y1',
        'addressCountry': 'CA'
      },
      'telephone': '(905) 886-3339',
      'url': 'https://vistallp.ca',
      'priceRange': '$$',
      'areaServed': {
        '@type': 'State',
        'name': 'Ontario'
      }
    });
  }
}

