import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

export type Summary = {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  feesDueThisMonth: number;
};

export type Notice = {
  id: number;
  title: string;
  body: string;
  date: string; // ISO
};

export type RecentStudent = {
  id: number;
  name: string;
  rollNo: string;
  classId: number;
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getSummary(): Observable<Summary> {
    return this.http.get<Summary>('dashboardSummary');
  }

  getRecentStudents(limit = 5): Observable<RecentStudent[]> {
    return this.http.get<RecentStudent[]>(`students?_sort=id&_order=desc&_limit=${limit}`);
  }

  getNotices(): Observable<Notice[]> {
    return this.http.get<Notice[]>('notices?_sort=date&_order=desc&_limit=5');
  }

  // Convenience for one-shot load in the component
  loadDashboard() {
    return forkJoin({
      summary: this.getSummary(),
      recentStudents: this.getRecentStudents(),
      notices: this.getNotices()
    });
  }
}
