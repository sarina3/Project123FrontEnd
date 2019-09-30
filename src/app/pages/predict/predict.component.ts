import { Component, OnInit, Inject, Injectable, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PredictService } from '../../services/predict/predict.service';
import { SelectData } from 'src/app/components/select/select.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AckWebcamComponent } from '../../components/ack-webcam/ack-webcam.component';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit {
  @ViewChild(AckWebcamComponent, {static:false}) camera: AckWebcamComponent;
  form = new FormGroup({
    photo: new FormControl(null,Validators.required)
  })

  image ;
  selectedOption: number;
  file;

  constructor(
    private predictService: PredictService,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log(this.form.valid)
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
}
