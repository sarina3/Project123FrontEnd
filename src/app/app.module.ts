import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { AboutComponent } from './pages/about/about.component';
import { DataComponent } from './pages/data/data.component';
import { ModelComponent } from './pages/model/model.component';
import { PredictComponent } from './pages/predict/predict.component';
import { AckWebcamComponent } from './components/ack-webcam/ack-webcam.component';
import { HttpClientModule } from '@angular/common/http';
import { WebCamModule } from 'ack-angular-webcam';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PhotoViewerComponent,
    AboutComponent,
    DataComponent,
    ModelComponent,
    PredictComponent,
    AckWebcamComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WebCamModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
