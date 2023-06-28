import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmailverifyComponent } from './user-emailverify.component';

describe('UserEmailverifyComponent', () => {
  let component: UserEmailverifyComponent;
  let fixture: ComponentFixture<UserEmailverifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEmailverifyComponent]
    });
    fixture = TestBed.createComponent(UserEmailverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
