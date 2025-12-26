import { Component } from '@angular/core';
import { PhilosophyComponent } from '../philosophy/philosophy';

@Component({
  selector: 'app-story-timeline',
  imports: [PhilosophyComponent],
  templateUrl: './story-timeline.html',
  styleUrl: './story-timeline.scss',
  standalone: true
})
export class StoryTimelineComponent {

}
