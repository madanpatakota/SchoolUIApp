import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html'
})
export class CreateStudentComponent {
  submitting = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    rollNo: ['', [Validators.required]],
    classId: [null as number | null, [Validators.required]],
    dob: ['', [Validators.required]],
    address: ['']
  });

  constructor(private fb: FormBuilder, private svc: StudentsService, private router: Router) {}

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    // json-server will auto-generate id
    const payload = this.form.value as {
      name: string; rollNo: string; classId: number; dob: string; address?: string;
    };
    this.svc.create(payload as any).subscribe({
      next: () => this.router.navigateByUrl('/students'),
      error: () => (this.submitting = false)
    });
  }

  // easy template access
  get f() { return this.form.controls; }
}
