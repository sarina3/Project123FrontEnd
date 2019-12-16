import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { WindowConfigService } from './services/window-config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  sub: Subscription;

  constructor(
    private windowConfig: WindowConfigService, private change: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.windowConfig.refresh.subscribe(() => {
      console.log('called');
      this.change.detectChanges();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get config() {
    return this.windowConfig.state;
  }
}
