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
exports.VitalSignService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var api_setting_1 = require("src/app/api/api-setting");
var abstract_service_1 = require("../abstract-service/abstract.service");
var uri = api_setting_1.ApiSetting.EmrMongoEndPoint;
var VitalSignService = /** @class */ (function (_super) {
    __extends(VitalSignService, _super);
    function VitalSignService(http) {
        return _super.call(this, http, uri) || this;
    }
    VitalSignService.prototype.saveVitalSign = function (data) {
        this.baseURL = uri + "/patient/saveVitalSign";
        console.log(this.baseURL);
        // return this.http.post<VitalSign>(uri, data)
        return this.save(data);
    };
    VitalSignService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(0, core_1.Inject(http_1.HttpClient))
    ], VitalSignService);
    return VitalSignService;
}(abstract_service_1.AbstractService));
exports.VitalSignService = VitalSignService;
