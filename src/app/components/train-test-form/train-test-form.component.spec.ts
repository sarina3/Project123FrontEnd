import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainTestFormComponent } from './train-test-form.component';

describe('TrainTestFormComponent', () => {
  let component: TrainTestFormComponent;
  let fixture: ComponentFixture<TrainTestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainTestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
