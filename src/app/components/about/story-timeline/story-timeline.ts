import { Component } from '@angular/core';
import { PhilosophyComponent } from '../philosophy/philosophy';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-story-timeline',
  imports: [PhilosophyComponent, TranslatePipe],
  templateUrl: './story-timeline.html',
  styleUrl: './story-timeline.scss',
  standalone: true
})
export class StoryTimelineComponent {

}
