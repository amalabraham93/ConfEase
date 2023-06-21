import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfSubmissionComponent } from './conf-submission.component';

describe('ConfSubmissionComponent', () => {
  let component: ConfSubmissionComponent;
  let fixture: ComponentFixture<ConfSubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfSubmissionComponent]
    });
    fixture = TestBed.createComponent(ConfSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
