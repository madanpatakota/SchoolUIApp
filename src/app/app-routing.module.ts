import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ShellComponent } from './layout/shell/shell.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'students',  loadChildren: () => import('./features/students/students.module').then(m => m.StudentsModule) },
      { path: 'teachers',  loadChildren: () => import('./features/teachers/teachers.module').then(m => m.TeachersModule) },
    ]
  },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'students', loadChildren: () => import('./features/students/students.module').then(m => m.StudentsModule) },
  { path: 'teachers', loadChildren: () => import('./features/teachers/teachers.module').then(m => m.TeachersModule) },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
