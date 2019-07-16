import { Component, OnInit, HostListener, ViewChild } from "@angular/core";
import { LoginComponent } from "src/app/components/login/login.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  loginOpened = false;
  @ViewChild(LoginComponent) loginComponent: LoginComponent;
  constructor() {}

  ngOnInit() {}

  openLogin() {
    this.loginOpened = true;
  }

  closeLogin() {
    this.loginOpened = false;
  }

  @HostListener("document:keyup", ["$event"])
  onkeyup(event: KeyboardEvent) {
    if (this.loginOpened) {
      if (event.keyCode === 13) {
        this.loginComponent.submitForm();
      }
      if (event.keyCode === 27) {
        this.loginOpened = false;
      }
    }
  }
}
