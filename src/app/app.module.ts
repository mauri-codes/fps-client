import { NgModule }       from '@angular/core';
import { HttpModule }     from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppRoutingModule }       from './app-routing.module';

import { AppComponent }       from './app.component';
import { WelcomeComponent }   from './welcome.component';
import {RegisterComponent}    from "./register.component";

@NgModule({
  imports:      [ BrowserModule,
                  AppRoutingModule,
                  HttpModule,
                  FormsModule],
  declarations: [ AppComponent,
                  WelcomeComponent,
                  RegisterComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
