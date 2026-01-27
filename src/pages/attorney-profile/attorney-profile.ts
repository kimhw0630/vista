import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AttorneyService, Attorney } from '../../app/services/attorney.service';
import { SeoService } from '../../app/services/seo.service';
import { TranslatePipe } from '../../app/pipes/translate.pipe';

@Component({
  selector: 'app-attorney-profile',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './attorney-profile.html',
  styleUrl: './attorney-profile.scss'
})
export class AttorneyProfileComponent implements OnInit, OnDestroy {
  activeTab: string = 'biography';
  attorney: Attorney | undefined;
  returnUrl: string = '/lawyers';
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attorneyService: AttorneyService,
    private seoService: SeoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Get attorney ID from route params and subscribe to attorney data changes
    this.subscription = this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        return this.attorneyService.getAttorneyById$(id);
      })
    ).subscribe(attorney => {
      this.attorney = attorney;
      this.cdr.markForCheck();
      
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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
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

  downloadVCard() {
    if (!this.attorney) return;

    // Create vCard content (version 3.0)
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${this.attorney.name}`,
      `N:${this.getLastName(this.attorney.name)};${this.getFirstName(this.attorney.name)};;;`,
      `TITLE:${this.attorney.title}`,
      `ORG:Vista Law LLP`,
      this.attorney.email ? `EMAIL;TYPE=INTERNET,WORK:${this.attorney.email}` : '',
      this.attorney.phone ? `TEL;TYPE=WORK,VOICE:${this.attorney.phone}` : '',
      `ADR;TYPE=WORK:;;7030 Woodbine Ave., Suite 500;Markham;Ontario;L3R 6G2;Canada`,
      `URL:https://vistallp.ca/lawyers/${this.attorney.id}`,
      'END:VCARD'
    ].filter(line => line).join('\r\n');

    // Create blob and download
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.attorney.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private getFirstName(fullName: string): string {
    const parts = fullName.split(' ');
    return parts.slice(0, -1).join(' ') || parts[0];
  }

  private getLastName(fullName: string): string {
    const parts = fullName.split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }
}
