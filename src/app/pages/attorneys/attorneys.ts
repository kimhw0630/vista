import { Component } from '@angular/core';
import { PageHeroComponent } from '../../components/attorneys/page-hero/page-hero';
import { AttorneyGridComponent } from '../../components/attorneys/attorney-grid/attorney-grid';
import { CtaSectionComponent } from '../../components/attorneys/cta-section/cta-section';
import { ClerksList } from '../../app/components/attorneys/clerks-list/clerks-list';

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
export class AttorneysComponent {

}
