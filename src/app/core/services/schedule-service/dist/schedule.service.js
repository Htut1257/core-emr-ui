"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ScheduleService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var api_setting_1 = require("src/app/api/api-setting");
var uri = "" + api_setting_1.ApiSetting.EmrEndPoint;
var httpHeaders = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
});
var ScheduleService = /** @class */ (function () {
    function ScheduleService(http, apiService) {
        this.http = http;
        this.apiService = apiService;
        this._docSchedules = [];
        this.docScheduleSubject = new rxjs_1.BehaviorSubject([]);
        this.docSchedule$ = this.docScheduleSubject.asObservable();
        this.apiConfig = this.apiService.getConfig();
        uri = "" + this.apiConfig.EmrEndPoint;
    }
    ScheduleService.prototype.getDoctorSchedule = function (doctorId) {
        var _this = this;
        return new rxjs_1.Observable(function (observable) {
            var url = uri + "/doctor/getDRScheduleTemplate";
            var httpParams = new http_1.HttpParams()
                .set("drId", doctorId);
            var httpOption = { headers: httpHeaders, params: httpParams };
            return _this.http.get(url, httpOption).subscribe(function (schedules) {
                _this._docSchedules = schedules;
                _this.docScheduleSubject.next(schedules);
                observable.next(_this._docSchedules);
                observable.complete();
            });
        });
    };
    ScheduleService.prototype.saveDoctorSchedule = function (data) {
        var url = uri + "/doctor/saveDoctorScheduleTemplate";
        var httpOption = { headers: httpHeaders };
        return this.http.post(url, data, httpOption);
    };
    ScheduleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ScheduleService);
    return ScheduleService;
}());
exports.ScheduleService = ScheduleService;
