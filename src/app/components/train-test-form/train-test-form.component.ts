import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModelService } from 'src/app/services/model/model.service';
import { ActivatedRoute } from '@angular/router';

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

  dataToShow = "";
  
  @Output()
  formSubmited = new EventEmitter<FormGroup>();

  selected = -1;

  form = new FormGroup({
    modelId: new FormControl(null)
  });

  datasetFilter = [];
  modelFilter = [];
  pageTrain = false;

  constructor(private modelService: ModelService, private route:ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path.includes('train')) {
      this.pageTrain = true;
    }
  }

  submitFrom(){
    this.formSubmited.emit(this.form);
  }

  select(index:number){
    this.selected = index;
    this.form.get('modelId').setValue(this.models[index].id);
    this.modelService.getTrainData(this.form).subscribe(
      (data: any) => {
        this.dataToShow = data;
      }
    );
  }

  trainModel() {
    this.modelService.trainModel(this.form).subscribe(
      data => {console.log('train successfull')}
    )
  }

}
