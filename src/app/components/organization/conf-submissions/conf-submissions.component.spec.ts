import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfSubmissionsComponent } from './conf-submissions.component';

describe('ConfSubmissionsComponent', () => {
  let component: ConfSubmissionsComponent;
  let fixture: ComponentFixture<ConfSubmissionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfSubmissionsComponent]
    });
    fixture = TestBed.createComponent(ConfSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
