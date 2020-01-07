import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  icon: string;
  text: string;
  routerLink: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tiles: Tile[] = [];

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.initHomePage();
  }

  initHomePage() {
    this.tiles = [
      { cols: 1, rows: 2, color: '#2196f3', icon: 'insert_photo', text: 'Predict', routerLink: '/predict',
        description: 'Otestujte svoje materské znamienko' },
      { cols: 3, rows: 1, color: '#2196f3', icon: 'restore', text: 'Train session', routerLink: '/training-session',
      description: 'Pozrite si trénovacie session' },
      { cols: 3, rows: 1, color: '#2196f3', icon: 'build', text: 'Test session', routerLink: '/testing-session',
      description: 'Skontrolujte testovaciu množinu' },
      { cols: 2, rows: 1, color: '#2196f3', icon: 'perm_media', text: 'Dataset', routerLink: '/dataset/show',
      description: 'Prezrite si dataset' },
      { cols: 2, rows: 1, color: '#2196f3', icon: 'create_new_folder', text: 'Create dataset', routerLink: '/dataset/new',
      description: 'Vytvorte si dataset' },
      { cols: 1, rows: 2, color: '#2196f3', icon: 'info', text: 'About', routerLink: '/about',
      description: 'Prečítajte si info o projekte' },
    ];
    if (this.auth.isLoggedIn()) {
      this.tiles.push(
        { cols: 2, rows: 1, color: '#2196f3', icon: 'folder', text: 'My models', routerLink: '/my-models',
        description: 'Prezrite si svoje modely' },
        { cols: 1, rows: 2, color: '#2196f3', icon: 'power_settings_new', text: 'Log out', routerLink: '',
        description: 'Odhláste sa' },
        { cols: 2, rows: 1, color: '#2196f3', icon: 'add_circle_outline', text: 'Create model', routerLink: '/new-model',
        description: 'Vytvorte si model' }
      );
    } else {
      this.tiles.push(
        { cols: 2, rows: 1, color: '#2196f3', icon: 'folder_shared', text: 'Static models', routerLink: '/model',
        description: 'Prezrite si statické modely' },
        { cols: 1, rows: 2, color: '#2196f3', icon: 'account_circle', text: 'Login', routerLink: '/login',
        description: 'Prihláste sa pre viac funkcií' },
        { cols: 2, rows: 1, color: '#2196f3', icon: 'language', text: 'Empty', routerLink: '',
        description: 'Táto kocka tu je kvôli voľnému miestu :)' }
      );
    }
  }
}
