import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { DataComponent } from './pages/data/data.component';
import { ModelComponent } from './pages/model/model.component';
import { AboutComponent } from './pages/about/about.component';
import { PredictComponent } from './pages/predict/predict.component';

const routes: Routes = [
  { path: 'dataset/data', component: DataComponent},
  { path: 'dataset/show', component: PhotoViewerComponent},
  { path: 'data', component: DataComponent },
  { path: 'model', component: ModelComponent },
  { path: 'about', component: AboutComponent },
  { path: 'testing-session', component: PredictComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
