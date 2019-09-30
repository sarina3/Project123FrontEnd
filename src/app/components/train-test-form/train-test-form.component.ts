import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-train-test-form',
  templateUrl: './train-test-form.component.html',
  styleUrls: ['./train-test-form.component.scss']
})
export class TrainTestFormComponent implements OnInit {
  @Input()
  title = "";
  @Input()
  modelPlaceholder = "";
  @Input()
  datasetPlaceholder = "";
  @Output()
  formSubmited = new EventEmitter<FormGroup>();

  form = new FormGroup({
    model: new FormControl(),
    dataset: new FormControl()
  });

  datasetFilter = [];
  modelFilter = [];

  constructor() { }

  ngOnInit() {
  }

  submitFrom(){
    this.formSubmited.emit(this.form);
  }

}
