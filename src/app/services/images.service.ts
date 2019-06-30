import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseUrl } from 'src/environments/environment';
import { Observable, forkJoin } from 'rxjs';
import { ImageMetadata } from '../model/image-metadata.model';
import { FormGroup, FormArray, FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getImages(metadata: ImageMetadata): Observable<any> {
    
    const form = new FormGroup({
      'lastIndex': new FormControl(metadata.lastIndex),
      'count': new FormControl(metadata.count),
      'all': new FormControl(metadata.all)
    });
    const json = JSON.parse(JSON.stringify(metadata));
    return this.http.post(BaseUrl+'loadImages',json);
  }

  createDataset(datasetForm: FormGroup){
    const creationData = {
      name: datasetForm.get('name').value,
      metadata: datasetForm.get('metadata').value
    }
    const json = JSON.parse(JSON.stringify(creationData));
    this.http.post(BaseUrl + 'dataset/new',json).subscribe(
      () => {
        let tmp = []
        let count = datasetForm.get('images').value.length;
        for(let image of datasetForm.get('images').value){
          const imgJson = JSON.parse(JSON.stringify({ count: count, dataset: datasetForm.get('name').value, photo: image}));
          tmp.push(this.http.post(BaseUrl+ 'dataset/new/image', imgJson));
        }
        console.log(tmp)
        forkJoin(tmp).subscribe(
          () => {
            alert('dataset was created successfully');  
          },
          (error:Error) => {
            alert(error.message);
          }
        )
      }
    )
  }
}
