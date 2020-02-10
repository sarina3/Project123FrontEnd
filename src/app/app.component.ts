import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { WindowConfigService } from './services/window-config.service';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  sub: Subscription;
  isDarkTheme: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private windowConfig: WindowConfigService,
    private change: ChangeDetectorRef,
    private themeService: ThemeService
  ) {}

  get auth() {
    return this.authService;
  }

  ngOnInit() {
    this.sub = this.windowConfig.refresh.subscribe(() => {
      console.log('called');
      this.change.detectChanges();
    });
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get config() {
    return this.windowConfig.state;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
