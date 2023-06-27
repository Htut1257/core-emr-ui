"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenuService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var userApi = "";
var httpHeaders = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
});
var MenuService = /** @class */ (function () {
    function MenuService(http, apiService) {
        this.http = http;
        this.apiService = apiService;
        this.apiConfig = this.apiService.getConfig();
        userApi = "" + this.apiConfig.UserApiEndPoint;
    }
    //get role menu setting for specific role
    MenuService.prototype.getMenuTree = function () {
        var uri = userApi + "/user/get-menu-tree";
        var httpOption = { headers: httpHeaders };
        return this.http.get(uri, httpOption);
    };
    MenuService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
