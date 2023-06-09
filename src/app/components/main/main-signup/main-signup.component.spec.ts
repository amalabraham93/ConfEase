import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSignupComponent } from './main-signup.component';

describe('MainSignupComponent', () => {
  let component: MainSignupComponent;
  let fixture: ComponentFixture<MainSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainSignupComponent]
    });
    fixture = TestBed.createComponent(MainSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
