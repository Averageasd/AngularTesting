import { PostService } from './post.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('Post Service', () => {
  let httpTestingController: HttpTestingController;
  let postService: PostService;
  let samplePosts = [
    {
      id: 1,
      title: 'title 1',
      body: 'body 1',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });
    postService = TestBed.inject(PostService);

    // mock httpClient module with HttpClientTestingController
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {

    // no more unmatched requests.
    // let's say we call two apis one for delete and one for getPosts,
    // if we only expect to match getPosts to get called but we call deletePost,
    // then verify() will yield error
    httpTestingController.verify();
  });

  describe('getPosts()', () => {
    it('should return expected posts when getPosts is called', (done: DoneFn) => {
      postService.getPosts().subscribe((posts) => {
        for (let i = 0; i < posts.length; i++) {
          expect(posts[i]).toEqual(samplePosts[i]);
        }
        done();
      });

      // postService.deletePost(samplePosts[0]).subscribe();

      // intercepts outgoing url that is called. make sure this url is called
      const req = httpTestingController.expectOne(
        'https://jsonplaceholder.typicode.com/posts'
      );

      // resolve the request with a mocked value
      // now observable will have value to emit. it will emit samplePosts.
      // then we receive them and verify if they are exactly the samplePosts we defined
      // earlier

      req.flush(samplePosts);

      expect(req.request.method).toBe('GET');
    });
  });
});
