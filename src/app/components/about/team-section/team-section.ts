import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttorneyService, Attorney } from '../../../services/attorney.service';

@Component({
  selector: 'app-team-section',
  imports: [RouterLink],
  templateUrl: './team-section.html',
  styleUrl: './team-section.scss',
  standalone: true
})
export class TeamSectionComponent {
  attorneys: Attorney[];

  constructor(private attorneyService: AttorneyService) {
    this.attorneys = this.attorneyService.getAttorneys();
  }
}
