import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-attorney-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './attorney-profile.html',
  styleUrl: './attorney-profile.scss'
})
export class AttorneyProfileComponent implements OnInit {
  activeTab: string = 'biography';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get attorney ID from route params
    this.route.params.subscribe(params => {
      const id = params['id'];
      // In a real app, you would fetch attorney data based on this ID
      console.log('Attorney ID:', id);
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
