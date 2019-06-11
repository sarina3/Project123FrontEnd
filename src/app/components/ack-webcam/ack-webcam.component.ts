import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { WebCamComponent } from 'ack-angular-webcam';

@Component({
  selector: 'app-ack-webcam',
  templateUrl: './ack-webcam.component.html',
  styleUrls: ['./ack-webcam.component.scss']
})
export class AckWebcamComponent implements OnInit {

  webcam: WebCamComponent;
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

  uploadImage(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      const thisClass = this;
      reader.onloadend = function (e) {
        thisClass.image = reader.result as string;
        thisClass.emitParent(thisClass.image.split(',')[1]);
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
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
}
