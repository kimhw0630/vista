import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AttorneyService, Attorney } from '../../app/services/attorney.service';

@Component({
  selector: 'app-attorney-profile',
  imports: [RouterLink],
  templateUrl: './attorney-profile.html',
  styleUrl: './attorney-profile.scss'
})
export class AttorneyProfileComponent implements OnInit {
  activeTab: string = 'biography';
  attorney: Attorney | undefined;
  returnUrl: string = '/lawyers';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attorneyService: AttorneyService
  ) {}

  ngOnInit() {
    // Get attorney ID from route params
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.attorney = this.attorneyService.getAttorneyById(id);
      
      // If attorney not found, redirect to lawyers page
      if (!this.attorney) {
        this.router.navigate(['/lawyers']);
      }
    });

    // Check if there's a returnUrl query parameter
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goBack() {
    this.router.navigate([this.returnUrl]);
  }
}
