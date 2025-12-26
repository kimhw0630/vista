import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
  standalone: true
})
export class ContactFormComponent {
  formData = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  
  privacyAccepted = false;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  async onSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.privacyAccepted) {
      this.submitMessage = 'Please accept the privacy policy';
      this.submitSuccess = false;
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    try {
      const response = await fetch('/assets/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      });

      const result = await response.json();
      
      if (result.success) {
        this.submitMessage = result.message;
        this.submitSuccess = true;
        // Reset form
        this.formData = {
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        };
        this.privacyAccepted = false;
      } else {
        this.submitMessage = result.message;
        this.submitSuccess = false;
      }
    } catch (error) {
      this.submitMessage = 'An error occurred. Please try again later.';
      this.submitSuccess = false;
    } finally {
      this.isSubmitting = false;
    }
  }
}
