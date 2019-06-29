import { Component, OnInit, Inject, Injectable } from '@angular/core';

import { ModelService } from '../../services/model/model.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectData } from 'src/app/components/select/select.model';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  activationFunctions = [
    {
      id: 1,
      title: 'Sigmoid'
    },
    {
      id: 2,
      title: 'Tanh'
    },
    {
      id: 3,
      title: 'Relu'
    }
  ];

  trainingForm = new FormGroup({
    activationFunction : new FormControl(1),
    useCrossValidation : new FormControl(false),
    useDataset: new FormControl(),
    useModel: new FormControl()
  });

  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit() {
  }

  onModelPick(model:SelectData){
    this.trainingForm.get('useModel').setValue(model.title);
  }
  onDatasetPick(dataset:SelectData){
    this.trainingForm.get('useDataset').setValue(dataset.title);
  }
  onActivationFunctionPick(activationFunction: SelectData){
    this.trainingForm.get('activationFunction').setValue(activationFunction.title);
  }

  trainModel() {
    this.modelService.trainModel(this.trainingForm).subscribe(
      (response) => console.log(response)
    );
  }
}
