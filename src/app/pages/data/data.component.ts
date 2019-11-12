import { Component, OnInit } from '@angular/core';

import { Image } from '../../model/image';
import { IMAGES } from '../../constants/images';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  image: Image = null;
  images = IMAGES;

  constructor() { }

  ngOnInit() {}

  showDetail(image: any) {
    const keys = [];
    for (const key in image) {
      if (image) {
        keys.push({ key, value: image[key] });
      }
    }
    this.image = new Image(
      keys[0].value,
      keys[1].value,
      keys[2].value,
      keys[3].value,
      keys[4].value,
      keys[5].value,
      keys[6].value,
      keys[7].value,
      keys[8].value,
      keys[9].value,
      keys[10].value,
      keys[11].value,
      keys[12].value,
      keys[13].value,
      keys[14].value,
      keys[15].value,
      keys[16].value,
      keys[17].value,
      keys[18].value,
      keys[19].value,
      keys[20].value,
      keys[21].value
    );
  }
}
