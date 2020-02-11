import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
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
  predictForm = new FormGroup({
    model: new FormControl(null, Validators.required),
    photo: new FormControl(null, Validators.required),
    photoDescription: new FormControl('')
  });

  image: any = null;
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

  step = 0;
  selectedModel = null;

  get canShowResult() {
    // console.log('change emitted');
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
    if (!this.windowConfig.isFullScreen) {
      this.windowConfig.resize();
    }
    const id = localStorage.getItem('choosedModel');
    this.modelService.getModels().subscribe(
      (data: any) => {
        this.models = data.models.map(
          x => {
            return {
              header: x.model_header,
              accuracy: x.model_header.Accuracy * 100,
              id: x.model_header.ModelId,
              type: x.model_header.ModelType
            };
          }
        );
        if (this.models && this.models.length > 0) {
            const index = this.models.findIndex(x => x.id === +id);
            this.select(index !== -1 ? index : 0);
        } /* else {
            this.select(0);
        } */
      }
    );
  }

  onImageCreate(base64Image: any) {
    this.image = base64Image.image;
    this.predictForm.get('photo').setValue(base64Image.image);
  }

  predict() {
    this.predictService.predict(this.predictForm)
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

  uploadPhoto() {
    document.getElementById('photo').click();
  }

  onFilePick(event: any) {

    /* const reader = new FileReader();
    reader.onload = () => {
      // console.log(reader.result)
      this.image = reader.result;
      this.predictForm.get('photo').setValue(this.image);
    };
    reader.readAsDataURL(event.target.files[0]); */

    if (event.target.files && event.target.files[0]) {
      let image = null;
      const file: File = event.target.files[0];
      const reader: FileReader = new FileReader();

      reader.onloadend = (e) => {
        image = reader.result as string;
        this.image = image;
        this.predictForm.get('photo').setValue(image);

        if (event.srcElement && event.srcElement.value) {
          this.predictForm.get('photoDescription').setValue(event.srcElement.value);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  repeat() {
    this.image = null;
    this.croppedImage = null;
    this.predictForm.get('photo').setValue(null);
    this.camera.repeat();
  }

  select(index: number) {
    this.selected = index;
    this.predictForm.get('model').setValue(this.models[index].id);
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
    this.predictForm.get('photo').setValue(this.croppedImage);
  }

  selectModel(model: any) {
    this.selectedModel = model;
  }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  getModelIcon(modelType: string) {
    switch (modelType.toLowerCase()) {
      case 'cnn': {
        return 'build';
      }
      case 'mlp': {
        return 'photo';
      }
      default: {
        return 'build';
      }
    }
  }

  getImage() {
    return this.predictForm.get('photo').value;
  }

  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
