"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpdSetupModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var common_modules_module_1 = require("src/app/shared/common-modules/common-modules.module");
var opd_setup_routing_module_1 = require("./opd-setup-routing.module");
var opd_dialog_component_1 = require("./opd-dialog/opd-dialog.component");
var opd_list_component_1 = require("./opd-list/opd-list.component");
var opd_setup_component_1 = require("./opd-setup/opd-setup.component");
var components = [
    opd_dialog_component_1.OpdDialogComponent,
    opd_list_component_1.OpdListComponent,
    opd_setup_component_1.OpdSetupComponent,
];
var OpdSetupModule = /** @class */ (function () {
    function OpdSetupModule() {
    }
    OpdSetupModule = __decorate([
        core_1.NgModule({
            declarations: [
                components
            ],
            imports: [
                common_1.CommonModule,
                common_modules_module_1.CommonModulesModule,
                opd_setup_routing_module_1.OpdSetupRoutingModule,
            ],
            exports: [
                components
            ]
        })
    ], OpdSetupModule);
    return OpdSetupModule;
}());
exports.OpdSetupModule = OpdSetupModule;
