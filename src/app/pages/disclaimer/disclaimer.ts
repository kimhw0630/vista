import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-disclaimer',
  imports: [RouterLink],
  templateUrl: './disclaimer.html',
  styleUrl: './disclaimer.scss',
  standalone: true
})
export class DisclaimerComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      title: 'Disclaimer & Legal Notices - VISTA Law',
      description: 'Read VISTA Law\'s disclaimer and legal notices. Important information about the use of this website, legal advice, and attorney-client relationships.',
      keywords: 'legal disclaimer, attorney disclaimer, law firm terms, legal notices, VISTA Law disclaimer',
      url: 'https://vistallp.ca/disclaimer'
    });
  }
}
