import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../../../models/student.model';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html'
})
export class ListStudentsComponent implements OnInit {
  rows: Student[] = [];  // all students from API
  loading = true;        // show "Loading…" while API call runs
  q = '';                // simple search text

  constructor(private svc: StudentsService) {}

  ngOnInit(): void {
    this.load();
  }

  // get all students
  load(): void {
    this.loading = true;
    this.svc.list().subscribe({
      next: (data) => { this.rows = data; this.loading = false; },
      error: () => { this.rows = []; this.loading = false; }
    });
  }

  // simple in-memory filter (searches name, rollNo, classId)
  filtered(): Student[] {
    const term = this.q.trim().toLowerCase();
    if (!term) return this.rows;
    return this.rows.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.rollNo.toLowerCase().includes(term) ||
      String(s.classId).includes(term)
    );
  }

  // delete one student
  delete(id: number | string): void {
    if (!confirm('Delete this student?')) return;
    this.svc.remove(id).subscribe(() => {
      this.rows = this.rows.filter(x => x.id !== id);
    });
  }
}
