import { Component, OnInit } from '@angular/core';
import { Architecture, LayerInfo } from '../../model/architecture.model';
import { ModelService } from 'src/app/services/model/model.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  selected = -1;
  selectedObj:Architecture;
  selectedLayerObj: LayerInfo;
  selectedLayer: -1;
  models:Array<Architecture> = [
    {
      header: 'model1',
      id: 1,
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
    },
    {
      header: 'model1',
      id: 2,
      accuracy: 76,
      trainPercentage: 84,
      testPercentage: 76,
      networkType: 'CNN',
      trainDatasetName: 'iHaVeNoIdEa__train_10000',
      testDatasetName: 'iHaVeNoIdEa__train_10000',
      numberOfLayers: 5,
      layers: [
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 68,
          inputSizeX: 68,
          number:1,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 68,
          inputSizeX: 68,
          number:2,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 68,
          inputSizeX: 68,
          number:3,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 68,
          inputSizeX: 68,
          number:4,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 68,
          inputSizeX: 68,
          number:5,
        }
      ]
    },
  ];
  constructor(private modelServ: ModelService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.modelServ.getModels().subscribe((data: any) => {
      console.log(data);
      this.models = data.models.map(x => {
        return {
          header: x.model_header.Name,
          id: x.model_header.ModelId,
          accuracy: +x.model_header.Accuracy*100,
          layers: []};
        }
     );
    });
  }

  select(index){
    this.selected = index;
    this.selectedObj = this.models[index];
    this.selectedLayer = -1;
  }

  selectLayer(index){
    this.selectedLayer = index;
    this.selectedLayerObj = this.selectedObj.layers[index];
    console.log(this.selectedLayerObj);
  }

  getStyle(index){
    const width = 100 - ( index * (90 / this.selectedObj.numberOfLayers));
    const height = 100 - ( index * (90 / this.selectedObj.numberOfLayers));
    const blue = 150 - ( index * (100 / this.selectedObj.numberOfLayers));
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


  loggedUser(){
    return this.auth.isLoggedIn();
  }

  goToPage(route: string) {
    localStorage.setItem('choosedModel', '' + this.selectedObj.id);
    this.router.navigate([route]);
  }
}
