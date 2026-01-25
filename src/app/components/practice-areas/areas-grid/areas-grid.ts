import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-areas-grid',
  imports: [TranslatePipe],
  templateUrl: './areas-grid.html',
  styleUrl: './areas-grid.scss',
  standalone: true
})
export class AreasGridComponent {

}
