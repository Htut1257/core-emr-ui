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
exports.AppointmentService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var abstract_service_1 = require("../abstract-service/abstract.service");
var api_setting_1 = require("src/app/api/api-setting");
var uri = "" + api_setting_1.ApiSetting.EmrEndPoint;
var httpHeaders = new http_1.HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
});
var httpHeaderparams = new http_1.HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
});
var AppointmentService = /** @class */ (function (_super) {
    __extends(AppointmentService, _super);
    function AppointmentService(http) {
        var _this = _super.call(this, http, uri) || this;
        _this._bookings = [];
        _this.bookings = new rxjs_1.BehaviorSubject([]);
        _this.bookings$ = _this.bookings.asObservable();
        return _this;
    }
    AppointmentService.prototype.getAppointment = function (filter) {
        var _this = this;
        this.baseURL = uri + "/patient/searchBooking";
        var httpparams = new http_1.HttpParams()
            .set("fromDate", filter.fromDate)
            .set("toDate", filter.toDate)
            .set("drId", filter.doctorId)
            .set("regNo", filter.regNo)
            .set("status", filter.status);
        return new rxjs_1.Observable(function (observable) {
            _this.getByParams(httpparams).subscribe(function (bookings) {
                _this._bookings = bookings;
                observable.next(bookings);
                _this.bookings.next(_this._bookings);
                observable.complete();
            });
        });
        // return this.getByParams(httpparams)
    };
    AppointmentService.prototype.saveAppointment = function (appoint) {
        this.baseURL = uri + "/patient/saveBooking";
        return this.save(appoint);
    };
    //set booking status across form
    AppointmentService.prototype.updateAppointmentStatus = function (appoint) {
        this.baseURL = uri + "/patient/updateBookingStatus";
        var httpParams = new http_1.HttpParams()
            .set("bkId", appoint.bookingId)
            .set("bkStatus", appoint.bStatus);
        var httpOption = { headers: httpHeaders, params: httpParams };
        return this.http.post(this.baseURL, appoint, httpOption);
    };
    AppointmentService.prototype.deleteAppointment = function (id) {
        this.baseURL = uri + "/setup/delete-Bonus";
        var httpParams = new http_1.HttpParams().set('id', id);
        this["delete"](httpParams);
    };
    AppointmentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(0, core_1.Inject(http_1.HttpClient))
    ], AppointmentService);
    return AppointmentService;
}(abstract_service_1.AbstractService));
exports.AppointmentService = AppointmentService;
