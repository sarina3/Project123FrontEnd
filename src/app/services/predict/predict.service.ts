import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    const url = '/predict';
    return this._http
      .post(url, image, this.myHttpOptions)
      .pipe(
        map(res => console.log(res)));
  }
}
