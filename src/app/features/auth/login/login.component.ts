// src/app/features/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
  constructor(private router: Router) {}
  login(_: any) {
    localStorage.setItem('token', 'demo');   // 👈 simple demo “login”
    this.router.navigateByUrl('/dashboard'); // go to a protected page
  }
}
