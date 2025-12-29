import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttorneyService, Attorney } from '../../app/services/attorney.service';

@Component({
  selector: 'app-attorneys',
  imports: [RouterLink],
  templateUrl: './attorneys.html',
  styleUrl: './attorneys.scss',
  standalone: true
})
export class AttorneysComponent {
  attorneys: Attorney[];

  constructor(private attorneyService: AttorneyService) {
    this.attorneys = this.attorneyService.getAttorneys();
  }
}
