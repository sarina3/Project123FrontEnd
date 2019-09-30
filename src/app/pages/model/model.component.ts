import { Component, OnInit, Inject, Injectable } from '@angular/core';

import { ModelService } from '../../services/model/model.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectData } from 'src/app/components/select/select.model';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {
  model = {
    header: 'model1',
    accuracy: 76,
    trainPercentage: 84,
    testPercentage: 76,
    networkType: 'CNN',
    trainDatasetName: 'iHaVeNoIdEa__train_10000',
    testDatasetName: 'iHaVeNoIdEa__train_10000',
    numberOfLayers: 5,
    layers: 
    [
      {
        kernelSizeX: 5,
        kernelSizeY: 5,
        inputSizeY: 64,
        inputSizeX: 64,
        number:1,
      },
      {
        kernelSizeX: 5,
        kernelSizeY: 5,
        inputSizeY: 64,
        inputSizeX: 64,
        number:2,
      },
      {
        kernelSizeX: 5,
        kernelSizeY: 5,
        inputSizeY: 64,
        inputSizeX: 64,
        number:3,
      },
      {
        kernelSizeX: 5,
        kernelSizeY: 5,
        inputSizeY: 64,
        inputSizeX: 64,
        number:4,
      },
      {
        kernelSizeX: 5,
        kernelSizeY: 5,
        inputSizeY: 64,
        inputSizeX: 64,
        number:5,
      }
    ]
  };

  selectedLayerObj; 
  selectedLayer = -1;

  selectLayer(index){
    this.selectedLayer = index;
    this.selectedLayerObj = this.model.layers[index];
    console.log(this.selectedLayerObj);
  }

  getStyle(index){
    const width = 100 - ( index * (90 / this.model.numberOfLayers));
    const height = 100 - ( index * (90 / this.model.numberOfLayers));
    const blue = 150 - ( index * (100 / this.model.numberOfLayers));
    return {
      'position': 'absolute',
      'bottom': '0',
      'left': '0',
      'width': `${width}%`,
      'height': `${height}%`,
      'background-color': `rgba( ${blue}, ${blue}, ${blue}, .5 )`,
      'z-index':`${index+10}`
    }
  }

  getText(index){
    return `layer ${index +1}`;
  }

}
