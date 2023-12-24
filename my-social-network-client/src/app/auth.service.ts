import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUser: any;

  constructor(private http: HttpClient,private router:Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
  // UserService (user.service.ts)
  uploadPhoto(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', file);

    return this.http.post(`${this.apiUrl}/upload-photo`, formData);
  }

  getCurrentUsername(): string {
    return this.currentUser ? this.currentUser.username : '';
  }

  isAuthenticated(): boolean {
    return !!this.currentUser; // Возвращает true, если currentUser существует
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);  // Перенаправление пользователя на страницу входа
  }
}
