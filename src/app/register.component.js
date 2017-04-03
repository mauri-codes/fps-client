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
var RegisterComponent = (function () {
    function RegisterComponent(appService, router) {
        this.appService = appService;
        this.router = router;
        this.email = "";
        this.devname = "";
        this.name = "";
        this.disstate = false;
    }
    RegisterComponent.prototype.newRegister = function () {
        this.appService.uploadLink(this.email, this.devname, "register").
            subscribe(function (data) {
            console.log("hi world");
        });
    };
    RegisterComponent.prototype.cancel = function () {
        this.disstate = false;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            providers: [app_service_1.AppService],
            templateUrl: './html/register.component.html',
            styleUrls: ['scss/register.component.css']
        }), 
        __metadata('design:paramtypes', [app_service_1.AppService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map