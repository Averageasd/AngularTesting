import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/Post/post.service';
import { Post } from '../../models/Post';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const idNum = this.route.snapshot.paramMap.get('id');
    idNum &&
      this.postService.getPost(+idNum).subscribe((post) => {
        this.post = post;
      });
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.postService.updatePost(this.post).subscribe(()=>{
      this.location.back();
    })
  }
}
