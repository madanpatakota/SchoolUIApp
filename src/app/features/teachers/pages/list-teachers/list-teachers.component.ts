import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { TeachersService } from '../../services/teachers.service';
import { Teacher } from '../../../../models/teacher.model';

const PHONE_RE = /^[0-9]{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html'
})
export class ListTeachersComponent implements OnInit {
  rows: Teacher[] = [];
  loading = true;
  q = '';

  // View modal
  selected?: Teacher;

  // Edit modal
  editingId?: number;
  submitting = false;
  editForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    subject: ['', [Validators.required]] ,
    phone: ['', [Validators.required, Validators.pattern(PHONE_RE)]],
    email: ['', [Validators.pattern(EMAIL_RE)]],
    joinDate: [''] // yyyy-mm-dd
  });

  constructor(private svc: TeachersService, private fb: FormBuilder) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.svc.list().subscribe({
      next: r => { this.rows = r; this.loading = false; },
      error: () => { this.rows = []; this.loading = false; }
    });
  }

  filtered(): Teacher[] {
    const t = this.q.trim().toLowerCase();
    if (!t) return this.rows;
    return this.rows.filter(x =>
      x.name.toLowerCase().includes(t) ||
      x.subject.toLowerCase().includes(t) ||
      (x.phone || '').toLowerCase().includes(t) ||
      (x.email || '').toLowerCase().includes(t)
    );
  }

  // ---- Bootstrap modal helpers ----
  openModalById(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const instance = Modal.getOrCreateInstance(el);
    instance.show();
  }
  closeModalById(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const instance = Modal.getInstance(el) || Modal.getOrCreateInstance(el);
    instance.hide();
  }

  // ---- View modal ----
  openDetails(t: Teacher) {
    this.selected = t;
    this.openModalById('teacherDetailsModal');
  }

  // ---- Edit modal ----
  openEdit(t: Teacher) {
    this.editingId = t.id;
    this.editForm.reset({
      name: t.name || '',
      subject: t.subject || '',
      phone: t.phone || '',
      email: t.email || '',
      joinDate: (t.joinDate || '').slice(0, 10)
    });
    this.openModalById('editTeacherModal');
  }

  saveEdit() {
    if (this.editForm.invalid || !this.editingId) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.svc.update(this.editingId, this.editForm.value as Partial<Teacher>).subscribe({
      next: (updated) => {
        // Update list in-place
        this.rows = this.rows.map(r => (r.id === this.editingId ? { ...r, ...updated } : r));
        this.submitting = false;
        this.closeModalById('editTeacherModal');
      },
      error: () => (this.submitting = false)
    });
  }

  // ---- Delete confirm modal ----
  toDeleteId?: number;
  askDelete(id: number) { this.toDeleteId = id; this.openModalById('confirmDeleteModal'); }
  confirmDelete() {
    if (!this.toDeleteId) return;
    this.svc.remove(this.toDeleteId).subscribe(() => {
      this.rows = this.rows.filter(x => x.id !== this.toDeleteId);
      this.toDeleteId = undefined;
      this.closeModalById('confirmDeleteModal');
    });
  }

  get f() { return this.editForm.controls; }
}
