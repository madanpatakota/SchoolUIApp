// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ShellComponent } from './layout/shell/shell.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

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
      { path: 'classes', loadChildren: () => import('./features/classes/classes.module').then(m => m.ClassesModule) },

      // add more feature routes here…
    ]
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'classes', loadChildren: () => import('./features/classes/classes.module').then(m => m.ClassesModule) },

  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, // optional: preloads lazy modules after load
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
