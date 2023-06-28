import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConferenceComponent } from './user-conference.component';

describe('UserConferenceComponent', () => {
  let component: UserConferenceComponent;
  let fixture: ComponentFixture<UserConferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserConferenceComponent]
    });
    fixture = TestBed.createComponent(UserConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
