import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-search-filter',
  imports: [TranslatePipe],
  templateUrl: './search-filter.html',
  styleUrl: './search-filter.scss',
  standalone: true
})
export class SearchFilterComponent {

}
