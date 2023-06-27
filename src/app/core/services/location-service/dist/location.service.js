"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocationService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var url = "";
var httpHeaders = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Contnet-Type'
});
var LocationService = /** @class */ (function () {
    function LocationService(http, apiService) {
        this.http = http;
        this.apiService = apiService;
        this._locations = [];
        this.locations = new rxjs_1.BehaviorSubject([]);
        this.locations$ = this.locations.asObservable();
        this.apiConfig = this.apiService.getConfig();
        url = "" + this.apiConfig.EmrEndPoint;
    }
    LocationService.prototype.getLocation = function () {
        var _this = this;
        var uri = url + "/pharmacySetup/getAllLocation";
        var httpOption = { headers: httpHeaders };
        return new rxjs_1.Observable(function (observable) {
            return _this.http.get(uri, httpOption).subscribe(function (locations) {
                observable.next(locations);
                _this.locations.next(locations);
                observable.complete();
            });
        });
    };
    LocationService.prototype.saveLocation = function (data) {
        var uri = url + "/";
        var httpOption = { headers: httpHeaders };
        return this.http.post(uri, data, httpOption);
    };
    LocationService.prototype.deleteLocation = function (id) {
        var uri = url + "/";
        var httpParams = new http_1.HttpParams()
            .set('', id);
        var httpOption = { headers: httpHeaders, params: httpParams };
        return this.http["delete"](uri, httpOption);
    };
    LocationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocationService);
    return LocationService;
}());
exports.LocationService = LocationService;
