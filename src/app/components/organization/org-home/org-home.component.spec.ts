import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgHomeComponent } from './org-home.component';

describe('OrgHomeComponent', () => {
  let component: OrgHomeComponent;
  let fixture: ComponentFixture<OrgHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgHomeComponent]
    });
    fixture = TestBed.createComponent(OrgHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
