import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviwerHomeComponent } from './reviwer-home.component';

describe('ReviwerHomeComponent', () => {
  let component: ReviwerHomeComponent;
  let fixture: ComponentFixture<ReviwerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviwerHomeComponent]
    });
    fixture = TestBed.createComponent(ReviwerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
