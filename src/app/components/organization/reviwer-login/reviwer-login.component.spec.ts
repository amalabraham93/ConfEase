import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviwerLoginComponent } from './reviwer-login.component';

describe('ReviwerLoginComponent', () => {
  let component: ReviwerLoginComponent;
  let fixture: ComponentFixture<ReviwerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviwerLoginComponent]
    });
    fixture = TestBed.createComponent(ReviwerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
