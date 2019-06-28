import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { SelectComponent } from './components/select/select.component';
import { AboutComponent } from './pages/about/about.component';
import { DataComponent } from './pages/data/data.component';
import { ModelComponent } from './pages/model/model.component';
import { PredictComponent } from './pages/predict/predict.component';
import { AckWebcamComponent } from './components/ack-webcam/ack-webcam.component';
import { HttpClientModule } from '@angular/common/http';
import { WebCamModule } from 'ack-angular-webcam';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhotoViewerComponent,
    AboutComponent,
    DataComponent,
    ModelComponent,
    PredictComponent,
    AckWebcamComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebCamModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
