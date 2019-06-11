import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckWebcamComponent } from './ack-webcam.component';

describe('AckWebcamComponent', () => {
  let component: AckWebcamComponent;
  let fixture: ComponentFixture<AckWebcamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckWebcamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckWebcamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
