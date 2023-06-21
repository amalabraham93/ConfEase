import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfConfigComponent } from './conf-config.component';

describe('ConfConfigComponent', () => {
  let component: ConfConfigComponent;
  let fixture: ComponentFixture<ConfConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfConfigComponent]
    });
    fixture = TestBed.createComponent(ConfConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
