import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeachersService } from '../../services/teachers.service';
import { Teacher } from '../../../../models/teacher.model';

const PHONE_RE = /^[0-9]{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html'
})
export class EditTeacherComponent implements OnInit {
  id!: number;
  loading = true;
  submitting = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    subject: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_RE)]],
    email: ['', [Validators.email, Validators.pattern(EMAIL_RE)]],
    joinDate: ['']
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: TeachersService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) { this.router.navigateByUrl('/teachers'); return; }

    this.svc.get(this.id).subscribe({
      next: (t: Teacher) => {
        const joinDate = t.joinDate?.slice(0, 10) || '';
        this.form.patchValue({ ...t, joinDate });
        this.loading = false;
      },
      error: () => { alert('Teacher not found'); this.router.navigateByUrl('/teachers'); }
    });
  }

  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    this.svc.update(this.id, this.form.value as Partial<Teacher>).subscribe({
      next: () => this.router.navigateByUrl('/teachers'),
      error: () => this.submitting = false
    });
  }

  get f() { return this.form.controls; }
}
