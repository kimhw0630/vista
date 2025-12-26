import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/contact/hero-section/hero-section';
import { ContactInfoComponent } from '../../components/contact/contact-info/contact-info';
import { ContactFormComponent } from '../../components/contact/contact-form/contact-form';

@Component({
  selector: 'app-contact',
  imports: [
    HeroSectionComponent,
    ContactInfoComponent,
    ContactFormComponent
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  standalone: true
})
export class ContactComponent {

}
