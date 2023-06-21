import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfNavComponent } from './conf-nav.component';

describe('ConfNavComponent', () => {
  let component: ConfNavComponent;
  let fixture: ComponentFixture<ConfNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfNavComponent]
    });
    fixture = TestBed.createComponent(ConfNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
