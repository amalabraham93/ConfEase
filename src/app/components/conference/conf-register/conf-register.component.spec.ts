import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfRegisterComponent } from './conf-register.component';

describe('ConfRegisterComponent', () => {
  let component: ConfRegisterComponent;
  let fixture: ComponentFixture<ConfRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfRegisterComponent]
    });
    fixture = TestBed.createComponent(ConfRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
