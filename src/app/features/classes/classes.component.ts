import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Offcanvas } from 'bootstrap';
import { ClassesService } from './services/classes.service';
import { ClassRoom } from '../../models/class.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html'
})
export class ClassesComponent implements OnInit {
  loading = true;
  rows: ClassRoom[] = [];
  q = '';
  subjectFilter = '';
  teacherFilter = '';

  // Offcanvas form (create/edit)
  editingId?: number;
  submitting = false;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    section: [''],
    room: [''],
    capacity: [30, [Validators.min(1)]],
    teacherId: [null as number | null],
    subject: ['']
  });

  constructor(private fb: FormBuilder, private svc: ClassesService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.svc.list().subscribe({
      next: r => { this.rows = r; this.loading = false; },
      error: () => { this.rows = []; this.loading = false; }
    });
  }

  filtered(): ClassRoom[] {
    const term = this.q.trim().toLowerCase();
    return this.rows.filter(c => {
      const matchesText = !term ||
        c.name.toLowerCase().includes(term) ||
        (c.room || '').toLowerCase().includes(term) ||
        (c.subject || '').toLowerCase().includes(term);
      const matchesSubject = !this.subjectFilter || (c.subject || '').toLowerCase().includes(this.subjectFilter.toLowerCase());
      const matchesTeacher = !this.teacherFilter || String(c.teacherId || '').includes(this.teacherFilter);
      return matchesText && matchesSubject && matchesTeacher;
    });
  }

  // ------- Offcanvas helpers -------
  openCanvas(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const ref = Offcanvas.getOrCreateInstance(el);
    ref.show();
  }
  closeCanvas(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const ref = Offcanvas.getInstance(el) || Offcanvas.getOrCreateInstance(el);
    ref.hide();
  }

  // ------- Create / Edit -------
  startCreate() {
    this.editingId = undefined;
    this.form.reset({ name: '', section: '', room: '', capacity: 30, teacherId: null, subject: '' });
    this.openCanvas('classEditorCanvas');
  }

  startEdit(c: ClassRoom) {
    this.editingId = c.id;
    this.form.reset({
      name: c.name || '',
      section: c.section || '',
      room: c.room || '',
      capacity: c.capacity ?? 30,
      teacherId: c.teacherId ?? null,
      subject: c.subject || ''
    });
    this.openCanvas('classEditorCanvas');
  }

  save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;

    if (this.editingId) {
      this.svc.update(this.editingId, this.form.value as Partial<ClassRoom>).subscribe({
        next: (res) => {
          this.rows = this.rows.map(r => r.id === this.editingId ? { ...r, ...res } : r);
          this.submitting = false;
          this.closeCanvas('classEditorCanvas');
        },
        error: () => this.submitting = false
      });
    } else {
      this.svc.create(this.form.value as Omit<ClassRoom, 'id'>).subscribe({
        next: (created) => {
          this.rows = [created, ...this.rows];
          this.submitting = false;
          this.closeCanvas('classEditorCanvas');
        },
        error: () => this.submitting = false
      });
    }
  }

  confirmRemoveId?: number;
  askRemove(id: number) {
    this.confirmRemoveId = id;
    const el = document.getElementById('confirmRemoveModal')!;
    (window as any).bootstrap?.Modal.getOrCreateInstance(el).show();
  }
  remove() {
    if (!this.confirmRemoveId) return;
    this.svc.remove(this.confirmRemoveId).subscribe(() => {
      this.rows = this.rows.filter(r => r.id !== this.confirmRemoveId);
      this.confirmRemoveId = undefined;
    });
  }

  get f() { return this.form.controls; }
}
