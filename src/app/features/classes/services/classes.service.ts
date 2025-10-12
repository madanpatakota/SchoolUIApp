import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassRoom } from '../../../models/class.model';

@Injectable()
export class ClassesService {
  private readonly base = 'classes';
  constructor(private http: HttpClient) {}

  list(): Observable<ClassRoom[]> { return this.http.get<ClassRoom[]>(this.base); }
  get(id: number): Observable<ClassRoom> { return this.http.get<ClassRoom>(`${this.base}/${id}`); }
  create(payload: Omit<ClassRoom, 'id'>): Observable<ClassRoom> { return this.http.post<ClassRoom>(this.base, payload); }
  update(id: number, payload: Partial<ClassRoom>): Observable<ClassRoom> { return this.http.put<ClassRoom>(`${this.base}/${id}`, payload); }
  remove(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
