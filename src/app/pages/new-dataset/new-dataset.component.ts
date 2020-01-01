import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-new-dataset',
  templateUrl: './new-dataset.component.html',
  styleUrls: ['./new-dataset.component.scss']
})
export class NewDatasetComponent implements OnInit {

  datasetForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    metadata: new FormControl(null, Validators.required),
    images: new FormControl([], Validators.required)
  });
  metadataName = null;

  constructor(private imageService: ImagesService) { }

  ngOnInit() {
    this.imageService.getDatasets().subscribe(
      data => console.log(data)
    );
  }

  onMetadataChange(event: any) {
    const file = event.target.files[0];
    this.metadataName = file.name;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.datasetForm.get('metadata').setValue(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onImagesChange(event: any) {
    const files: FileList = event.target.files;
    const tmp = [];
    let index = 0;
    const reader = new FileReader();
    reader.onloadend = () => {
      const name = files.item(index).name;
      tmp.push({ name: name, file: reader.result as string });
      index++;
      if (index < files.length) {
        reader.readAsDataURL(files.item(index));
      } else {
        this.datasetForm.get('images').setValue(tmp);
      }
    };
    reader.readAsDataURL(files.item(index));

  }

  onSubmit() {
    this.imageService.createDataset(this.datasetForm);
  }
}
