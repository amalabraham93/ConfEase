import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPresentationComponent } from './conf-presentation.component';

describe('ConfPresentationComponent', () => {
  let component: ConfPresentationComponent;
  let fixture: ComponentFixture<ConfPresentationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfPresentationComponent]
    });
    fixture = TestBed.createComponent(ConfPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
