import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.loginData).subscribe(
      response => {
        console.log('Login success:', response);
        this.userService.setUserProfile(response.user);
        this.router.navigate(['/profile/:username']);
      },
      error => console.error('Login error:', error)
    );
  }
}
