import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { BaseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
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
}
