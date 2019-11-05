import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { DataComponent } from './pages/data/data.component';
import { ModelComponent } from './pages/model/model.component';
import { AboutComponent } from './pages/about/about.component';
import { PredictComponent } from './pages/predict/predict.component';
import { NewDatasetComponent } from './pages/new-dataset/new-dataset.component';
import { CardsComponent } from './components/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import { TrainComponent } from './pages/train/train.component';
import { TestComponent } from './pages/test/test.component';
import { ModelBuilderComponent } from './components/model-builder/model-builder.component';

const routes: Routes = [
  { path: 'dataset/new', component: NewDatasetComponent},
  { path: 'dataset/show', component: PhotoViewerComponent},
  { path: 'predict', component: PredictComponent},
  { path: 'data', component: DataComponent },
  { path: 'model', component: CardsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'testing-session', component: TestComponent },
  { path: 'training-session', component: TrainComponent },
  { path: 'my-models', component: CardsComponent},
  { path: 'new-model', component: ModelBuilderComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
