import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent {
// shell.component.ts
isLoggedIn = !!localStorage.getItem('token');
logout() { localStorage.removeItem('token'); this.isLoggedIn = false; location.href = '/home'; }

}
