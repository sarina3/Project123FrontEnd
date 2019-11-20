import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PredictService } from '../../services/predict/predict.service';
import { SelectData } from 'src/app/components/select/select.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AckWebcamComponent } from '../../components/ack-webcam/ack-webcam.component';
import { WindowConfigService } from 'src/app/services/window-config.service';
import { ModelService } from 'src/app/services/model/model.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PredictComponent implements OnInit, OnDestroy {
  @ViewChild(AckWebcamComponent, {static: false}) camera: AckWebcamComponent;
  @ViewChild('filepicker', {static: false}) picker: ElementRef;
  form = new FormGroup({
    model: new FormControl(null, Validators.required),
    photo: new FormControl(null, Validators.required),
    photoDescription: new FormControl(false)
  });

  image;
  selectedOption: number;
  file;

  models = [];

  selected = 0;

  predictionResult: any;
  showResult = false;

  imageWidth: number = 64;
  imageHeight: number = 64;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  get canShowResult() {
    console.log('change emitted');
    return this.showResult;
  }

  constructor(
    private predictService: PredictService,
    private windowConfig: WindowConfigService,
    private modelService: ModelService
  ) {
  }

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
    const id = localStorage.getItem('choosedModel');
    this.modelService.getModels().subscribe(
      (data: any) => {
        console.log(data);
        this.models = data.models.map(
          x => {
            return {
              header: x.model_header,
              accuracy: x.model_header.Accuracy * 100,
              id: x.model_header.ModelId
            };
          }
        );
        if (id) {
            console.log(this.models);
            const index = this.models.findIndex( x => x.id === +id);
            this.select(index !== -1 ? index : 0);
        } else {
            this.select(0);
        }
      }
    );
  }

  onImageCreate(base64Image: any) {
    this.form.get('photo').setValue(base64Image);
    this.image = base64Image;
  }

  predict() {
    this.predictService.predict(this.form)
      .subscribe(response => {
          console.log(response);
          this.predictionResult = response;
          this.showResult = true;
        }
      );
  }

  onSelect(event: SelectData) {
    this.selectedOption = event.id;
  }

  takePhoto() {
    this.camera.getImage();
  }

  onFilePick(event) {
    const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result)
      this.image = reader.result;
      console.log(this.image);
      this.form.get('photo').setValue(this.image);

    };
    console.log(event);
    reader.readAsDataURL(event.target.files[0]);
  }

  select(index: number) {
    this.selected = index;
    this.form.get('model').setValue(this.models[index].id);
  }

  getResults() {
    return [
      'Classification class',
      'Classification result'
    ];
  }

  getMetadata() {
    return Object.keys(this.predictionResult.metadata);
  }

  openFilePicker() {
    const el: HTMLElement = this.picker.nativeElement;
    el.click();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.form.get('photo').setValue(this.croppedImage);
  }
}
