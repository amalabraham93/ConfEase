import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPresentationsComponent } from './conf-presentations.component';

describe('ConfPresentationsComponent', () => {
  let component: ConfPresentationsComponent;
  let fixture: ComponentFixture<ConfPresentationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfPresentationsComponent]
    });
    fixture = TestBed.createComponent(ConfPresentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
