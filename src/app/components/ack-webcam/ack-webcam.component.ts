import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';

import { WebCamComponent } from 'ack-angular-webcam';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-ack-webcam',
  templateUrl: './ack-webcam.component.html',
  styleUrls: ['./ack-webcam.component.scss']
})
export class AckWebcamComponent implements OnInit {

  @Input() imageWidth: number = 64;
  @Input() imageHeight: number = 64;
  croppedImage: any = '';

  @ViewChild(WebCamComponent,{static:false}) webcam: WebCamComponent;
  options = null;
  image: string = null;

  @Output() imageDone = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  getImage() {
    this.webcam.getBase64()
    .then(image => {
      this.image = image;
      this.emitParent(this.image);
    })
    .catch(e => console.error(e));
  }

  emitParent(base64Image: string) {
    this.imageDone.emit({
      image: this.image
    });
  }

  onCamError(err: any) {
    console.log(err);
  }

  onCamSuccess(event: any) {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.emitParent(this.croppedImage);
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

  repeat() {
    this.image = null;
    this.croppedImage = null;
  }
}
