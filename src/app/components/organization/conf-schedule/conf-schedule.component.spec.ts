import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfScheduleComponent } from './conf-schedule.component';

describe('ConfScheduleComponent', () => {
  let component: ConfScheduleComponent;
  let fixture: ComponentFixture<ConfScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfScheduleComponent]
    });
    fixture = TestBed.createComponent(ConfScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
