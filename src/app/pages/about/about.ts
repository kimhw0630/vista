import { Component, OnInit } from '@angular/core';
import { HeroSectionComponent } from '../../components/about/hero-section/hero-section';
import { StatsBarComponent } from '../../components/about/stats-bar/stats-bar';
import { StoryTimelineComponent } from '../../components/about/story-timeline/story-timeline';
import { AttorneysComponent } from '../../../components/attorneys/attorneys';
import { CtaComponent } from '../../../components/cta/cta';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  imports: [
    HeroSectionComponent,
    StatsBarComponent,
    StoryTimelineComponent,
    AttorneysComponent,
    CtaComponent
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  standalone: true
})
export class AboutComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'About VISTA Law - Our Story & Philosophy',
      description: 'Learn about VISTA Law\'s journey, philosophy, and commitment to providing exceptional legal services in Toronto. Meet our experienced team of lawyers.',
      keywords: 'about VISTA Law, law firm Toronto, legal team Ontario, lawyer philosophy',
      url: 'https://vistallp.ca/about'
    });
  }
}
