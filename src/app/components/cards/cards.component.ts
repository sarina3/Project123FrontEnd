import { Component, OnInit, Inject } from '@angular/core';
import { Architecture, LayerInfo } from '../../model/architecture.model';
import { ModelService } from 'src/app/services/model/model.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Node {
  x: number;
  y: number;
  r: number;
  layer: number;
}
export interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
export interface Text {
  x: number;
  y: number;
  text: string;
  layer: number;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  selected = -1;
  selectedObj: any;
  selectedLayerObj: any;
  selectedLayer: -1;
  modelData = [];
  models: Array<Architecture> = [
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
          number: 1,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 64,
          inputSizeX: 64,
          number: 2,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 64,
          inputSizeX: 64,
          number: 3,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 64,
          inputSizeX: 64,
          number: 4,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 64,
          inputSizeX: 64,
          number: 5,
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
          number: 1,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 68,
          inputSizeX: 68,
          number: 2,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 68,
          inputSizeX: 68,
          number: 3,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 68,
          inputSizeX: 68,
          number: 4,
        },
        {
          kernelSizeX: 5,
          kernelSizeY: 5,
          inputSizeY: 68,
          inputSizeX: 68,
          number: 5,
        }
      ]
    },
  ];

  width: number;
  height: number;
  nodes: Node[] = [];
  lines: Line[] = [];
  texts: Text[] = [];
  detail: any[] = [];

  isMobile = false;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private modelServ: ModelService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.modelServ.getModels().subscribe((data: any) => {
      console.log(data);
      this.modelData = data.models;
      this.models = data.models.map(x => {
        return {
          header: x.model_header,
          id: x.model_header.ModelId,
          accuracy: +x.model_header.Accuracy * 100,
          layers: []};
        }
     );
    });
  }

  select(index) {
    this.selected = index;
    this.selectedObj = this.modelData[index];
    console.log(this.selectedObj);
    const id = this.models[index].id;
    localStorage.setItem('choosedModel', `${id}`);
    this.selectedLayer = -1;
    this.createNetwork();
    this.detail = [];
  }

  selectLayer(index) {
    this.selectedLayer = index;
    this.selectedLayerObj = this.selectedObj.layers.layers[index];
    console.log(this.selectedLayerObj);
  }

  getStyle(index) {
    const width = 100 - ( index * (90 / this.selectedObj.layers.layers.length));
    const height = 100 - ( index * (90 / this.selectedObj.layers.layers.length));
    const blue = 150 - ( index * (100 / this.selectedObj.layers.layers.length));
    return {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: `${width}%`,
      height: `${height}%`,
      'background-color': `rgba( ${blue}, ${blue}, ${blue}, .5 )`,
      'z-index': `${index + 10}`
    };
  }

  getText(index) {
    return `layer ${index + 1}`;
  }


  loggedUser() {
    return this.auth.isLoggedIn();
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }

  getKernelSize() {
    if (this.selectedLayerObj.KERNEL_SIZE) {
      return this.selectedLayerObj.KERNEL_SIZE.split(',');
    } else {
      return '';
    }
  }

  layerDetail(index: number) {
    this.detail  = [];
    if (index >= 0) {
      for (const k in this.selectedObj.layers.layers[index]) {
        if (k) {
          this.detail.push({ key: k, value: this.selectedObj.layers.layers[index][k] });
        }
      }
    } else {
      this.detail.push(
        { key: 'Loss', value: this.selectedObj.layers.loss },
        { key: 'Metrics', value: this.selectedObj.layers.metrics },
        { key: 'Model name', value: this.selectedObj.layers.modelName },
        { key: 'Optimizer', value: this.selectedObj.layers.optimizer },
        { key: 'Type', value: this.selectedObj.layers.type }
      );
    }
    this.dialog.open(LayerDetailComponent, {
      data: {
        attributes: this.detail
      }
    });
  }

  createNetwork() {

    this.width = (this.selectedObj.layers.layers.length + 2) * 75 + 20;
    this.height = 200;

    this.nodes = [];
    this.nodes.push({ x: 40, y: 100, r: 20, layer: -1 });
    for (let i = 0; i < this.selectedObj.layers.layers.length; i++) {
      for (let j = 1; j < 4; j ++) {
        this.nodes.push({
          x: (i + 1) * 75 + 40,
          y: j * 50,
          r: 20,
          layer: i
        });
      }
    }
    this.nodes.push({
      x: (this.selectedObj.layers.layers.length + 1) * 75 + 40,
      y: 100,
      r: 20,
      layer: -1
    });

    this.lines = [];
    for (let i = 1; i < 4; i++) {
      this.lines.push({
        x1: 40 + 20,
        y1: 100,
        x2: 75 + 20,
        y2: i * 50
      });
    }
    for (let i = 0; i < this.selectedObj.layers.layers.length - 1; i++) {
      for (let j = 1; j < 4; j++) {
        for (let k = 1; k < 4; k++) {
          this.lines.push({
            x1: (i + 1) * 75 + 40 + 20,
            y1: k * 50,
            x2: (i + 1) * 75 + 2 * 40 + 15,
            y2: j * 50
          });
        }
      }
    }
    for (let i = 1; i < 4; i++) {
      this.lines.push({
        x1: (this.selectedObj.layers.layers.length + 1) * 75 - 15,
        y1: i * 50,
        x2: (this.selectedObj.layers.layers.length + 1) * 75 + 20,
        y2: 100
      });
    }

    this.texts = [];
    this.texts.push({ x: 40, y: 100, text: 'first', layer: -1 });
    for (let i = 0; i < this.selectedObj.layers.layers.length; i++) {
      for (let j = 1; j < 4; j ++) {
        this.texts.push({
          x: (i + 1) * 75 + 40,
          y: j * 50,
          text: '' + (i + 1),
          layer: i
        });
      }
    }
    this.texts.push({
      x: (this.selectedObj.layers.layers.length + 1) * 75 + 40,
      y: 100,
      text: 'last',
      layer: -1
    });
  }
}

@Component({
  selector: 'app-layer-detail-dialog',
  templateUrl: 'layer-detail-dialog.html',
})
export class LayerDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<LayerDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
