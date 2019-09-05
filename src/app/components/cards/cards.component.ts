import { Component, OnInit } from '@angular/core';
import { Architecture } from '../../model/architecture.model';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  selected = -1;
  selectedObj:Architecture;
  models:Array<Architecture> = [
    {
      header: 'model1',
      accuracy: 76,
      inputSizeX: 64,
      inputSizeY: 64
    },
    {
      header: 'model3',
      accuracy: 78,
      inputSizeX: 64,
      inputSizeY: 64,
    },
    {
      header: 'mode',
      accuracy: 50,
      inputSizeX: 64,
      inputSizeY: 64
    },
    {
      header: 'model2',
      accuracy: 44,
      inputSizeX: 64,
      inputSizeY: 64
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  select(index){
    this.selected = index;
    this.selectedObj = this.models[index];
  }
}
