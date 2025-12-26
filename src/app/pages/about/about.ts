import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/about/hero-section/hero-section';
import { StatsBarComponent } from '../../components/about/stats-bar/stats-bar';
import { StoryTimelineComponent } from '../../components/about/story-timeline/story-timeline';
import { TeamSectionComponent } from '../../components/about/team-section/team-section';
import { CtaComponent } from '../../../components/cta/cta';

@Component({
  selector: 'app-about',
  imports: [
    HeroSectionComponent,
    StatsBarComponent,
    StoryTimelineComponent,
    TeamSectionComponent,
    CtaComponent
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  standalone: true
})
export class AboutComponent {

}
