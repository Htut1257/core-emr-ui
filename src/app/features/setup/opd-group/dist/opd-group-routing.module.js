"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpdGroupRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var opd_group_component_1 = require("./opd-group/opd-group.component");
var opd_group_setup_component_1 = require("./opd-group-setup/opd-group-setup.component");
var opd_group_list_component_1 = require("./opd-group-list/opd-group-list.component");
var routes = [
    { path: '', component: opd_group_component_1.OpdGroupComponent },
    { path: 'opd-goup-list', component: opd_group_list_component_1.OpdGroupListComponent },
    { path: 'opd-group-setup', component: opd_group_setup_component_1.OpdGroupSetupComponent },
];
var OpdGroupRoutingModule = /** @class */ (function () {
    function OpdGroupRoutingModule() {
    }
    OpdGroupRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], OpdGroupRoutingModule);
    return OpdGroupRoutingModule;
}());
exports.OpdGroupRoutingModule = OpdGroupRoutingModule;
