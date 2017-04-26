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
  private timeofmessage: number
  private interval: number;
  constructor(private appService: AppService, private router: Router){
    this.email = "";
    this.devname = "";
    this.name = "";
    this.disstate = false;
    this.timeofmessage = 3000;
    this.interval = 500;
  }
  newRegister(){

    this.appService.uploadLink(this.email, this.devname, "registerdev").
      subscribe(data => {
        this.disstate = true;
        if(data["done"] == "success"){
          this.message = "Esperando confirmacion del dispositivo, por favor ingrese " +
            "su huella digital en modo registro";
        }else{
          this.message = "An error ocurred, try it again.";
        }
        this.checkStatus(16);
      });
  }
  checkStatus(n: number) {
    if (n != 0){
      console.log(n);
      this.appService.regdone(this.devname).subscribe(data => {
        if (data["success"]) {
          if (data["status"] != "waiting") {
            if(data["status"] == "register dev"){
              //register dev :)
            }
            else{
              this.message = "El dispositivo que intenta registrar ya esta en uso." +
                              " Contactese con el dueño del dispositivo";
              setTimeout(()=>{this.cancel()}, this.timeofmessage);
            }
          }
          else {
            setTimeout(()=>{this.checkStatus(n-1)}, this.interval);
          }
        }
        else {
          setTimeout(()=>{this.checkStatus(n-1)}, this.interval);
        }
      });
    }else{
      this.message = "El tiempo de espera ha transcurrido, intentelo de nuveo";
      setTimeout(()=>{this.cancel()}, this.timeofmessage);
    }
  }
  cancel(){
    this.disstate = false;

  }
}
