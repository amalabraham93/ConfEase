import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConferenceComponent } from './my-conference.component';

describe('MyConferenceComponent', () => {
  let component: MyConferenceComponent;
  let fixture: ComponentFixture<MyConferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyConferenceComponent]
    });
    fixture = TestBed.createComponent(MyConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
