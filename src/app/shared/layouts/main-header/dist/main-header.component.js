"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainHeaderComponent = void 0;
var core_1 = require("@angular/core");
var MainHeaderComponent = /** @class */ (function () {
    function MainHeaderComponent(route, commonService) {
        var _this = this;
        this.route = route;
        this.commonService = commonService;
        localStorage.removeItem('headerName');
        this.commonService.titleSubject$.subscribe(function (data) {
            _this.title = data;
        });
    }
    MainHeaderComponent.prototype.logOut = function () {
        this.route.navigate(['/login']);
    };
    MainHeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-main-header',
            templateUrl: './main-header.component.html',
            styleUrls: ['./main-header.component.css']
        })
    ], MainHeaderComponent);
    return MainHeaderComponent;
}());
exports.MainHeaderComponent = MainHeaderComponent;
