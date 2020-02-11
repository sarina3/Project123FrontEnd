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
  @ViewChild('train', { static: true }) trainTemplate: TemplateRef<any>;
  @ViewChild('test', { static: true }) testTemplate: TemplateRef<any>;
  @ViewChild('errormessage', { static: true }) messageTemplate: TemplateRef<any>;
  @ViewChild('live', { static: true }) liveTemplate: TemplateRef<any>;
  @Input()
  title = "";

  @Input()
  models = [];

  dataToShow: { dataset_info: any, train_history: any, model_info: any };
  testDataToShow: { testing_session: any };
  data: any = null;

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

  // grafy
  selectedGraf = '1';
  columnNames1 = ["epoch", "train"];
  columnNames2 = ["epoch", "test"];

  // https://developers.google.com/chart/interactive/docs/gallery/linechart
  // tu su vsetky atributy ktore zere options
  options = {
    legend: {
      textStyle: { color: 'black' }
    },
    width: 0,
    height: 300,
    hAxis: {
      title: 'Epoch',
      titleTextStyle: { color: 'black' },
      gridlines: {
        color: 'black'
      },
      textStyle: {
        color: 'black'
      }
    },
    vAxis: {
      title: 'Accuracy',
      titleTextStyle: { color: 'black' },
      gridlines: {
        color: 'black'
      },
      textStyle: {
        color: 'black'
      },
      viewWindow: {
        min: 0,
        max: 1
      }
    },
    pointSize: 5,
    tooltip: {
      color: 'black',
    },
    backgroundColor: {
      fill: "transparent"
    },
    titleTextStyle: { color: 'black' },
  };

  showCharts = true;
  chartData1 = null;
  chartData2 = null;
  chartData3 = null;
  chartData4 = null;

  chartData5 = null;
  chartData6 = null;
  chartData7 = null;
  chartData8 = null;
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
      this.selectedGraf = '1';
    } else {
      this.selectedGraf = '5';
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
          if (data.message) {
            this.errorMessage = data.message;
            return;
          }
          this.dataToShow = data;
          this.data = data;
          console.log(data)
          const acc = [];
          this.dataToShow.train_history.accuracy.forEach((x, i) => {
            const accTmp = [i, x];
            acc.push(accTmp);
          }
          );
          const valAcc = [];
          this.dataToShow.train_history.val_accuracy.forEach((x, i) => {
            const valAccTemp = [i, x];
            valAcc.push(valAccTemp);
          }
          );
          const loss = [];
          this.dataToShow.train_history.loss.forEach((x, i) => {
            const lossTmp = [i, x];
            loss.push(lossTmp);
          }
          );
          const valLoss = [];
          this.dataToShow.train_history.val_loss.forEach((x, i) => {
            const valLossTmp = [i, x];
            valLoss.push(valLossTmp);
          }
          );
          this.chartData1 = acc;
          this.chartData2 = valAcc;
          this.chartData3 = loss;
          this.chartData4 = valLoss;
          this.updateChartOptions({ value: this.selectedGraf });
          this.showCharts = true;
        }
      );
    } else {
      this.modelService.getTestData(this.form).subscribe(
        (data: any) => {
          if (data.message) {
            this.errorMessage = data.message;
            return;
          }
          this.data = data;
          console.log(data)
          const senzASpec = [];
          const negatives = [];
          const positives = [];
          const accuracyTest = [];
          // convert string to number
          const senzitivitaNumber = +data.testing_session.model_header.testing.Senzitivity * 100;
          const specificitaNumber = +data.testing_session.model_header.testing.Specificity * 100;
          senzASpec.push(['Senzitivity', senzitivitaNumber]);
          senzASpec.push(['Specificity', specificitaNumber]);

          const trueNegatives = +data.testing_session.model_header.testing.TrueNegatives * 100;
          const falseNegatives = 100 - trueNegatives;
          negatives.push(['True negatives', trueNegatives]);
          negatives.push(['False negatives', falseNegatives]);

          const truePositives = +data.testing_session.model_header.testing.FalsePositives * 100;
          const falsePositives = 100 - truePositives;
          positives.push(['True positives', truePositives]);
          positives.push(['False positives', falsePositives]);

          this.testDataToShow = data;
          this.allPhotosRoutes = data.testing_session.tested_results;
          this.photos = this.allPhotosRoutes.slice(0, 2);

          const accuracyTestTmp = +data.testing_session.model_header.testing.Accuracy * 100;
          accuracyTest.push(['Accuracy', accuracyTestTmp]);

          this.chartData5 = senzASpec;
          this.chartData6 = negatives;
          this.chartData7 = positives;
          this.chartData8 = accuracyTest;
          this.updateChartOptions({ value: this.selectedGraf });
          this.showCharts = true;
        }
      );
    }
  }

  trainModel() {
    if (this.pageTrain) {
      // console.log(this.form.value);
      this.modelService.trainModel(this.form).subscribe(
        data => {
          this.live = true;
          // console.log(this.getModelId());
        }
      );
    } else {
      this.modelService.testModel(this.form).subscribe(
        data => {
          // console.log('test successfull');
        }
      );
    }
  }

  updateChartOptions(option: any) { // zmeni nazov x-ovej suradnice
    switch (option.value) {
      case "1":
        // zisti maximum z hodnot aby som mohol upravit velkost x-ovej osi
        this.options.vAxis.viewWindow.max = this.getMaximumFromChart(this.chartData1);
        this.options.vAxis.title = 'Accuracy';
        break;
      case "2":
        // zisti maximum z hodnot aby som mohol upravit velkost x-ovej osi
        this.options.vAxis.viewWindow.max = this.getMaximumFromChart(this.chartData2);
        this.options.vAxis.title = 'Accuracy';
        break;
      case "3":
        // zisti maximum z hodnot aby som mohol upravit velkost x-ovej osi
        this.options.vAxis.viewWindow.max = this.getMaximumFromChart(this.chartData3);
        this.options.vAxis.title = 'Loss';
        break;
      case "4":
        // console.log(option.value)
        // zisti maximum z hodnot aby som mohol upravit velkost x-ovej osi
        this.options.vAxis.viewWindow.max = this.getMaximumFromChart(this.chartData4);
        this.options.vAxis.title = 'Loss';
        break;
      case "5":
        // zisti maximum z hodnot aby som mohol upravit velkost x-ovej osi
        this.options.vAxis.viewWindow.max = 100;
        this.options.vAxis.title = '%';
        this.options.hAxis.title = '';
        break;
      case "6":
        // zisti maximum z hodnot aby som mohol upravit velkost x-ovej osi
        this.options.vAxis.viewWindow.max = 100;
        this.options.vAxis.title = '%';
        this.options.hAxis.title = '';
        break;
      case "7":
        // zisti maximum z hodnot aby som mohol upravit velkost x-ovej osi
        this.options.vAxis.viewWindow.max = 100;
        this.options.vAxis.title = '%';
        this.options.hAxis.title = '';
        break;
      case "7":
        // zisti maximum z hodnot aby som mohol upravit velkost x-ovej osi
        this.options.vAxis.viewWindow.max = 100;
        this.options.vAxis.title = '%';
        this.options.hAxis.title = '';
        break;
    }
  }

  getMaximumFromChart(chart: any): any {
    let max = 0;
    for (const ch of chart) {
      if (ch[1] > max) {
        max = chart[1];
      }
    }
    max = Math.ceil(max);
  }

  onResize(event) {
    this.options.width = event.newWidth;
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
