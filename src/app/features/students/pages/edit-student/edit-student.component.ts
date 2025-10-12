import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../../../models/student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html'
})
export class EditStudentComponent implements OnInit {
  id!: number;
  loading = true;
  submitting = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    rollNo: ['', [Validators.required]],
    classId: [null as number | null, [Validators.required]],
    dob: ['', [Validators.required]],
    address: ['']
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: StudentsService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.router.navigateByUrl('/students');
      return;
    }

    this.svc.get(this.id).subscribe({
      next: (s: Student) => {
        // ensure date input gets yyyy-mm-dd
        const dob = s.dob?.slice(0, 10) || '';
        this.form.patchValue({ ...s, dob });
        this.loading = false;
      },
      error: () => {
        alert('Student not found');
        this.router.navigateByUrl('/students');
      }
    });
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    this.svc.update(this.id, this.form.value as Partial<Student>).subscribe({
      next: () => this.router.navigateByUrl('/students'),
      error: () => (this.submitting = false)
    });
  }

  get f() { return this.form.controls; }
}
