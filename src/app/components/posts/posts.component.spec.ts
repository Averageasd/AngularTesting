import { Post } from './../../models/Post';
import { first, of } from 'rxjs';
import { PostService } from '../../services/Post/post.service';
import { PostsComponent } from './posts.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostComponent } from '../Post/post/post.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostsComponent', () => {
  let posts: Post[];
  let fixture: ComponentFixture<PostsComponent>;
  let component: PostsComponent;
  let mockedPostService: MockedPostService;

  class MockedPostService {
    getPosts() {
      return of(posts);
    }

    deletePost(post: any) {
      return of({});
    }
  }
  beforeEach(async () => {
    posts = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
      },
    ];

    // resolve dependencies using TestBed
    // provide component and dependent service for testing.
    // use the mocked service with useValue
    TestBed.configureTestingModule({
      declarations: [PostsComponent, PostComponent],

      // check what classes and or instances of injected services to use
      providers: [
        {
          provide: PostService,
          useClass: MockedPostService,
        },
      ],

      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    // retrieve instance of PostsComponent with all injected mocked services
    component = fixture.componentInstance;

    component.posts = posts;

    // mock deletePost of mockedPostService.
    // make it return an observable with value
    mockedPostService = TestBed.inject(PostService) as MockedPostService;
  });

  describe('getPosts', () => {
    beforeEach(() => {
      spyOn(mockedPostService, 'getPosts').and.callThrough();
    });
    it('should set posts from service in ngOnInit', () => {
      // after updates to DOM. list of posts will be added after this line
      // calls constructor and ngOnInit
      fixture.detectChanges();

      expect(component.posts.length).toBe(posts.length);
      for (let i = 0; i < component.posts.length; i++) {
        expect(component.posts[i]).toEqual(posts[i]);
      }
      expect(mockedPostService.getPosts).toHaveBeenCalled();
    });

    it('size of post list should be equal to size of component.posts', () => {
      fixture.detectChanges();
      expect(component.posts.length).toBe(posts.length);

      // get all post components using the directive method by debugElement
      const childPostList = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );

      // length of list of post components should be equal to list of post models
      // since we expect to create 1 post component for each post model
      expect(childPostList.length).toBe(component.posts.length);
    });

    it('should create 1 app-post for each post model', () => {
      fixture.detectChanges();
      const childPostList = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );
      expect(childPostList.length).toBe(component.posts.length);
      const postLength: number = component.posts.length;

      // loop through list of all post components
      for (let i = 0; i < postLength; i++) {
        // get instance of each post component
        const appPostDebugElement = childPostList[i];

        const postComponentInstance =
          appPostDebugElement.componentInstance as PostComponent;

        // get the post input and compare it with each post model at same index
        expect(postComponentInstance.post).toEqual(component.posts[i]);
        const postComponentTitle = appPostDebugElement.query(
          By.css('h3')
        ).nativeElement;
        expect(postComponentTitle.textContent).toContain(
          component.posts[i].title
        );
      }
    });
  });
  describe('deletePost', () => {
    beforeEach(() => {
      spyOn(mockedPostService, 'getPosts').and.callThrough();
      spyOn(mockedPostService, 'deletePost').and.callThrough();
    });
    it('delete post with id 1', () => {
      const dummyPost = {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      };
      // pass post to component
      component.deletePost(dummyPost);

      // mocked delete of postService should be called
      // withContext makes error message clearer
      expect(mockedPostService.deletePost)
        .withContext('postService should be called')
        .toHaveBeenCalledTimes(1);

      // deletePost actually remove a post from posts list
      // so length is 2
      expect(component.posts.length).toBe(2);

      // post with id 1 should be gone by now
      component.posts.forEach((post) => {
        expect(post).not.toEqual(dummyPost);
      });
    });

    it('should not change posts list size if post is not found', () => {
      const dummyPost = {
        id: 4,
        body: 'body 4',
        title: 'title 4',
      };
      const postsLengthBeforeDelete = component.posts.length;

      component.deletePost(dummyPost);

      expect(mockedPostService.deletePost).toHaveBeenCalledTimes(1);
      expect(component.posts.length).toBe(postsLengthBeforeDelete);
    });

    it('when child component delete button is clicked, deletePost should be called', () => {
      // initalize list of app-posts first
      fixture.detectChanges();

      spyOn(component, 'deletePost').and.callThrough();
      const childPostList = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );

      const firstPostComponent = childPostList[0];

      const postComponentButton = firstPostComponent.query(By.css('button'));

      postComponentButton.triggerEventHandler('click', {
        preventDefault: () => {},
      });

      expect(postComponentButton.nativeElement.textContent).toContain(
        'Delete Post'
      );
      expect(component.deletePost).toHaveBeenCalledTimes(1);
      expect(component.deletePost).toHaveBeenCalledWith(posts[0]);
      expect(component.posts).not.toContain(posts[0]);
    });

    it('test child delete event emitter', () => {
      spyOn(component, 'deletePost').and.callThrough();
      fixture.detectChanges();
      const childPostList = fixture.debugElement.queryAll(
        By.directive(PostComponent)
      );

      const firstPostComponent = childPostList[0].componentInstance as PostComponent;

      // delete eventEmitter emits post
      firstPostComponent.delete.emit(firstPostComponent.post);

      // after delete eventEmitter emits post, the deletePost of PostsComponent is called.
      expect(component.deletePost).toHaveBeenCalledTimes(1);
      expect(component.deletePost).toHaveBeenCalledWith(posts[0]);
    });
  });
});
