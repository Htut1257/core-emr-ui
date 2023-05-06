"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
//layouts components
var main_default_component_1 = require("./shared/layouts/main-default/main-default.component");
//components
var login_component_1 = require("./features/system/login/login/login.component");
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'main', component: main_default_component_1.MainDefaultComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./shared/layouts/layouts-routing.module'); }).then(function (module) { return module.LayoutsRoutingRoutingModule; }); }
            },
            {
                path: 'user',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./features/system/user/user.module'); }).then(function (module) { return module.UserModule; }); }
            },
            {
                path: 'registration',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./features/registration/registration.module'); }).then(function (module) { return module.RegistrationModule; }); }
            },
            {
                path: 'vital-sign',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./features/entry/vital-sign/vital-sign.module'); }).then(function (module) { return module.VitalSignModule; }); }
            },
            {
                path: 'opd',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./features/entry/OPT/opt.module'); }).then(function (module) { return module.OPTModule; }); }
            },
            {
                path: 'role',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./features/system/role/role.module'); }).then(function (module) { return module.RoleModule; }); }
            }
        ]
    },
    {
        path: 'setup',
        children: [
            {
                path: 'opd',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./features/setup/setup.module'); }).then(function (module) { return module.SetupModule; }); }
            },
        ]
    },
    {
        path: 'system', component: main_default_component_1.MainDefaultComponent,
        children: [
            {
                path: 'user',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./features/system/user/user.module'); }).then(function (module) { return module.UserModule; }); }
            },
            {
                path: 'role',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./features/system/role/role.module'); }).then(function (module) { return module.RoleModule; }); }
            },
            {
                path: 'menu',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./features/system/menu/menu.module'); }).then(function (module) { return module.MenuModule; }); }
            }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
