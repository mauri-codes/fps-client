import { Component } from '@angular/core';
import { LoginDetailsService } from './login-details.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'html/app.component.html',
  providers: [ LoginDetailsService ],
  styleUrls: ['./scss/app.component.css']
})
export class AppComponent  {
  username:string   = "";
  role:string       = "";
  constructor(private loginService: LoginDetailsService){
    loginService.loginEmitted$.subscribe(user=> {this.username = user.username;});
    this.username = (localStorage.getItem('currentUser')+""== "null")?'':localStorage.getItem('currentUser');
  }
  logout(){
    localStorage.setItem('currentUser', '');
    localStorage.setItem('token', '');
    this.username = '';
  }
}
