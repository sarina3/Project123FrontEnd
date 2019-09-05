import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';

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

  predict(image: string): Observable<any> {
    const url = 'predict';
    let json = { photo: image};
    json = JSON.parse(JSON.stringify(json));
    return this._http
      .post(BaseUrl + url, json, this.myHttpOptions);
  }
}
