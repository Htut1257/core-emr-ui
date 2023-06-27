"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServerService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var uri = "";
var ServerService = /** @class */ (function () {
    function ServerService(_zone, sseService, apiService) {
        this._zone = _zone;
        this.sseService = sseService;
        this.apiService = apiService;
        this.apiConfig = this.apiService.getConfig();
    }
    ServerService.prototype.getServerSource = function (url) {
        var _this = this;
        uri = "" + this.apiConfig.EmrEndPoint + url;
        return rxjs_1.Observable.create(function (observer) {
            var eventsource = _this.sseService.getEventSource(uri);
            eventsource.onmessage = function (event) {
                _this._zone.run(function () {
                    observer.next(event);
                });
            };
            eventsource.onerror = function (error) {
                _this._zone.run(function () {
                    observer.error(error);
                });
            };
        });
    };
    ServerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ServerService);
    return ServerService;
}());
exports.ServerService = ServerService;
