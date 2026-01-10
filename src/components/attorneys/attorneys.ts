import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttorneyService, Attorney } from '../../app/services/attorney.service';
import { TranslatePipe } from '../../app/pipes/translate.pipe';

@Component({
  selector: 'app-attorneys',
  imports: [RouterLink, TranslatePipe],
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
