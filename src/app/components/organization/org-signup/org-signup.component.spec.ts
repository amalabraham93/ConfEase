import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSignupComponent } from './org-signup.component';

describe('OrgSignupComponent', () => {
  let component: OrgSignupComponent;
  let fixture: ComponentFixture<OrgSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgSignupComponent]
    });
    fixture = TestBed.createComponent(OrgSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
