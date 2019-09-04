import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token = "";

  constructor(private http: HttpClient) {}

  login(formData: { username: string; pass: string }) {
    this.http.post(BaseUrl + "login", formData).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
