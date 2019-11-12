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

  myHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  socket: SocketIOClient.Socket;
  subject = new Subject();
  constructor(
    private http: HttpClient
  ) {}

  live() {
    this.socket = io.connect(`${BaseUrl}socket`);
    this.socket.on('message-resp', data => console.log(data));
  }

  send() {
    this.socket.emit('message', {data: 'message'});
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

  builderGetData() {
    return this.http.get(`${BaseUrl}builder`);
  }

  buildModel(json) {
    return this.http.post(`${BaseUrl}builder`, json).subscribe(
      () => {}
    );
  }

  getTrainData(form: FormGroup) {
    return this.http.post(`${BaseUrl}training-session`, form.value);
  }

  getTestData(form: FormGroup) {
    return this.http.post(`${BaseUrl}testing-session`, form.value);
  }


}
