import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationData = {
    username: '',
    email: '',
    age: 0,
    number: 0,
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.registrationData).subscribe(
      response => {
        console.log('Register success:', response);
        // Add logic to navigate to another page or perform other actions
        this.router.navigate(['/login']); // Example: navigate to the '/login' route
      },
      error => console.error('Register error:', error)
    );
  }
}
