import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModelService } from 'src/app/services/model/model.service';
import { ActivatedRoute } from '@angular/router';
import { WindowConfigService } from 'src/app/services/window-config.service';
import { GoogleChartComponent } from 'angular-google-charts';

@Component({
  selector: 'app-train-test-form',
  templateUrl: './train-test-form.component.html',
  styleUrls: ['./train-test-form.component.scss']
})
export class TrainTestFormComponent implements OnInit {
  @Input()
  title = "";

  @Input()
  models = [];

  dataToShow: {dataset_info: any, train_history: any, model_info: any};
  testDataToShow: {testing_session: any};

  @Output()
  formSubmited = new EventEmitter<FormGroup>();

  selected = -1;

  form = new FormGroup({
    modelId: new FormControl(null)
  });

  datasetFilter = [];
  modelFilter = [];
  pageTrain = false;
  columnNames1 = ["epoch", "train", "test"];
  columnNames2 = ["epoch", "train", "test"];
  options1 = {
    hAxis: {
      title: 'Epoch'
    },
    vAxis: {
      title: 'Accuracy'
    },
    pointSize: 5
  };
  options2 = {
    hAxis: {
      title: 'Epoch'
    },
    vAxis: {
      title: 'Loss'
    },
    pointSize: 5
  };
  showCharts = false;
  chartData1 = null;
  chartData2 = null;


  constructor(private modelService: ModelService, private route: ActivatedRoute, private window: WindowConfigService) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path.includes('train')) {
      this.pageTrain = true;
    }
    const id = localStorage.getItem('choosedModel');
    this.modelService.getModels().subscribe(
      (data: any) => {
        this.models = data.models.map(
          x => {
            return {
              header: x.model_header.Name,
              id: x.model_header.ModelId,
              type: x.model_header.ModelType
            };
          }
        );
        if (id) {
          console.log(this.models);
          const index = this.models.findIndex( x => x.id === +id);
          this.select(index !== -1 ? index : 0);
        } else {
          this.select(0);
        }
      }
    );
    if (!this.window.isFullScreen) {
      this.window.resize();
    }
  }

  submitFrom() {
    this.formSubmited.emit(this.form);
  }

  select(index: number) {
    this.selected = index;
    this.form.get('modelId').setValue(this.models[index].id);
    if (this.pageTrain) {
      this.modelService.getTrainData(this.form).subscribe(
        (data: any) => {
          console.log(data);
          this.dataToShow = data;
          const acc = [];
          this.dataToShow.train_history.accuracy.forEach((x, i) => {
              const accTmp = [ i, x, this.dataToShow.train_history.val_accuracy[i]];
              acc.push(accTmp);
            }
          );
          const loss = [];
          this.dataToShow.train_history.loss.forEach((x, i) => {
              const lossTmp = [ i, x, this.dataToShow.train_history.val_loss[i]];
              loss.push(lossTmp);
            }
          );
          this.chartData1 = acc;
          this.chartData2 = loss;
          this.showCharts = true;
        }
      );
    } else {
      this.modelService.getTestData(this.form).subscribe(
        (data: any) => {
          console.log(data);
          this.testDataToShow = data;
          this.showCharts = true;
        }
      );
    }
  }

  trainModel() {
    if (this.pageTrain) {
      console.log(this.form.value);
      this.modelService.trainModel(this.form).subscribe(
        data => {console.log('train successfull'); }
      );
    } else {
      this.modelService.testModel(this.form).subscribe(
        data => {console.log('test successfull'); }
      );
    }
  }

  getKeys(of: string) {
    return Object.keys(this.dataToShow.model_info[of]);
  }

  getTestKeys(of: string, model: boolean) {
    if (model) {
      return Object.keys(this.testDataToShow.testing_session.model_header[of]);
    }
    return Object.keys(this.testDataToShow.testing_session[of]);
  }
}
