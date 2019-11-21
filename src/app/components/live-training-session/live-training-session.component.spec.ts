import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTrainingSessionComponent } from './live-training-session.component';

describe('LiveTrainingSessionComponent', () => {
  let component: LiveTrainingSessionComponent;
  let fixture: ComponentFixture<LiveTrainingSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveTrainingSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTrainingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
