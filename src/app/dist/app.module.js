"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = exports.initConfig = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
//components modules
var layouts_module_1 = require("./shared/layouts/layouts.module");
var login_module_1 = require("./features/system/login/login.module");
var registration_module_1 = require("./features/registration/registration.module");
var http_interceptor_service_1 = require("./shared/http-interceptor/http-interceptor.service");
var api_config_service_1 = require("./core/services/api-config-service/api-config.service");
function initConfig(appConfig) {
    return function () { return appConfig.loadConfig(); };
}
exports.initConfig = initConfig;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                //common modules
                // AgGridModule.withComponents([AutocompleteCell]),
                //component modules
                layouts_module_1.LayoutsModule,
                login_module_1.LoginModule,
                registration_module_1.RegistrationModule,
            ],
            providers: [
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: initConfig,
                    deps: [api_config_service_1.ApiConfigService],
                    multi: true
                },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: http_interceptor_service_1.HttpInterceptorService, multi: true }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
