import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../../../models/teacher.model';

@Injectable()
export class TeachersService {
  private readonly base = 'teachers';
  constructor(private http: HttpClient) {}

  list(): Observable<Teacher[]> { return this.http.get<Teacher[]>(this.base); }
  get(id: number): Observable<Teacher> { return this.http.get<Teacher>(`${this.base}/${id}`); }
  create(payload: Omit<Teacher, 'id'>): Observable<Teacher> { return this.http.post<Teacher>(this.base, payload); }
  update(id: number, payload: Partial<Teacher>): Observable<Teacher> { return this.http.put<Teacher>(`${this.base}/${id}`, payload); }
  remove(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
