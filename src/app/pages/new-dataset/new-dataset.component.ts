import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ImagesService } from 'src/app/services/images.service';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-new-dataset',
  templateUrl: './new-dataset.component.html',
  styleUrls: ['./new-dataset.component.scss']
})
export class NewDatasetComponent implements OnInit {

  datasetForm = new FormGroup({
    name: new FormControl(null,Validators.required),
    metadata: new FormControl(null,Validators.required),
    images : new FormControl([],Validators.required)
  });
  
  constructor(private imageService: ImagesService) { }

  ngOnInit() {
    this.imageService.getDatasets().subscribe(
      data => console.log(data)
    );
  }

  onMetadataChange(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.datasetForm.get('metadata').setValue(<string> reader.result);
    }
    reader.readAsDataURL(file);
  }

  onImagesChange(event){
    const files:FileList = event.target.files;
    let tmp = [];
    let index = 0;
    const reader = new FileReader();
    reader.onloadend = () => {
      const name = files.item(index).name
      tmp.push({name: name, file: <string> reader.result});
      index++;
      if(index < files.length){
        reader.readAsDataURL(files.item(index));
      }else{
        this.datasetForm.get('images').setValue(tmp);
      }
    }
    reader.readAsDataURL(files.item(index));
    
  }

  onSubmit(){
    this.imageService.createDataset(this.datasetForm);
  }
}
