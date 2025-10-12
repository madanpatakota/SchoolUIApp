// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ShellComponent } from './layout/shell/shell.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Default -> Home
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // ----- Public pages (no guard) -----
  {
    path: '',
    component: ShellComponent,
    children: [
      // Lazy-load InfoModule which provides /home, /about, /contact
      {
        path: '',
        loadChildren: () =>
          import('./features/info/info.module').then(m => m.InfoModule)
      }
    ]
  },

  // ----- Auth-protected app features -----
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'students',
        title: 'Students',
        loadChildren: () =>
          import('./features/students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'teachers',
        title: 'Teachers',
        loadChildren: () =>
          import('./features/teachers/teachers.module').then(m => m.TeachersModule)
      },
      {
        path: 'classes',
        title: 'Classes',
        loadChildren: () =>
          import('./features/classes/classes.module').then(m => m.ClassesModule)
      }
    ]
  },

  // Auth (login flow)
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  // Fallback
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
