import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../../models/student.model';

@Injectable() // provided by StudentsModule for feature scope
export class StudentsService {
  private readonly base = 'students';
  constructor(private http: HttpClient) {}

  list(): Observable<Student[]> {
    return this.http.get<Student[]>(this.base);
  }
  get(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.base}/${id}`);
  }
  create(payload: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(this.base, payload);
  }
  update(id: number, payload: Partial<Student>): Observable<Student> {
    return this.http.put<Student>(`${this.base}/${id}`, payload);
  }
  remove(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
