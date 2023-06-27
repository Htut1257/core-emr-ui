"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckOutService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var httpHeader = new http_1.HttpHeaders({
    'ContentType': 'applicaton/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
});
var CheckOutService = /** @class */ (function () {
    function CheckOutService(http, apiService) {
        this.http = http;
        this.apiService = apiService;
        this._checkOuts = [];
        this.apiConfig = this.apiService.getConfig();
    }
    CheckOutService.prototype.getCheckoutByVisitId = function (id) {
        var _this = this;
        var uri = this.apiConfig.EmrMongoEndPoint + "/opdMedical/getOPDMedicalHisCashier";
        var httpParams = new http_1.HttpParams()
            .set('visitId', id);
        var httpOption = { headers: httpHeader, params: httpParams };
        return new rxjs_1.Observable(function (observable) {
            _this.http.get(uri, httpOption).subscribe(function (cashier) {
                _this._checkOut = cashier;
                observable.next(cashier);
                observable.complete();
            });
        });
    };
    CheckOutService.prototype.saveCheckOut = function (data) {
        var uri = this.apiConfig.EmrMongoEndPoint + "/opdMedical/save-opdMedicalHisCashier";
        var httpOption = { headers: httpHeader };
        return this.http.post(uri, data, httpOption);
    };
    CheckOutService.prototype.saveCheckoutHistory = function (data) {
        var uri = this.apiConfig.EmrEndPoint + "/emr-med/saveEMRData";
        var httpOption = { headers: httpHeader };
        return this.http.post(uri, data, httpOption);
    };
    CheckOutService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CheckOutService);
    return CheckOutService;
}());
exports.CheckOutService = CheckOutService;
