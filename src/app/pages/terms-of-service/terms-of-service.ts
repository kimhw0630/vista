import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-terms-of-service',
  imports: [RouterLink],
  templateUrl: './terms-of-service.html',
  styleUrl: './terms-of-service.scss',
  standalone: true
})
export class TermsOfServiceComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Terms of Service - VISTA Law',
      description: 'Read VISTA Law\'s Terms of Service. Learn about our website usage policies, user responsibilities, intellectual property, and legal disclaimers.',
      keywords: 'terms of service, legal terms, website terms, user agreement, VISTA Law terms',
      url: 'https://vistallp.ca/terms-of-service'
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
