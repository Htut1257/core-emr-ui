"use strict";
exports.__esModule = true;
exports.ApiSetting = void 0;
var ApiSetting = /** @class */ (function () {
    function ApiSetting() {
    }
    Object.defineProperty(ApiSetting, "UserApiEndPoint", {
        get: function () {
            return 'http://localhost:8079';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiSetting, "AccountApiEndPoint", {
        get: function () {
            return 'http://192.168.100.213:8079';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiSetting, "InventoryApiEndPoint", {
        get: function () {
            return 'http://192.168.100.213:8079';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiSetting, "PayRollApiEndPoint", {
        get: function () {
            return 'http://localhost:8098';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiSetting, "EmrEndPoint", {
        get: function () {
            return 'http://localhost:8080';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiSetting, "EmrMongoEndPoint", {
        get: function () {
            return 'http://192.168.100.54:8081';
        },
        enumerable: false,
        configurable: true
    });
    return ApiSetting;
}());
exports.ApiSetting = ApiSetting;