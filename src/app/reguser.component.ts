import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router }         from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'reguser',
  providers: [ AppService ],
  templateUrl: './html/reguser.component.html',
  styleUrls: ['scss/register.component.css']
})

export class ReguserComponent {
  private devname:string;
  private name:string;
  private email:string;
  private disstate: boolean;
  private message: string;
  private timeofmessage: number;
  private interval: number;
  constructor(private appService: AppService, private router: Router){
    this.email = "";
    this.devname = "";
    this.name = "";
    this.disstate = false;
    this.timeofmessage = 3000;
    this.interval = 500;
  }
  newUser(){

    this.appService.uploadLink(this.email, this.devname, "register").
    subscribe(data => {
      this.disstate = true;
      if(data["done"] == "success"){
        this.message = "Esperando confirmacion del dispositivo, por favor ingrese " +
          "su huella digital en modo registro";
      }else{
        this.message = "Ocurrio un error, intentelo de nuevo";
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
            if(data["status"] == "register user"){
              this.registerUser(data["fing"]);
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
  registerUser(fingerprint: String){
    this.appService.registerUser(this.name, this.email, this.devname, fingerprint).
    subscribe(data => {
      this.disstate = true;
      if(data["done"] == "success"){
        this.message = "Usuario registrado correctamente.";
      }else{
        this.message = "Ocurrio un error, Intentelo de nuevo";
      }
      setTimeout(()=>{this.cancel()}, this.timeofmessage);
    });
  }
}
