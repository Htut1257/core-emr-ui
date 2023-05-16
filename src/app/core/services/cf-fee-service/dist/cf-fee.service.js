"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CfFeeService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var api_setting_1 = require("src/app/api/api-setting");
var apiEndPoint = "" + api_setting_1.ApiSetting.EmrEndPoint;
var httpHeader = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
});
var CfFeeService = /** @class */ (function () {
    function CfFeeService(http) {
        this.http = http;
        this._opdFees = [];
    }
    CfFeeService.prototype.getOpdCfFee = function () {
        var _this = this;
        var uri = apiEndPoint + "/opdSetup/getOPDDoctorCFFees";
        var httpOption = { headers: httpHeader };
        return new rxjs_1.Observable(function (obervable) {
            return _this.http.get(uri, httpOption).subscribe(function (cfFee) {
                _this._opdFees = cfFee;
                obervable.next(cfFee);
                obervable.complete();
            });
        });
    };
    CfFeeService.prototype.getOpdCfFeeByDoctor = function (id) {
        var _this = this;
        var uri = apiEndPoint + "/opdSetup/getOPDDoctorCFFees";
        var httpParams = new http_1.HttpParams()
            .set('drId', id);
        var httpOption = { headers: httpHeader, params: httpParams };
        return new rxjs_1.Observable(function (obervable) {
            return _this.http.get(uri, httpOption).subscribe(function (cfFee) {
                _this._opdFees = cfFee;
                obervable.next(cfFee);
                obervable.complete();
            });
        });
    };
    CfFeeService.prototype.saveOpdCfFee = function (data) {
        var uri = apiEndPoint + "/opdSetup/getOPDDoctorCFFees";
        var httpOption = { headers: httpHeader };
        return this.http.post(uri, data, httpOption);
    };
    CfFeeService.prototype.deleteOpdCfFee = function () {
        var uri = apiEndPoint + "/opdSetup/getOPDDoctorCFFees";
        var httpOption = { headers: httpHeader };
        return this.http["delete"](uri, httpOption);
    };
    CfFeeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CfFeeService);
    return CfFeeService;
}());
exports.CfFeeService = CfFeeService;
