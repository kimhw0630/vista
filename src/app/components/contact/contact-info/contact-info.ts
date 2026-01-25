import { Component } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-contact-info',
  imports: [TranslatePipe],
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.scss',
  standalone: true
})
export class ContactInfoComponent {

}
