// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AppComponent } from './app.component';
import { PostsComponent } from './post/post.component';
import { PostsService } from './posts-service.service';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component'; // Import the ProfileComponent
import { UserService } from './user.service';
import { CreatePostComponent } from './post/create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfileComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PostsService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
