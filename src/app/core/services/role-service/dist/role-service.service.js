"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RoleService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var userApi = "";
var httpHeaders = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
});
var RoleService = /** @class */ (function () {
    function RoleService(http, apiService) {
        this.http = http;
        this.apiService = apiService;
        this.apiConfig = this.apiService.getConfig();
        userApi = "" + this.apiConfig.UserApiEndPoint;
        this.roleList = [];
    }
    //get all role
    RoleService.prototype.getRole = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observable) {
            if (_this.roleList.length > 1) {
                observable.next(_this.roleList);
                return observable.complete();
            }
            var uri = userApi + "/user/get-role";
            var httpOption = { headers: httpHeaders };
            _this.http.get(uri, httpOption).subscribe(function (roleData) {
                _this.roleList = roleData;
                observable.next(_this.roleList);
                observable.complete();
            });
        });
    };
    //add or edit role
    RoleService.prototype.saveRole = function (data) {
        var uri = userApi + "/user/save-role";
        var httpOption = { headers: httpHeaders };
        return this.http.post(uri, data, httpOption);
    };
    //get role menu setting for specific role
    RoleService.prototype.getMenuTree = function () {
        var uri = userApi + "/user/get-menu-tree";
        var httpOption = { headers: httpHeaders };
        return this.http.get(uri, httpOption);
    };
    //get role menu setting for specific role
    RoleService.prototype.getRoleMenu = function (roleCode) {
        var uri = userApi + "/user/get-role-menu-tree";
        var httpParams = new http_1.HttpParams().set('roleCode', roleCode);
        var httpOption = { headers: httpHeaders, params: httpParams };
        return this.http.get(uri, httpOption);
    };
    //add or edit menu data with role 
    RoleService.prototype.saveRoleMenu = function (data) {
        var uri = userApi + "/user/save-role-menu";
        var httpOption = { headers: httpHeaders };
        return this.http.post(uri, data, httpOption);
    };
    RoleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RoleService);
    return RoleService;
}());
exports.RoleService = RoleService;
