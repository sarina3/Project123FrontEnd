import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  myHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private _http: HttpClient
  ) { }

  predict(image: FormGroup): Observable<any> {
    const url = 'predict';
    return this._http
      .post(BaseUrl + url, image.value, this.myHttpOptions);
  }
}
