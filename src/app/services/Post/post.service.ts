import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  deletePost(post: any) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`
    );
  }

  getPost(id: number) {
    return this.http.get<Post>(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
  }

  updatePost(post: any) {
    return this.http.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      post
    );
  }
}
