"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpdSetupRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var opd_dialog_component_1 = require("./opd-dialog/opd-dialog.component");
var opd_list_component_1 = require("./opd-list/opd-list.component");
var opd_setup_component_1 = require("./opd-setup/opd-setup.component");
var routes = [
    { path: '', component: opd_dialog_component_1.OpdDialogComponent },
    { path: 'opd-setup-list', component: opd_list_component_1.OpdListComponent },
    { path: 'opd-setup', component: opd_setup_component_1.OpdSetupComponent }
];
var OpdSetupRoutingModule = /** @class */ (function () {
    function OpdSetupRoutingModule() {
    }
    OpdSetupRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], OpdSetupRoutingModule);
    return OpdSetupRoutingModule;
}());
exports.OpdSetupRoutingModule = OpdSetupRoutingModule;
