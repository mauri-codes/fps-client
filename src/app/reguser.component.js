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
var ReguserComponent = (function () {
    function ReguserComponent(appService, router) {
        this.appService = appService;
        this.router = router;
        this.email = "";
        this.devname = "";
        this.name = "";
        this.disstate = false;
        this.timeofmessage = 3000;
        this.interval = 500;
    }
    ReguserComponent.prototype.newUser = function () {
        var _this = this;
        this.appService.uploadLink(this.email, this.devname, "register").
            subscribe(function (data) {
            _this.disstate = true;
            if (data["done"] == "success") {
                _this.message = "Esperando confirmacion del dispositivo, por favor ingrese " +
                    "su huella digital en modo registro";
            }
            else {
                _this.message = "Ocurrio un error, intentelo de nuevo";
            }
            _this.checkStatus(16);
        });
    };
    ReguserComponent.prototype.checkStatus = function (n) {
        var _this = this;
        if (n != 0) {
            console.log(n);
            this.appService.regdone(this.devname).subscribe(function (data) {
                if (data["success"]) {
                    if (data["status"] != "waiting") {
                        if (data["status"] == "register user") {
                            _this.registerUser(data["fing"]);
                        }
                        else {
                            _this.message = "El dispositivo que intenta registrar ya esta en uso." +
                                " Contactese con el dueño del dispositivo";
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
    ReguserComponent.prototype.cancel = function () {
        this.disstate = false;
    };
    ReguserComponent.prototype.registerUser = function (fingerprint) {
        var _this = this;
        this.appService.registerUser(this.name, this.email, this.devname, fingerprint).
            subscribe(function (data) {
            _this.disstate = true;
            if (data["done"] == "success") {
                _this.message = "Usuario registrado correctamente.";
            }
            else {
                _this.message = "Ocurrio un error, Intentelo de nuevo";
            }
            setTimeout(function () { _this.cancel(); }, _this.timeofmessage);
        });
    };
    ReguserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'reguser',
            providers: [app_service_1.AppService],
            templateUrl: './html/reguser.component.html',
            styleUrls: ['scss/register.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, router_1.Router])
    ], ReguserComponent);
    return ReguserComponent;
}());
exports.ReguserComponent = ReguserComponent;
//# sourceMappingURL=reguser.component.js.map