"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var app_service_1 = require('./app.service');
var router_1 = require('@angular/router');
var LoginComponent = (function () {
    function LoginComponent(appService, router) {
        this.appService = appService;
        this.router = router;
        this.email = "";
        this.disstate = false;
        this.timeofmessage = 3000;
        this.interval = 500;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.appService.uploadLink(this.email, "FPS_001", "log").
            subscribe(function (data) {
            _this.disstate = true;
            if (data["done"] == "success") {
                _this.message = "Esperando confirmacion del dispositivo, por favor ingrese " +
                    "su huella digital en modo registro";
            }
            else {
                _this.message = "Ocurrio un error, por favor intentelo de nuevo.";
            }
            _this.checkStatus(16);
        });
    };
    LoginComponent.prototype.checkStatus = function (n) {
        var _this = this;
        if (n != 0) {
            console.log(n);
            this.appService.regdone("FPS_001").subscribe(function (data) {
                if (data["success"]) {
                    if (data["status"] != "waiting") {
                        if (data["status"] == "log user") {
                            _this.checkUser(data["fing"]);
                        }
                        else {
                            _this.message = "Error, es posible que el dispositivo este en modo registro" +
                                "cuando debiera estar en modo identificacion";
                            setTimeout(function () { _this.cancel(); }, _this.timeofmessage);
                        }
                    }
                    else {
                        setTimeout(function () { _this.checkStatus(n - 1); }, _this.interval);
                    }
                }
                else {
                    setTimeout(function () { _this.checkStatus(n - 1); }, _this.interval);
                }
            });
        }
        else {
            this.message = "El tiempo de espera ha transcurrido, intentelo de nuveo";
            setTimeout(function () { _this.cancel(); }, this.timeofmessage);
        }
    };
    LoginComponent.prototype.cancel = function () {
        this.disstate = false;
    };
    LoginComponent.prototype.checkUser = function (fingerprint) {
        var _this = this;
        this.appService.checkUser(this.email, fingerprint).
            subscribe(function (data) {
            _this.disstate = true;
            if (data["success"]) {
                _this.message = "Login exitoso.";
            }
            else {
                _this.message = "Ocurrio un error, Intentelo de nuevo";
            }
            setTimeout(function () { _this.cancel(); }, _this.timeofmessage);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            providers: [app_service_1.AppService],
            templateUrl: './html/login.component.html',
            styleUrls: ['scss/register.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map