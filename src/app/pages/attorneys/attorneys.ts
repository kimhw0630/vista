import { Component, OnInit } from '@angular/core';
import { PageHeroComponent } from '../../components/attorneys/page-hero/page-hero';
import { AttorneyGridComponent } from '../../components/attorneys/attorney-grid/attorney-grid';
import { CtaSectionComponent } from '../../components/attorneys/cta-section/cta-section';
import { ClerksList } from '../../app/components/attorneys/clerks-list/clerks-list';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-attorneys',
  imports: [
    PageHeroComponent,
    AttorneyGridComponent,
    ClerksList,
    CtaSectionComponent
  ],
  templateUrl: './attorneys.html',
  styleUrl: './attorneys.scss',
  standalone: true
})
export class AttorneysComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Our Lawyers - VISTA Law Team in Toronto',
      description: 'Meet our experienced legal team at VISTA Law. Skilled lawyers specializing in family law, immigration, real estate, and corporate law in Toronto, Ontario.',
      keywords: 'lawyers Toronto, legal team Ontario, experienced lawyers GTA, family lawyer, immigration lawyer',
      url: 'https://vistallp.ca/lawyers'
    });
  }
}
