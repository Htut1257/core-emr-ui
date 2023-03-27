"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var common_modules_module_1 = require("src/app/shared/common-modules/common-modules.module");
var user_routing_module_1 = require("./user-routing.module");
var user_list_component_1 = require("./user-list/user-list.component");
var user_setup_component_1 = require("./user-setup/user-setup.component");
var user_container_component_1 = require("./user-container/user-container.component");
var autocomplete_cell_1 = require("src/app/shared/cell-renderer/autocomplete-cell");
var components = [
    user_setup_component_1.UserSetupComponent,
    user_list_component_1.UserListComponent
];
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            declarations: [
                components,
                user_container_component_1.UserContainerComponent,
                autocomplete_cell_1.AutocompleteCell
            ],
            imports: [
                common_1.CommonModule,
                common_modules_module_1.CommonModulesModule,
                user_routing_module_1.UserRoutingModule
            ],
            exports: [
                components
            ]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
