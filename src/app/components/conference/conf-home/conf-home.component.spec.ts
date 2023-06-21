import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfHomeComponent } from './conf-home.component';

describe('ConfHomeComponent', () => {
  let component: ConfHomeComponent;
  let fixture: ComponentFixture<ConfHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfHomeComponent]
    });
    fixture = TestBed.createComponent(ConfHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
