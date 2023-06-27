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
exports.DoctorService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var abstract_service_1 = require("../abstract-service/abstract.service");
var uri = "";
var DoctorService = /** @class */ (function (_super) {
    __extends(DoctorService, _super);
    function DoctorService(http, apiService) {
        var _this = _super.call(this, http, uri) || this;
        _this.apiService = apiService;
        _this._doctors = [];
        _this.doctorSubject = new rxjs_1.BehaviorSubject([]);
        _this.doctor$ = _this.doctorSubject.asObservable();
        _this.apiConfig = _this.apiService.getConfig();
        uri = "" + _this.apiConfig.EmrEndPoint;
        return _this;
    }
    DoctorService.prototype.getDoctorById = function (id) {
        this.baseURL = uri + "/doctor/getById";
        var httpParams = new http_1.HttpParams().set('id', id);
        return this.getByParams(httpParams);
    };
    DoctorService.prototype.getDoctor = function () {
        var _this = this;
        this.baseURL = uri + "/doctor/getAllActive";
        return new rxjs_1.Observable(function (observable) {
            return _this.getAll().subscribe(function (doctors) {
                _this._doctors = doctors;
                observable.next(doctors);
                _this.doctorSubject.next(doctors);
                observable.complete();
            });
        });
    };
    DoctorService.prototype.getInativeDoctor = function () {
        this.baseURL = uri + "/doctor/getAllInActive";
        return this.getAll();
    };
    DoctorService.prototype.getDoctorActiveByName = function (name) {
        this.baseURL = uri + "/doctor/getByNameActive";
        var httpParams = new http_1.HttpParams().set('name', name);
        return this.getByParams(httpParams);
    };
    DoctorService.prototype.getDoctorInActiveByName = function (name) {
        this.baseURL = uri + "/doctor/getByNameInActive";
        var httpParams = new http_1.HttpParams().set('name', name);
        return this.getByParams(httpParams);
    };
    DoctorService.prototype.saveDoctor = function (doc) {
        this.baseURL = uri + "/doctor/save";
        return this.save(doc);
    };
    DoctorService.prototype.deleteDoctor = function (id) {
        this.baseURL = uri + "/doctor/delete";
        var httpParams = new http_1.HttpParams().set('id', id);
        this["delete"](httpParams);
    };
    DoctorService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(0, core_1.Inject(http_1.HttpClient))
    ], DoctorService);
    return DoctorService;
}(abstract_service_1.AbstractService));
exports.DoctorService = DoctorService;
