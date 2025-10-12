import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  model = { name: '', email: '', message: '' };
  submitted = false;

  submit(form: any) {
    if (form.invalid) return;
    this.submitted = true;

    // Demo only: show success and reset
    setTimeout(() => {
      form.resetForm();
      this.submitted = false;
      alert('Thanks! Your message was sent (demo).');
    }, 800);
  }
}
