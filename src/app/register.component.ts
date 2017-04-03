import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router }         from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'register',
  providers: [ AppService ],
  templateUrl: './html/register.component.html',
  styleUrls: ['scss/register.component.css']
})

export class RegisterComponent {
  private devname:string;
  private name:string;
  private email:string;
  private disstate: boolean;
  private message: string;
  constructor(private appService: AppService, private router: Router){
    this.email = "";
    this.devname = "";
    this.name = "";
    this.disstate = false;
  }
  newRegister(){

    this.appService.uploadLink(this.email, this.devname, "register").
      subscribe(data => {
        console.log("hi world");
      });
  }
  cancel(){
    this.disstate = false;

  }
}
