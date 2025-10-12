import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeachersService } from '../../services/teachers.service';

const PHONE_RE = /^[0-9]{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html'
})
export class CreateTeacherComponent {
  submitting = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    subject: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_RE)]],
    email: ['', [Validators.email, Validators.pattern(EMAIL_RE)]],
    joinDate: ['']
  });

  constructor(private fb: FormBuilder, private svc: TeachersService, private router: Router) {}

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    this.svc.create(this.form.value as any).subscribe({
      next: () => this.router.navigateByUrl('/teachers'),
      error: () => this.submitting = false
    });
  }

  get f() { return this.form.controls; }
}
