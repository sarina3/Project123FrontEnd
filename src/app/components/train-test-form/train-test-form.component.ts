import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModelService } from 'src/app/services/model/model.service';
import { ActivatedRoute } from '@angular/router';
import { WindowConfigService } from 'src/app/services/window-config.service';

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

  constructor(private modelService: ModelService, private route:ActivatedRoute, private window: WindowConfigService) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path.includes('train')) {
      this.pageTrain = true;
    }
    const id = localStorage.getItem('choosedModel');
    this.modelService.getModels().subscribe(
      (data: any) => {
        this.models = data.models.map(
          x => {
            return {
              header: x.model_header.Name,
              id: x.model_header.ModelId,
              type: x.model_header.ModelType
            };
          }
        );
        if (id) {
          const index = this.models.find( x => x.id === +id);
          this.select(index !== -1 ? index : 0);
        } else {
          this.select(0);
        }
      }
    );
    if(!this.window.isFullScreen){
      this.window.resize();
    }
  }

  submitFrom(){
    this.formSubmited.emit(this.form);
  }

  select(index:number){
    this.selected = index;
    this.form.get('modelId').setValue(this.models[index].id);
    if (this.pageTrain) {
      this.modelService.getTrainData(this.form).subscribe(
        (data: any) => {
          console.log(data);
          this.dataToShow = data;
        }
      );
    } else {
      this.modelService.getTestData(this.form).subscribe(
        (data: any) => {
          console.log(data);
          this.dataToShow = data;
        }
      );
    }
  }

  trainModel() {
    if (this.pageTrain) {
      console.log(this.form.value)
      this.modelService.trainModel(this.form).subscribe(
        data => {console.log('train successfull')}
      );
    } else {
      this.modelService.testModel(this.form).subscribe(
        data => {console.log('test successfull')}
      );
    }
  }

  getData() {
    return this.dataToShow ? [...this.dataToShow['accuracy'], ...this.dataToShow['val_accuracy']] : [];
  }
}
