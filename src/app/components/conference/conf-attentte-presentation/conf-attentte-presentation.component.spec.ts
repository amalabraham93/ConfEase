import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfAttenttePresentationComponent } from './conf-attentte-presentation.component';

describe('ConfAttenttePresentationComponent', () => {
  let component: ConfAttenttePresentationComponent;
  let fixture: ComponentFixture<ConfAttenttePresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfAttenttePresentationComponent]
    });
    fixture = TestBed.createComponent(ConfAttenttePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
