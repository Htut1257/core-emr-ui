"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AutocompleteService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var api_setting_1 = require("src/app/api/api-setting");
var httpHeader = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
});
var AutocompleteService = /** @class */ (function () {
    function AutocompleteService(http) {
        this.http = http;
    }
    AutocompleteService.prototype.getExaminationData = function (params) {
        var _this = this;
        return new rxjs_1.Observable(function (observable) {
            var uri = api_setting_1.ApiSetting.EmrMongoEndPoint + "/autoComplete/medTermsAutoComplete";
            var httpParams = new http_1.HttpParams()
                .set("medDesc", params);
            var httpOption = { headers: httpHeader, params: httpParams };
            _this.http.get(uri, httpOption).subscribe(function (data) {
                observable.next(data);
                observable.complete();
            });
        });
    };
    AutocompleteService.prototype.getTreatmentData = function (params) {
        var _this = this;
        return new rxjs_1.Observable(function (observable) {
            var uri = api_setting_1.ApiSetting.EmrEndPoint + "/common/getDrAutoCompleteItem";
            var httpParams = new http_1.HttpParams()
                .set("desp", params);
            var httpOption = { headers: httpHeader, params: httpParams };
            _this.http.get(uri, httpOption).subscribe(function (data) {
                observable.next(data);
                observable.complete();
            });
        });
    };
    AutocompleteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AutocompleteService);
    return AutocompleteService;
}());
exports.AutocompleteService = AutocompleteService;
