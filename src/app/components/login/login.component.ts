import { AuthService } from "./../../services/auth.service";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit() {}

  submitForm() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
      this.router.navigate(['/']);
    }
  }

  signUp() {
    if (this.loginForm.valid) {
      this.authService.signUp(this.loginForm.value);
      this.router.navigate(['/']);
    }
  }
}
