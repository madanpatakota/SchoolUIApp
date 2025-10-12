import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule, SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
