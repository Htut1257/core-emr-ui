"use strict";
exports.__esModule = true;
exports.AbstractService = void 0;
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var httpHeader = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,ORIGINS'
});
var AbstractService = /** @class */ (function () {
    function AbstractService(http, baseURL) {
        this.http = http;
        this.baseURL = baseURL;
    }
    AbstractService.prototype.getById = function (params) {
        var _this = this;
        return new rxjs_1.Observable(function (observable) {
            var uri = _this.baseURL;
            var httpParams = params;
            var httpOption = { headers: httpHeader, params: httpParams };
            _this.http.get(uri, httpOption).subscribe(function (data) {
                observable.next(data);
                observable.complete();
            });
        });
    };
    //get all obj list
    AbstractService.prototype.getAll = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observable) {
            var uri = _this.baseURL;
            var httpOption = { headers: httpHeader };
            _this.http.get(uri, httpOption).subscribe(function (data) {
                observable.next(data);
                observable.complete();
            });
        });
    };
    AbstractService.prototype.getByParams = function (params) {
        var uri = this.baseURL;
        var httpParams = params;
        var httpOption = { headers: httpHeader, params: httpParams };
        return this.http.get(uri, httpOption);
    };
    //save obj
    AbstractService.prototype.save = function (obj) {
        var uri = this.baseURL;
        var httpOption = { headers: httpHeader };
        return this.http.post(uri, obj, httpOption);
    };
    //delete obj
    AbstractService.prototype["delete"] = function (params) {
        var uri = this.baseURL;
        var httpParams = params;
        var httpOption = { headers: httpHeader, params: httpParams };
        return this.http["delete"](uri, httpOption);
    };
    return AbstractService;
}());
exports.AbstractService = AbstractService;
