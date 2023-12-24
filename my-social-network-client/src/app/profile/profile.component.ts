import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import  {PostsService} from "../posts-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  username: string | null = null;
  email: string | null = null;
  age: number | null = null;
  number: number | null = null;


  constructor(private userService: UserService,) {}

  ngOnInit(): void {
    this.userService.userProfile$.subscribe((userProfile) => {
      this.username = userProfile.username;
      this.email = userProfile.email;
      this.age = userProfile.age;
      this.number = userProfile.number;
    });
  }

}
