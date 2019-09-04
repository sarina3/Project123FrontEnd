import { Component, OnInit } from '@angular/core';
import { Architecture } from '../../model/architecture.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  models:Array<Architecture> = [];
  constructor() { }

  ngOnInit() {
  }
}
