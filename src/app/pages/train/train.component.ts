import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModelService } from 'src/app/services/model/model.service';
import { WindowConfigService } from 'src/app/services/window-config.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent implements OnInit{
  models = [];

  constructor(private modelService: ModelService, private windowConfig: WindowConfigService) {}

  ngOnInit() {
    if (!this.windowConfig.isFullScreen) {
      this.windowConfig.resize();
    }
    this.modelService.getModels().subscribe(
      (data: any) => {
        this.models = data.models.map(
          x => {
            return {
              header: x.model_header.Name,
              id: x.model_header.ModelId
            };
          }
        );
      }
    );
  }

  getTrainData(form: FormGroup) {
    console.log(form);
    this.modelService.getTrainData(form).subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
