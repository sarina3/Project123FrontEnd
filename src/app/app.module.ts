import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// components
import { AckWebcamComponent } from './components/ack-webcam/ack-webcam.component';
import { CardsComponent } from './components/cards/cards.component';
import { HeaderComponent } from './components/header/header/header.component';
import { LiveTrainingSessionComponent } from './components/live-training-session/live-training-session.component';
import { LoginComponent } from './components/login/login.component';
import { ModelBuilderComponent } from './components/model-builder/model-builder.component';
import { PhotoViewerComponent } from './components/photo-viewer/photo-viewer.component';
import { SelectComponent } from './components/select/select.component';
import { TrainTestFormComponent } from './components/train-test-form/train-test-form.component';
// interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
// pages
import { AboutComponent } from './pages/about/about.component';
import { DataComponent } from './pages/data/data.component';
import { HomeComponent } from './pages/home/home.component' ;
import { ModelComponent } from './pages/model/model.component';
import { NewDatasetComponent } from './pages/new-dataset/new-dataset.component';
import { PredictComponent } from './pages/predict/predict.component';
import { TestComponent } from './pages/test/test.component';
import { TrainComponent } from './pages/train/train.component';
// modules
import { GoogleChartsModule } from 'angular-google-charts';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MaterialModule } from './material.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { WebCamModule } from 'ack-angular-webcam';


@NgModule({
  declarations: [
    AppComponent,
    // components
    AckWebcamComponent,
    CardsComponent,
    HeaderComponent,
    LiveTrainingSessionComponent,
    LoginComponent,
    ModelBuilderComponent,
    PhotoViewerComponent,
    SelectComponent,
    TrainTestFormComponent,
    // pages
    AboutComponent,
    DataComponent,
    HomeComponent,
    ModelComponent,
    NewDatasetComponent,
    PredictComponent,
    TestComponent,
    TrainComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // modules
    GoogleChartsModule.forRoot(),
    ImageCropperModule,
    MaterialModule,
    WebCamModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    overlayContainer: OverlayContainer
  ) {
    overlayContainer.getContainerElement().classList.add('birthmark-dark-theme');
  }
}
