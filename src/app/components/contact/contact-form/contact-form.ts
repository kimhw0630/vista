import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-contact-form',
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
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

  async onSubmit(event: Event, form: any) {
    event.preventDefault();
    
    if (!form.valid) {
      // Mark all fields as touched to show validation errors
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    try {
      const response = await fetch('/assets/api/contact_godaddy.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(this.formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        this.submitMessage = result.message || 'Thank you for contacting us. We will get back to you soon!';
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
        form.resetForm();
      } else {
        this.submitMessage = result.message || 'Failed to send message. Please try again.';
        this.submitSuccess = false;
      }
    } catch (error) {
      console.error('Contact form error:', error);
      this.submitMessage = 'An error occurred. Please try again later or call us directly at (905) 886-3339.';
      this.submitSuccess = false;
    } finally {
      this.isSubmitting = false;
    }
  }
}
