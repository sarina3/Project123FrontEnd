import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header/header.component";
import { PhotoViewerComponent } from "./components/photo-viewer/photo-viewer.component";
import { SelectComponent } from "./components/select/select.component";
import { AboutComponent } from "./pages/about/about.component";
import { DataComponent } from "./pages/data/data.component";
import { ModelComponent } from "./pages/model/model.component";
import { PredictComponent } from "./pages/predict/predict.component";
import { AckWebcamComponent } from "./components/ack-webcam/ack-webcam.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { WebCamModule } from "ack-angular-webcam";
import { NewDatasetComponent } from "./pages/new-dataset/new-dataset.component";
import { LoginComponent } from "./components/login/login.component";
import { CardsComponent } from "./components/cards/cards.component";
import { MatCardModule, MatTooltipModule, MatButtonModule, MatInputModule, MatTabsModule, MatAutocomplete, MatAutocompleteModule, MatSelectModule, MatStepperModule, MatIconModule } from "@angular/material/";
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TrainComponent } from './pages/train/train.component';
import { TestComponent } from './pages/test/test.component';
import { TrainTestFormComponent } from './components/train-test-form/train-test-form.component';
import { ModelBuilderComponent } from './components/model-builder/model-builder.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { ImageCropperModule } from 'ngx-image-cropper';

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
    NewDatasetComponent,
    LoginComponent,
    CardsComponent,
    TrainComponent,
    TestComponent,
    TrainTestFormComponent,
    ModelBuilderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebCamModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatIconModule,
    GoogleChartsModule.forRoot(),
    ImageCropperModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
