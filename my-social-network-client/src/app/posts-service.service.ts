// posts.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://localhost:3000/api/posts';
  private Url="http://localhost:3000"
  constructor(private http: HttpClient) {
  }
  getUserPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/profile/posts`);
  }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching posts:', error);
          throw error; // Rethrow the error to be caught by the component
        })
      );
  }

  createPost(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, postData)
      .pipe(
        catchError(error => {
          console.error('Error creating post:', error);
          throw error; // Rethrow the error to be caught by the component
        })
      );
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting post:', error);
          return throwError(error);
        })
      );
  }

  getCommentsForPost(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${postId}/comments`)
      .pipe(
        catchError(error => {
          console.error('Error fetching comments:', error);
          throw error;
        })
      );
  }

  createComment(commentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comments`, commentData)
      .pipe(
        catchError(error => {
          console.error('Error creating comment:', error);
          throw error; // Rethrow the error to be caught by the component
        })
      );
  }

  // posts..ts

  deleteComment(postId: string, commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}/comments/${commentId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting comment:', error);
          return throwError(error);
        })
      );
  }



}
