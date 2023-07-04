import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviwerPaperViewComponent } from './reviwer-paper-view.component';

describe('ReviwerPaperViewComponent', () => {
  let component: ReviwerPaperViewComponent;
  let fixture: ComponentFixture<ReviwerPaperViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviwerPaperViewComponent]
    });
    fixture = TestBed.createComponent(ReviwerPaperViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
