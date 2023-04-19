"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckOutRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var check_out_voucher_component_1 = require("./check-out-voucher/check-out-voucher.component");
var check_out_component_1 = require("./check-out/check-out.component");
var routes = [
    { path: '', component: check_out_component_1.CheckOutComponent },
    { path: 'voucher', component: check_out_voucher_component_1.CheckOutVoucherComponent }
];
var CheckOutRoutingModule = /** @class */ (function () {
    function CheckOutRoutingModule() {
    }
    CheckOutRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CheckOutRoutingModule);
    return CheckOutRoutingModule;
}());
exports.CheckOutRoutingModule = CheckOutRoutingModule;
