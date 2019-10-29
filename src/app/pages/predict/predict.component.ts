import { Component, OnInit, Inject, Injectable, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PredictService } from '../../services/predict/predict.service';
import { SelectData } from 'src/app/components/select/select.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AckWebcamComponent } from '../../components/ack-webcam/ack-webcam.component';
import { WindowConfigService } from 'src/app/services/window-config.service';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit, OnDestroy {
  @ViewChild(AckWebcamComponent, {static:false}) camera: AckWebcamComponent;
  form = new FormGroup({
    model: new FormControl(null,Validators.required),
    photo: new FormControl(null,Validators.required),
    photoDescription: new FormControl(false)
  })

  image ;
  selectedOption: number;
  file;

  models = [
    {header: 'Convolutional neural network'},
    {header: 'Multi layer perceptron'},
    {header: 'Genetic algorithm'},
    {header: 'Convolutional neural network'},
    {header: 'Multi layer perceptron'},
    {header: 'Genetic algorithm'},
    {header: 'Convolutional neural network'},
    {header: 'Multi layer perceptron'},
    {header: 'Genetic algorithm'},
    {header: 'Convolutional neural network'},
    {header: 'Multi layer perceptron'},
    {header: 'Genetic algorithm'}
  ];
  
  selected = 0;

  constructor(
    private predictService: PredictService,
    private windowConfig: WindowConfigService,
    private modelService: ModelService
  ) { }

  ngOnDestroy() {
    if (!this.windowConfig.isFullScreen) {
      this.windowConfig.resize();
    }
  }

  ngOnInit() {
    console.log(this.form.valid);
    if (!this.windowConfig.isFullScreen) {
      this.windowConfig.resize();
    }
    this.modelService.getModels().subscribe(
      (data: any) => {
        console.log(data);
        this.models = data.models.map(
          x => {
            return {
              header: x.model_header.Name,
              id: x.model_header.ModelId
            };
          }
        )
      }
    );
  }

  onImageCreate(base64Image: any) {
    this.form.get('photo').setValue(base64Image);
  }

  predict() {
    this.predictService.predict(this.form)
      .subscribe(response => console.log(response)
    );
  }

  onSelect(event: SelectData){
    this.selectedOption = event.id;
  }

  takePhoto(){
    this.camera.getImage();
  }

  onFilePick(event){
    const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result)
      this.image = reader.result
      console.log(this.image);
      this.form.get('photo').setValue(this.image);

    }
    console.log(event)
    reader.readAsDataURL(event.target.files[0])
  }

  select(index:number) {
    this.selected = index;
    this.form.get('model').setValue(this.models[index].id);
  }

  canShowResults() {
   return false;
  }
}
