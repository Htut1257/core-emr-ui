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
exports.MachineService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
'rxjs';
var http_1 = require("@angular/common/http");
var abstract_service_1 = require("../abstract-service/abstract.service");
var uri = "";
var MachineService = /** @class */ (function (_super) {
    __extends(MachineService, _super);
    function MachineService(http, apiService) {
        var _this = _super.call(this, http, uri) || this;
        _this.apiService = apiService;
        _this.machine = new rxjs_1.BehaviorSubject({});
        _this.machine$ = _this.machine.asObservable();
        _this.machine = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('machine')));
        _this.apiConfig = _this.apiService.getConfig();
        uri = "" + _this.apiConfig.EmrEndPoint;
        return _this;
    }
    MachineService.prototype.getMachineValue = function () {
        return this.machine.value;
    };
    MachineService.prototype.setMachineValue = function (model) {
        localStorage.setItem('machine', JSON.stringify(model));
        this.machine.next(model);
    };
    MachineService.prototype.getIpAddress = function () {
        this.baseURL = uri + "/machine/get-machineIp";
        return this.getAll();
    };
    MachineService.prototype.getMachine = function (model) {
        this.baseURL = uri + "/machine/get-machine";
        var httpParams = new http_1.HttpParams()
            .set('machineIp', model.machineIp)
            .set('machineName', model.machineName);
        return this.getById(httpParams);
    };
    //save machine
    MachineService.prototype.saveMachine = function (data) {
        this.baseURL = uri + "/";
        return this.save(data);
    };
    MachineService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(0, core_1.Inject(http_1.HttpClient))
    ], MachineService);
    return MachineService;
}(abstract_service_1.AbstractService));
exports.MachineService = MachineService;
