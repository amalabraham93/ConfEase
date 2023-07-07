import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfAttentteBuyTicketsComponent } from './conf-attentte-buy-tickets.component';

describe('ConfAttentteBuyTicketsComponent', () => {
  let component: ConfAttentteBuyTicketsComponent;
  let fixture: ComponentFixture<ConfAttentteBuyTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfAttentteBuyTicketsComponent]
    });
    fixture = TestBed.createComponent(ConfAttentteBuyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
