import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModelService } from 'src/app/services/model/model.service';
import { ActivatedRoute } from '@angular/router';
import { WindowConfigService } from 'src/app/services/window-config.service';

@Component({
  selector: 'app-train-test-form',
  templateUrl: './train-test-form.component.html',
  styleUrls: ['./train-test-form.component.scss']
})
export class TrainTestFormComponent implements OnInit {
  @ViewChild('train', {static: true}) trainTemplate: TemplateRef<any>;
  @ViewChild('test', {static: true}) testTemplate: TemplateRef<any>;
  @ViewChild('errormessage', {static: true}) messageTemplate: TemplateRef<any>;
  @ViewChild('live', {static: true}) liveTemplate: TemplateRef<any>;
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
  live = false;

  datasetFilter = [];
  modelFilter = [];
  pageTrain = false;
  columnNames1 = ["epoch", "train", "test"];
  columnNames2 = ["epoch", "train", "test"];

  // https://developers.google.com/chart/interactive/docs/gallery/linechart
  // tu su vsetky atributy ktore zere options
  options = {
    legend: {
      textStyle: {color: 'white'}
    },
    hAxis: {
      title: 'Epoch',
      titleTextStyle: {color: 'white'},
      gridlines: {
        color: 'white'
      },
      textStyle: {
        color: 'white'
      }
    },
    vAxis: {
      title: 'Loss',
      titleTextStyle: {color: 'white'},
      gridlines: {
        color: 'white'
      },
      textStyle: {
        color: 'white'
      }
    },
    pointSize: 5,
    tooltip: {
      color: 'black',
    },
    backgroundColor: {
      fill: "#262755"
    },
    titleTextStyle: {color: 'white'},
  };
  showCharts = false;
  chartData1 = null;
  chartData2 = null;
  photos = [];
  allPhotosRoutes = [];
  errorMessage: string;

  get template() {
    if (this.live) {
      return this.liveTemplate;
    } else if (this.errorMessage != null) {
      return this.messageTemplate;
    } else if (this.pageTrain) {
      return this.trainTemplate;
    } else {
      return this.testTemplate;
    }
  }

  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute,
    private window: WindowConfigService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.route.snapshot.url[0].path.includes('train')) {
      this.pageTrain = true;
    }
    this.modelService.getModels().subscribe(
      (data: any) => {
        this.models = data.models.map(
          x => {
            return {
              header: x.model_header,
              accuracy: x.model_header.Accuracy * 100,
              id: x.model_header.ModelId,
              type: x.model_header.ModelType
            };
          }
        );
        const id = localStorage.getItem('choosedModel');
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
    this.live = false;
    this.selected = index;
    this.errorMessage = null;
    this.form.get('modelId').setValue(this.models[index].id);
    if (this.pageTrain) {
      this.modelService.getTrainData(this.form).subscribe(
        (data: any) => {
          console.log(data);
          if (data.message) {
            this.errorMessage = data.message;
            return;
          }
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
          if (data.message) {
            this.errorMessage = data.message;
            return;
          }
          this.testDataToShow = data;
          this.allPhotosRoutes = data.testing_session.tested_results;
          this.photos = this.allPhotosRoutes.slice(0, 2);
          this.showCharts = true;
        }
      );
    }
  }

  trainModel() {
    if (this.pageTrain) {
      console.log(this.form.value);
      this.modelService.trainModel(this.form).subscribe(
        data => {
          this.live = true;
          console.log(this.getModelId());
        }
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

  openLiveTraining() {
    console.log('live', this.live);
    this.live = true;
    console.log('live1', this.live);
    this.cd.detectChanges();
  }

  getModelId() {
    return '' + this.models[this.selected].id;
    // return '5';
  }

  onSessionEnd() {
    this.select(this.selected);
  }
}
