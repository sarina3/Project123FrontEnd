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
  useCrossValidation = false;

  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit() {
  }

  useCrossValidationChange() {
    this.useCrossValidation = !this.useCrossValidation;
  }

  trainModel() {
    console.log(this.activationFunction);
    console.log(this.useCrossValidation);
    this.modelService.trainModel(this.activationFunction)
      .subscribe(response => console.log(response)
    );
  }
}
