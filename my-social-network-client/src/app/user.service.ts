import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userProfileSubject = new BehaviorSubject<any | null>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  setUserProfile(profile: any): void {
    this.userProfileSubject.next(profile);
  }
}
