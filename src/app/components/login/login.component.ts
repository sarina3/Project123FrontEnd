import { AuthService } from "./../../services/auth.service";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    pass: new FormControl("", Validators.required)
  });
  @Output()
  close = new EventEmitter<null>();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  submitForm() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
      this.close.emit();
    }
  }
}
