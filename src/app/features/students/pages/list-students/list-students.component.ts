import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../../../models/student.model';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html'
})
export class ListStudentsComponent implements OnInit {
  rows: Student[] = [];
  loading = true;
  q = ''; // simple filter

  constructor(private svc: StudentsService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.svc.list().subscribe({
      next: (r) => { this.rows = r; this.loading = false; },
      error: () => { this.rows = []; this.loading = false; }
    });
  }

  filtered(): Student[] {
    if (!this.q.trim()) return this.rows;
    const term = this.q.toLowerCase();
    return this.rows.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.rollNo.toLowerCase().includes(term) ||
      String(s.classId).includes(term)
    );
  }

  delete(id: number): void {
    if (!confirm('Delete this student?')) return;
    this.svc.remove(id).subscribe(() => {
      this.rows = this.rows.filter(x => x.id !== id);
    });
  }
}
