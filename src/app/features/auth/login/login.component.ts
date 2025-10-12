import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router) {}
  login(_: any) {
    localStorage.setItem('token', 'demo'); // demo only
    this.router.navigateByUrl('/dashboard');
  }
}
