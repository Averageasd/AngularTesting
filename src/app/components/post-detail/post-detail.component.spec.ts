import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/Post/post.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  let mockActivateRoute;
  let mockPostServive: jasmine.SpyObj<PostService>;
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(() => {
    mockActivateRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          },
        },
      },
    };

    mockPostServive = jasmine.createSpyObj('PostService', [
      'getPost',
      'updatePost',
    ]);

    mockLocation = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: PostService,
          useValue: mockPostServive,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivateRoute,
        },
        {
          provide: Location,
          useValue: mockLocation,
        },
      ],
    });

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
  });

  describe('getPost()', () => {
    beforeEach(() => {
      mockPostServive.getPost.and.returnValue(
        of({
          id: 1,
          title: 'title 1',
          body: 'body 1',
        })
      );
    });

    it('post title should contains title of post model', () => {
      fixture.detectChanges();
      const postElement = fixture.debugElement;
      const postTitle = postElement.query(By.css('h2')).nativeElement;
      expect(postTitle.textContent).toContain('title 1');
      expect(mockPostServive.getPost).toHaveBeenCalledOnceWith(3);
    });

    it('getPost() from postService should be called with param of 3', () => {
      fixture.detectChanges();
      expect(mockPostServive.getPost).toHaveBeenCalledOnceWith(3);
    });

    it('post title and body input values should contain post model title and body', () => {
      fixture.detectChanges();
      const postElement = fixture.debugElement;
      const postTitleInput = postElement.query(
        By.css('#post-title-input')
      ).nativeElement;

      const postBodyInput = postElement.query(
        By.css('#post-body-input')
      ).nativeElement;
      expect(postTitleInput.getAttribute('ng-reflect-model')).toContain(
        component.post.title
      );
      expect(postBodyInput.getAttribute('ng-reflect-model')).toContain(
        component.post.body
      );
    });
  });

  describe('goBack()', () => {
    it('location.back should be invoked once goBack() is invoked()', () => {
      component.goBack();
      expect(mockLocation.back).toHaveBeenCalledTimes(1);
    });
  });

  describe('save()', () => {
    it('after updatePost() of PostService is called, location.back should be triggered', () => {
      mockPostServive.updatePost.and.returnValue(of({}));
      component.save();
      expect(mockPostServive.updatePost).toHaveBeenCalledTimes(1);
      expect(mockPostServive.updatePost).toHaveBeenCalledOnceWith(
        component.post
      );
      expect(mockLocation.back).toHaveBeenCalled();
    });
  });
});
