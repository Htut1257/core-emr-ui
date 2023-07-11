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
        return new rxjs_1.Observable(function (observer) {
            if (_this.eventsource) {
                _this.eventsource.close();
            }
            _this.eventsource = _this.sseService.getEventSource(uri);
            console.log(_this.eventsource);
            _this.eventsource.onmessage = function (event) {
                console.log("subscribe id :" + event.lastEventId);
                _this._zone.run(function () {
                    observer.next(event);
                });
            };
            _this.eventsource.onerror = function (error) {
                _this._zone.run(function () {
                    console.log('connection lost :attempt to reconnect ');
                    observer.error(error);
                    _this.reconnectToSSE(url);
                });
            };
            return function () {
                _this.eventsource.close();
            };
        });
    };
    ServerService.prototype.reconnectToSSE = function (url) {
        if (this.eventsource.readyState === EventSource.CLOSED) {
            this.getServerSource(url);
        }
    };
    ServerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ServerService);
    return ServerService;
}());
exports.ServerService = ServerService;
