import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { CardsComponent } from './components/cards/cards.component';
import { DataComponent } from './pages/data/data.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ModelBuilderComponent } from './components/model-builder/model-builder.component';
import { NewDatasetComponent } from './pages/new-dataset/new-dataset.component';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { PredictComponent } from './pages/predict/predict.component';
import { TestComponent } from './pages/test/test.component';
import { TrainComponent } from './pages/train/train.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'about', component: AboutComponent },
  { path: 'data', component: DataComponent },
  { path: 'dataset/new', component: NewDatasetComponent },
  { path: 'dataset/show', component: PhotoViewerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'model', component: CardsComponent },
  { path: 'my-models', component: CardsComponent },
  { path: 'new-model', component: ModelBuilderComponent },
  { path: 'predict', component: PredictComponent },
  { path: 'testing-session', component: TestComponent },
  { path: 'training-session', component: TrainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
