import { Component, OnInit, Inject, Injectable, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PredictService } from '../../services/predict/predict.service';
import { SelectData } from 'src/app/components/select/select.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AckWebcamComponent } from '../../components/ack-webcam/ack-webcam.component';
import { WindowConfigService } from 'src/app/services/window-config.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit, OnDestroy {
  @ViewChild(AckWebcamComponent, {static:false}) camera: AckWebcamComponent;
  form = new FormGroup({
    photo: new FormControl(null,Validators.required)
  })

  image ;
  selectedOption: number;
  file;

  models = [
    {header: 'Convolutional neural network'},
    {header: 'Multi layer perceptron'},
    {header: 'Genetic algorithm'}
  ];
  
  selected = 0;

  constructor(
    private predictService: PredictService,
    private windowConfig: WindowConfigService
  ) { }

  ngOnDestroy() {
    if (!this.windowConfig.isFullScreen) {
      this.windowConfig.resize();
    }
  }

  ngOnInit() {
    console.log(this.form.valid)
    if (!this.windowConfig.isFullScreen) {
      this.windowConfig.resize();
    }
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
  }
}
