import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttorneyService, Attorney } from '../../../services/attorney.service';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-attorney-grid',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './attorney-grid.html',
  styleUrl: './attorney-grid.scss',
  standalone: true
})
export class AttorneyGridComponent implements OnInit, OnDestroy {
  attorneys: Attorney[] = [];
  private subscription?: Subscription;

  constructor(
    private attorneyService: AttorneyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.attorneyService.getAttorneys$().subscribe(
      attorneys => {
        this.attorneys = attorneys;
        this.cdr.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
