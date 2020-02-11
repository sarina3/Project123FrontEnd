import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ModelService } from '../../services/model/model.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-training-session',
  templateUrl: './live-training-session.component.html',
  styleUrls: ['./live-training-session.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LiveTrainingSessionComponent implements OnInit, OnDestroy {
  @Input() modelId = null;
  @Output() sessionEnd = new EventEmitter<void>();
  sub: Subscription;
  socket: SocketIOClient.Socket;
  chartDataType = 'loss';
  title: string;
  chartData = null;
  columnNames = ['epoch', 'train', 'test'];
  options = {
    legend: {
      textStyle: {color: 'black'}
    },
    width: 0,
    height: 300,
    hAxis: {
      title: 'Epoch',
      titleTextStyle: {color: 'black'},
      gridlines: {
        color: 'black'
      },
      textStyle: {
        color: 'black'
      }
    },
    vAxis: {
      title: 'Loss',
      titleTextStyle: {color: 'black'},
      gridlines: {
        color: 'black'
      },
      textStyle: {
        color: 'black'
      }
    },
    pointSize: 5,
    tooltip: {
      color: 'black',
    },
    backgroundColor: {
      fill: "transparent"
    },
    titleTextStyle: {color: 'black'},
  };
  currentEpoch = 0;
  maxEpoch = 0.0;
  data = {};
  tabs = [];
  counter = 0;

  get selectedIndex() {
    const index = this.tabs.findIndex(x => x === this.chartDataType);
    return index >= 0 ? index : 0;
  }

  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this.socket = this.modelService.live();
    this.socket.on('connect', data => {
      console.log('connected');
    });
    this.socket.on(`live-${this.modelId}`, (data: {epoch: number, data: any, max_epoch: number}) => {
      for (let i in data.data) {
        if (i in this.data) {
          this.data[i].push(data.data[i]);
        } else {
          this.data[i] = [data.data[i]];
          if (!i.includes('val_')) {
            this.tabs.push(i);
          }
        }
      }
      this.currentEpoch = data.epoch + 1 ;
      this.maxEpoch = data.max_epoch;
      this.updateData();
      console.log(this.data);
      console.log(this.maxEpoch);
      console.log(this.currentEpoch);
    });
    this.socket.on( `live-${this.modelId}-end`, () => {
      console.log('connection closed');
      this.socket.close();
      this.sessionEnd.emit();
    });
  }

  updateData() {
    const loss = [];
    this.data[this.chartDataType].forEach((x, i) => {
        const lossTmp = [ i, +x, +this.data[`val_${this.chartDataType}`][i]];
        loss.push(lossTmp);
      }
    );
    this.chartData = loss;
  }

  ngOnDestroy(): void {
    this.socket.close();
  }


  getProgressValue() {
    return this.maxEpoch > 0 ? this.currentEpoch / this.maxEpoch * 100 : 0;
  }

  selectObservationData(index: number) {
    console.log('called');
    this.chartDataType = this.tabs[index];
    this.updateData();
  }

  capitalize(data: string) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

  onResize(event) {
    this.options.width = event.newWidth;
  }
}
