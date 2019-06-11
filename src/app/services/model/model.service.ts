import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  myHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private _http: HttpClient
  ) { }

  trainModel(activationFunction: number): Observable<any> {
    const url = '/train';
    return this._http
      .post(url, activationFunction, this.myHttpOptions)
      .pipe(
        map(res => console.log(res)));
  }
}
