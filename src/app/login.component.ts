import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router }         from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'login',
  providers: [ AppService ],
  templateUrl: './html/login.component.html',
  styleUrls: ['scss/register.component.css']
})

export class LoginComponent {
  private email:string;
  private disstate: boolean;
  private message: string;
  private timeofmessage: number;
  private interval: number;
  constructor(private appService: AppService, private router: Router){
    this.email = "";
    this.disstate = false;
    this.timeofmessage = 3000;
    this.interval = 500;
  }
  login(){

    this.appService.uploadLink(this.email, "FPS_001", "log").
    subscribe(data => {
      this.disstate = true;
      if(data["done"] == "success"){
        this.message = "Esperando confirmacion del dispositivo, por favor ingrese " +
          "su huella digital en modo registro";
      }else{
        this.message = "Ocurrio un error, por favor intentelo de nuevo.";
      }
      this.checkStatus(16);
    });
  }
  checkStatus(n: number) {
    if (n != 0){
      console.log(n);
      this.appService.regdone("FPS_001").subscribe(data => {
        if (data["success"]) {
          if (data["status"] != "waiting") {
            if(data["status"] == "log user"){
              this.checkUser(data["fing"]);
            }
            else{
              this.message = "Error, es posible que el dispositivo este en modo registro" +
                "cuando debiera estar en modo identificacion";
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
  checkUser(fingerprint: String){
    this.appService.checkUser(this.email, fingerprint).
    subscribe(data => {
      this.disstate = true;
      if(data["success"]){
        this.message = "Login exitoso.";
      }else{
        this.message = "Ocurrio un error, Intentelo de nuevo";
      }
      setTimeout(()=>{this.cancel()}, this.timeofmessage);
    });
  }
}
