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
  models = [];

  @Input()
  dataToShow = "";
  
  @Output()
  formSubmited = new EventEmitter<FormGroup>();

  selected = -1;

  form = new FormGroup({
    modelId: new FormControl(null)
  });

  datasetFilter = [];
  modelFilter = [];

  constructor() { }

  ngOnInit() {
  }

  submitFrom(){
    this.formSubmited.emit(this.form);
  }

  select(index:number){
    this.selected = index;
    this.form.get('modelId').setValue(this.models[index].id);
    this.submitFrom();

  }

}
