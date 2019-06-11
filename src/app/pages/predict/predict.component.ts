import { Component, OnInit, Inject, Injectable } from '@angular/core';

import { PredictService } from '../../services/predict/predict.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})
export class PredictComponent implements OnInit {

  image: string;

  constructor(
    private _predictService: PredictService
  ) { }

  ngOnInit() {
  }

  onImageCreate(base64Image: any) {
    this.image = base64Image.image;
  }

  predict() {
    this._predictService.predict(this.image)
      .subscribe(response => console.log(response)
    );
  }
}
