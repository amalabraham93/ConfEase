import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfSidebarConfigComponent } from './conf-sidebar-config.component';

describe('ConfSidebarConfigComponent', () => {
  let component: ConfSidebarConfigComponent;
  let fixture: ComponentFixture<ConfSidebarConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfSidebarConfigComponent]
    });
    fixture = TestBed.createComponent(ConfSidebarConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
