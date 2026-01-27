import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AttorneyService, Attorney } from '../../app/services/attorney.service';
import { TranslatePipe } from '../../app/pipes/translate.pipe';

@Component({
  selector: 'app-attorneys',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './attorneys.html',
  styleUrl: './attorneys.scss',
  standalone: true
})
export class AttorneysComponent implements OnInit, OnDestroy {
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
