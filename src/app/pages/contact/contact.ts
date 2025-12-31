import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from '../../components/contact/hero-section/hero-section';
import { ContactFormComponent } from '../../components/contact/contact-form/contact-form';
import { ContactInfoComponent } from '../../components/contact/contact-info/contact-info';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [
    HeroSectionComponent,
    ContactFormComponent,
    ContactInfoComponent
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  standalone: true
})
export class ContactComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Contact VISTA Law - Free Legal Consultation',
      description: 'Get in touch with VISTA Law for a free legal consultation. Our experienced lawyers in Toronto are ready to help with your legal needs.',
      keywords: 'contact lawyer Toronto, free legal consultation, legal help Ontario',
      url: 'https://vistallp.ca/contact'
    });

    // Add structured data for ContactPage
    this.seoService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact VISTA Law',
      'description': 'Contact VISTA Law for legal consultation and services',
      'url': 'https://vistallp.ca/contact'
    });
  }
}
