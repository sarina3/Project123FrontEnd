import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { PredictService } from '../../services/predict/predict.service';
import { SelectData } from 'src/app/components/select/select.model';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit {

  image: string;
  selectedOption: number;
  file;
  data = [
    {id: 0, title: 'Load Photo'},
    {id: 1, title: 'Take Photo'}
  ]

  constructor(
    private predictService: PredictService
  ) { }

  ngOnInit() {
  }

  onImageCreate(base64Image: any) {
    this.image = base64Image.image;
  }
 
  predict() {
    this.predictService.predict(this.image)
      .subscribe(response => console.log(response)
    );
  }

  onSelect(event: SelectData){
    this.selectedOption = event.id;
  }

  onFilePick(event){
    const reader = new FileReader();
    reader.onloadend = () => {
      this.image = reader.result;
    }
    console.log(event)
    reader.readAsDataURL(event.target.files[0])
  }
}
