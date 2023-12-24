// posts.component.ts
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute for retrieving route parameters
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts-service.service';
@Component({
  selector: 'app-posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostsComponent implements OnInit {
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
      if (postId) {
        this.loadComments(postId);
      }
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
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }

  deletePost(postId: string) {
    this.postsService.deletePost(postId).subscribe(
      () => {
        console.log('Post deleted successfully.');
        this.loadPosts(); // Refresh the posts list
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }
  deleteComment(postId: string, commentId: string) {
    this.postsService.deleteComment(postId, commentId).subscribe(
      () => {
        console.log('Comment deleted successfully.');
        this.loadComments(postId);
      },
      (error) => {
        console.error('Error deleting comment:', error);
      }
    );
  }


  loadComments(postId: string) {
    this.postsService.getCommentsForPost(postId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }

  createComment(postId: string) {
    const commentData = { postId, content: this.newCommentData.content };
    this.postsService.createComment(commentData).subscribe(
      (data) => {
        console.log('Comment created successfully:', data);
        this.newCommentData = { content: '' };
        this.loadComments(postId);
      },
      (error) => {
        console.error('Error creating comment:', error);
      }
    );
  }

}
