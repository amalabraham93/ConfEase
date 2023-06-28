import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfParticipantsComponent } from './conf-participants.component';

describe('ConfParticipantsComponent', () => {
  let component: ConfParticipantsComponent;
  let fixture: ComponentFixture<ConfParticipantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfParticipantsComponent]
    });
    fixture = TestBed.createComponent(ConfParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
