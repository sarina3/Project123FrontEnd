import { Component, OnInit, HostListener, ViewChild } from "@angular/core";
import { LoginComponent } from "src/app/components/login/login.component";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  loginOpened = false;
  @ViewChild(LoginComponent, { static: false }) loginComponent: LoginComponent;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    console.log(this.auth.isLoggedIn())
  }

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
        this.loginComponent.login();
      }
      if (event.keyCode === 27) {
        this.loginOpened = false;
      }
    }
  }
}
