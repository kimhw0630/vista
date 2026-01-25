import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AttorneyService, Attorney } from '../../app/services/attorney.service';
import { SeoService } from '../../app/services/seo.service';
import { TranslatePipe } from '../../app/pipes/translate.pipe';

@Component({
  selector: 'app-attorney-profile',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './attorney-profile.html',
  styleUrl: './attorney-profile.scss'
})
export class AttorneyProfileComponent implements OnInit {
  activeTab: string = 'biography';
  attorney: Attorney | undefined;
  returnUrl: string = '/lawyers';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attorneyService: AttorneyService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    // Get attorney ID from route params
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.attorney = this.attorneyService.getAttorneyById(id);
      
      // If attorney not found, redirect to lawyers page
      if (!this.attorney) {
        this.router.navigate(['/lawyers']);
      } else {
        // Update SEO for this attorney
        this.updateSeo();
      }
    });

    // Check if there's a returnUrl query parameter
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  updateSeo() {
    if (!this.attorney) return;

    this.seoService.updateMetaTags({
      title: `${this.attorney.name} - ${this.attorney.title} | VISTA Law`,
      description: this.attorney.description,
      keywords: `${this.attorney.name}, ${this.attorney.title}, ${this.attorney.specialties?.join(', ')}, lawyer Toronto`,
      url: `https://vistallp.ca/lawyers/${this.attorney.id}`,
      image: this.attorney.image
    });

    // Add structured data for the attorney
    this.seoService.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': this.attorney.name,
      'jobTitle': this.attorney.title,
      'description': this.attorney.description,
      'image': this.attorney.image,
      'email': this.attorney.email,
      'telephone': this.attorney.phone,
      'url': `https://vistallp.ca/lawyers/${this.attorney.id}`,
      'worksFor': {
        '@type': 'LegalService',
        'name': 'VISTA Law'
      },
      'knowsAbout': this.attorney.specialties,
      'alumniOf': this.attorney.education?.map(edu => ({
        '@type': 'EducationalOrganization',
        'name': edu.school
      }))
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goBack() {
    this.router.navigate([this.returnUrl]);
  }
}
