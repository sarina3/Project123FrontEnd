import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseUrl } from "src/environments/environment";
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  token = '';
  username = '';
  loggedIn = false; //true only on development should be false
  constructor(private http: HttpClient) {}

  login(formData: { username: string; pass: string }) {
    this.http.post(BaseUrl + "login", formData).subscribe(
      (data:{identity: string, name: string}) => {
        this.token = data.identity;
        this.username = data.name;
        this.loggedIn = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  isLoggedIn(){
    return this.loggedIn;
  }
  
  logout(){
    this.http.get(`${BaseUrl}logout`).subscribe(
      () => {
        this.token = '';
        this.username = '';
        this.loggedIn = false;
      }
    )
  }
}
