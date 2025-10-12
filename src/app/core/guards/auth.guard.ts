// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const isLoggedIn = !!localStorage.getItem('token');  // 👈 your “session”
    if (!isLoggedIn) this.router.navigateByUrl('/auth/login');
    return isLoggedIn;
  }
}
