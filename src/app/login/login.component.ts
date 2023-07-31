import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private router: Router) {
    
  }
  login(user: string) {
    localStorage.setItem('rol', user);
    this.router.navigate(['users']);
  }
}
