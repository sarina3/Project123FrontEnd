import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { BaseUrl } from 'src/environments/environment';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(
    private http: HttpClient
  ) {}

  live() {
   return io.connect(`${BaseUrl}socket`);
  }


  trainModel(form: FormGroup): Observable<any> {
    const url = 'train';
    return this.http
      .post(BaseUrl + url, form.value);
  }

  testModel(form: FormGroup): Observable<any> {
    const url = 'test';
    return this.http
      .post(BaseUrl + url, form.value);
  }

  getModels() {
    return this.http.get(`${BaseUrl}models`);
  }

  builderGetData(model){
    return this.http.get(`${BaseUrl}builder?model=` + model);
  }

  buildModel(json) {
    return this.http.post(`${BaseUrl}builder`, json).subscribe(
      () => {
      }
    );
  }

  getTrainData(form: FormGroup) {
    return this.http.post(`${BaseUrl}training-session`, form.value);
  }

  getTestData(form: FormGroup) {
    return this.http.post(`${BaseUrl}testing-session`, form.value);
  }


}
