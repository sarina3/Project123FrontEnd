import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowConfigService {
  state = {
    contentFullscreen: false
  };
  refresh = new Subject<void>();



  constructor() { }

  resize() {
    this.state.contentFullscreen = !this.state.contentFullscreen;
    this.refresh.next();
  }

  get isFullScreen(){
    return this.state.contentFullscreen;
  }
}
