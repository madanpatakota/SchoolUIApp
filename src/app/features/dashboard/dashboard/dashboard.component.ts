import { Component, OnInit } from '@angular/core';
import { DashboardService, Summary, RecentStudent, Notice } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = true;
  summary!: Summary;
  recentStudents: RecentStudent[] = [];
  notices: Notice[] = [];
  errorMsg = '';

  constructor(private ds: DashboardService) {}

  ngOnInit(): void {
    this.ds.loadDashboard().subscribe({
      next: ({ summary, recentStudents, notices }) => {
        this.summary = summary;
        this.recentStudents = recentStudents;
        this.notices = notices;
        this.loading = false;
      },
      error: (e) => {
        this.errorMsg = e.message || 'Failed to load dashboard';
        this.loading = false;
      }
    });
  }
}
