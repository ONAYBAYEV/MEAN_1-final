// posts.component.ts
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute for retrieving route parameters
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  posts: any[] = [];
  newPostData: any = { title: '', content: '' };
  comments: any[] = [];
  newCommentData: any = { content: '' };

  constructor(private postsService: PostsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.loadPosts();
    this.route.paramMap.subscribe(params => {
      const postId = params.get('postId');

    });
  }

  loadPosts() {
    this.postsService.getPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
  }

  createPost() {
    this.postsService.createPost(this.newPostData).subscribe(
      (data) => {
        console.log('Post created successfully:', data);
        this.newPostData = { title: '', content: '' }; // Clear new post data after creation
        this.loadPosts(); // Refresh the posts list
        this.router.navigate(['/posts']);
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }



}
