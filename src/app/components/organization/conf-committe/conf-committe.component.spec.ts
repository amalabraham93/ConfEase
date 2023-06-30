import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCommitteComponent } from './conf-committe.component';

describe('ConfCommitteComponent', () => {
  let component: ConfCommitteComponent;
  let fixture: ComponentFixture<ConfCommitteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfCommitteComponent]
    });
    fixture = TestBed.createComponent(ConfCommitteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
