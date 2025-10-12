import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../../../models/student.model';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html'
})
export class CreateStudentComponent {
  // Reactive Form (simple rules for freshers)
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    rollNo: ['', [Validators.required]],
    classId: [null as number | null, [Validators.required]],
    dob: ['', [Validators.required]],
    address: ['']
  });

  submitting = false;

  constructor(private fb: FormBuilder, private svc: StudentsService, private router: Router) {}

  // Helper: get next numeric id based on highest existing numeric id
  private getNextId(list: Student[]): number {
    const nums = list
      .map(s => (typeof s.id === 'number' ? s.id : Number(s.id)))
      .filter(n => Number.isFinite(n)) as number[];
    const max = nums.length ? Math.max(...nums) : 0;
    return max + 1;
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;

    // Step 1: get all students
    this.svc.list().subscribe({
      next: (all) => {
        // Step 2: compute next id
        const id = this.getNextId(all);

        // Step 3: create with that id (json-server will just accept it)
        const payload: Student = { id, ...(this.form.value as any) };
        this.svc.create(payload).subscribe({
          next: () => this.router.navigateByUrl('/students'),
          error: () => this.submitting = false
        });
      },
      error: () => this.submitting = false
    });
  }

  get f() { return this.form.controls; }
}
