import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header/header.component";
import { PhotoViewerComponent } from "./components/photo-viewer/photo-viewer.component";
import { SelectComponent } from "./components/select/select.component";
import { AboutComponent } from "./pages/about/about.component";
import { DataComponent } from "./pages/data/data.component";
import { ModelComponent } from "./pages/model/model.component";
import { PredictComponent } from "./pages/predict/predict.component";
import { AckWebcamComponent } from "./components/ack-webcam/ack-webcam.component";
import { HttpClientModule } from "@angular/common/http";
import { WebCamModule } from "ack-angular-webcam";
import { NewDatasetComponent } from "./pages/new-dataset/new-dataset.component";
import { LoginComponent } from "./components/login/login.component";
import { CardsComponent } from "./components/cards/cards.component";
import { MatCardModule, MatTooltipModule } from "@angular/material/";

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
    CardsComponent
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
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
