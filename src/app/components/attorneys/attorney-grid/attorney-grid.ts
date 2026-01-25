import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AttorneyService, Attorney } from '../../../services/attorney.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-attorney-grid',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './attorney-grid.html',
  styleUrl: './attorney-grid.scss',
  standalone: true
})
export class AttorneyGridComponent {
  attorneys: Attorney[];

  constructor(private attorneyService: AttorneyService) {
    this.attorneys = this.attorneyService.getAttorneys();
  }
}
