import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { BaseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  myHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  trainModel(form: FormGroup): Observable<any> {
    const url = 'train';
    return this.http
      .post(BaseUrl + url, form.value);
  }

  getModels(){
    return this.http.get(`${BaseUrl}models`);
  }

  builderGetData(){
    return this.http.get(`${BaseUrl}builder`);
  }

  buildModel(json){
    return this.http.post(`${BaseUrl}builder`, json).subscribe(
      () => {}
    );
  }


}
