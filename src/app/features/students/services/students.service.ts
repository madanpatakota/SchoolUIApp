import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../../models/student.model';

@Injectable() // provided in StudentsModule (feature-scoped)
export class StudentsService {
  private readonly base = 'students'; // json-server endpoint: /students

  constructor(private http: HttpClient) {}

  list(): Observable<Student[]> {
    return this.http.get<Student[]>(this.base);
  }

  get(id: number | string): Observable<Student> {
    return this.http.get<Student>(`${this.base}`,  { params: { id: String(id) }});
  }

  create(payload: Student | Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(this.base, payload as any);
  }

  update(id: number | string, payload: Partial<Student>): Observable<Student> {
    return this.http.put<Student>(`${this.base}/${id}`, payload);
  }

  remove(id: number | string) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
