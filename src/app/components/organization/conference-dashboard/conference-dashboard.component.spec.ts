import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceDashboardComponent } from './conference-dashboard.component';

describe('ConferenceDashboardComponent', () => {
  let component: ConferenceDashboardComponent;
  let fixture: ComponentFixture<ConferenceDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConferenceDashboardComponent]
    });
    fixture = TestBed.createComponent(ConferenceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
