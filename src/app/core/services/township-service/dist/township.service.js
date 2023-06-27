"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.TownshipService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var abstract_service_1 = require("../abstract-service/abstract.service");
var uri = "";
var httpHeader = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,ORIGINS'
});
var TownshipService = /** @class */ (function (_super) {
    __extends(TownshipService, _super);
    function TownshipService(http, apiService) {
        var _this = _super.call(this, http, uri) || this;
        _this.apiService = apiService;
        _this._towns = [];
        _this.townSubject = new rxjs_1.BehaviorSubject([]);
        _this.town$ = _this.townSubject.asObservable();
        _this.apiConfig = _this.apiService.getConfig();
        uri = "" + _this.apiConfig.EmrEndPoint;
        return _this;
    }
    TownshipService.prototype.getTown = function () {
        this.baseURL = uri + "/township/getAll";
        var httpOption = { headers: httpHeader };
        return this.http.get(uri, httpOption);
    };
    TownshipService.prototype.getAllTownship = function () {
        var _this = this;
        this.baseURL = uri + "/township/getAll";
        return new rxjs_1.Observable(function (observable) {
            _this.getAll().subscribe(function (towns) {
                _this._towns = towns;
                observable.next(towns);
                _this.townSubject.next(towns);
                observable.complete();
            });
        });
    };
    TownshipService.prototype.getTownshipByName = function (name) {
        this.baseURL = uri + "/township/getByName";
        var httpParams = new http_1.HttpParams().set('name', name);
        return this.getByParams(httpParams);
    };
    TownshipService.prototype.getTownshipByParent = function (id) {
        this.baseURL = uri + "/township/getByParent";
        var httpParams = new http_1.HttpParams().set('parentId', id);
        return this.getByParams(httpParams);
    };
    TownshipService.prototype.saveTownShip = function (data) {
        this.baseURL = uri + "/township/save";
        return this.save(data);
    };
    TownshipService.prototype.removeTownship = function (id) {
        this.baseURL = uri + "/township/delete";
        var httpParams = new http_1.HttpParams().set('id', id);
        return this.getByParams(httpParams);
    };
    TownshipService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(0, core_1.Inject(http_1.HttpClient))
    ], TownshipService);
    return TownshipService;
}(abstract_service_1.AbstractService));
exports.TownshipService = TownshipService;
