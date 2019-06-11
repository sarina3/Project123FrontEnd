import { Component, OnInit, Inject, Injectable } from '@angular/core';

import { ModelService } from '../../services/model/model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  activationFunction = 1;
  activationFunctions = [
    {
      id: 1,
      name: 'Sigmoid'
    },
    {
      id: 2,
      name: 'Tanh'
    },
    {
      id: 3,
      name: 'Relu'
    }
  ];

  constructor(
    private _modelService: ModelService
  ) { }

  ngOnInit() {
  }

  activationFunctionChange(event: any) {
    this.activationFunction = event + 1;
  }

  trainModel() {
    this._modelService.trainModel(this.activationFunction)
      .subscribe(response => console.log(response)
    );
  }
}
