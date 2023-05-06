"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpdGroupModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var common_modules_module_1 = require("src/app/shared/common-modules/common-modules.module");
var opd_group_routing_module_1 = require("./opd-group-routing.module");
var opd_group_setup_component_1 = require("./opd-group-setup/opd-group-setup.component");
var opd_group_list_component_1 = require("./opd-group-list/opd-group-list.component");
var opd_group_component_1 = require("./opd-group/opd-group.component");
var components = [
    opd_group_setup_component_1.OpdGroupSetupComponent,
    opd_group_list_component_1.OpdGroupListComponent,
    opd_group_component_1.OpdGroupComponent
];
var OpdGroupModule = /** @class */ (function () {
    function OpdGroupModule() {
    }
    OpdGroupModule = __decorate([
        core_1.NgModule({
            declarations: [
                components
            ],
            imports: [
                common_1.CommonModule,
                common_modules_module_1.CommonModulesModule,
                opd_group_routing_module_1.OpdGroupRoutingModule,
            ],
            exports: [
                components
            ]
        })
    ], OpdGroupModule);
    return OpdGroupModule;
}());
exports.OpdGroupModule = OpdGroupModule;
