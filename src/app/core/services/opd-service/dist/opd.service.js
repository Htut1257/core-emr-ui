"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpdService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var EmrEndPoint = "";
var httpHeaders = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
});
var OpdService = /** @class */ (function () {
    function OpdService(http, apiService) {
        this.http = http;
        this.apiService = apiService;
        this._opdGroups = [];
        this.opdGroups = new rxjs_1.BehaviorSubject([]);
        this.opdGroups$ = this.opdGroups.asObservable();
        this.apiConfig = this.apiService.getConfig();
        EmrEndPoint = "" + this.apiConfig.EmrEndPoint;
    }
    //#region  opd setup
    OpdService.prototype.getOpdGroup = function () {
        var _this = this;
        var uri = EmrEndPoint + "/opdSetup/getAllOPDGroup";
        var httpOption = { headers: httpHeaders };
        return new rxjs_1.Observable(function (observable) {
            if (_this._opdGroups.length > 1) {
                observable.next(_this._opdGroups);
                _this.opdGroups.next(_this._opdGroups);
                return observable.complete();
            }
            return _this.http.get(uri, httpOption).subscribe(function (opdGroups) {
                observable.next(opdGroups);
                _this.opdGroups.next(opdGroups);
                observable.complete();
            });
        });
    };
    OpdService.prototype.saveOpdGroup = function (data) {
        var uri = EmrEndPoint + "/opdSetup/saveOPDGroup";
        var httpOption = { headers: httpHeaders };
        return this.http.post(uri, data, httpOption);
    };
    OpdService.prototype.deleteOpdGroup = function (id) {
        var uri = EmrEndPoint + "/opdSetup/deleteOPDGroup";
        var httpParams = new http_1.HttpParams()
            .set('id', id);
        var httpOption = { headers: httpHeaders, params: httpParams };
        return this.http["delete"](uri, httpOption);
    };
    //#endregion opd setup
    //#region  opd category
    OpdService.prototype.getOpdCategory = function () {
        var uri = EmrEndPoint + "/opdSetup/getAllOPDCategory";
        var httpOption = { headers: httpHeaders };
        return this.http.get(uri, httpOption);
    };
    OpdService.prototype.getOpdCategorybyFilter = function (type, value) {
        var uri = EmrEndPoint + "/opdSetup/getAllOPDCategoryByFilter";
        var httpParams = new http_1.HttpParams()
            .set('columnName', type)
            .set('value', value);
        var httpOption = { headers: httpHeaders, params: httpParams };
        return this.http.get(uri, httpOption);
    };
    OpdService.prototype.saveOpdCategory = function (data) {
        var uri = EmrEndPoint + "/opdSetup/saveOPDCategory";
        var httpOption = { headers: httpHeaders };
        return this.http.post(uri, data, httpOption);
    };
    OpdService.prototype.deleteOpdCategory = function (id) {
        var uri = '';
        var httpParams = new http_1.HttpParams()
            .set('id', id);
        var httpOption = { headers: httpHeaders, params: httpParams };
        return this.http["delete"](uri, httpOption);
    };
    //#endregion opd Category
    //#region  opd service
    OpdService.prototype.getOpdService = function () {
        var uri = EmrEndPoint + "/opdSetup/getAllOPDService";
        var httpOption = { headers: httpHeaders };
        return this.http.get(uri, httpOption);
    };
    OpdService.prototype.getOpdServicebyFilter = function (type, value) {
        var uri = EmrEndPoint + "/opdSetup/getAllOPDServiceByFilter";
        var httpParams = new http_1.HttpParams()
            .set('columnName', type)
            .set('value', value);
        var httpOption = { headers: httpHeaders, params: httpParams };
        return this.http.get(uri, httpOption);
    };
    OpdService.prototype.saveOpdService = function (data) {
        var uri = EmrEndPoint + "/opdSetup/saveOPDService";
        var httpOption = { headers: httpHeaders };
        return this.http.post(uri, data, httpOption);
    };
    OpdService.prototype.deleteOpdService = function (id) {
        var uri = EmrEndPoint + "/opdSetup/deleteOPDService";
        var httpParams = new http_1.HttpParams()
            .set('serId', id);
        var httpOption = { headers: httpHeaders, params: httpParams };
        return this.http["delete"](uri, httpOption);
    };
    OpdService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OpdService);
    return OpdService;
}());
exports.OpdService = OpdService;
