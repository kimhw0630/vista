import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-filter-tabs',
  imports: [TranslatePipe],
  templateUrl: './filter-tabs.html',
  styleUrl: './filter-tabs.scss',
  standalone: true
})
export class FilterTabsComponent {

}
