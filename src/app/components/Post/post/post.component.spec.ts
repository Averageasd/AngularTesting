import { RouterTestingModule } from '@angular/router/testing';
import { Post } from './../../../models/Post';
import { PostComponent } from './post.component';
import { first } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PostComponent', () => {
  let fixture: ComponentFixture<PostComponent>;
  let component: PostComponent;
  beforeEach(() => {
    // what we want to test in a module goes inside declarations
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports:[RouterTestingModule]
    });

    // create fixture of PostComponent
    fixture = TestBed.createComponent(PostComponent);

    // get component instance
    component = fixture.componentInstance;
  });
  it('should create post component using TestBed', () => {
    expect(component).toBeDefined();
  });

  it('should render the post title in the anchor element', () => {
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    component.post = post;

    // update DOM with latest data.
    // in this case, once post has value it will be displayed so call detectChanges() so that
    // this new data update will be reflected
    fixture.detectChanges();

    const postElement: DebugElement = fixture.debugElement;
    // get element a in the DOM we are testing
    const postLink = postElement.query(By.css('a')).nativeElement;
    expect(postLink!.textContent).toContain('title 1');
  });

  it('should render the post title in the anchor element using debug element', () => {
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };
    component.post = post;

    // update DOM with latest data.
    // in this case, once post has value it will be displayed so call detectChanges() so that
    // this new data update will be reflected
    fixture.detectChanges();
    const postDebugElement: DebugElement = fixture.debugElement;

    // find element using css selector
    // we don't need to import RouterTestingModule anymore
    const aElement: HTMLElement = postDebugElement.query(
      By.css('a')
    ).nativeElement;

    aElement.textContent = 'title changed';

    fixture.detectChanges();
    expect(aElement?.textContent).toContain('title');
  });

  it('should raise an event when delete post is clicked', () => {
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };

    // assume the post input of component is the above post
    component.post = post;

    // subscribe to delete eventEmitter.
    // first() so we only get the first value in the stream emitted by eventEmitter.
    component.delete.pipe(first()).subscribe((selectedPost) => {
      expect(selectedPost).toEqual(post);
    });

    // call onDelete. verify that delete eventEclearmitter emits post.
    component.onDeletePost(new MouseEvent('click'));
  });
});
