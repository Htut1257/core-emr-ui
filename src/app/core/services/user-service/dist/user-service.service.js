"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var abstract_service_1 = require("../abstract-service/abstract.service");
var uri = "";
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(http, route, apiService) {
        var _this = _super.call(this, http, uri) || this;
        _this.route = route;
        _this.apiService = apiService;
        _this.userList = [];
        _this.users = new rxjs_1.BehaviorSubject([]);
        _this.users$ = _this.users.asObservable();
        _this.userSubject$ = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem('user')));
        _this.$user = _this.userSubject$.asObservable();
        _this.apiConfig = _this.apiService.getConfig();
        uri = "" + _this.apiConfig.UserApiEndPoint;
        return _this;
    }
    //get current User
    UserService.prototype.getUserValue = function () {
        return this.userSubject$.value;
    };
    UserService.prototype.setUserValue = function (model) {
        localStorage.setItem('user', JSON.stringify(model));
        this.userSubject$.next(model);
    };
    //User Login
    UserService.prototype.loginUser = function (name, password) {
        this.baseURL = uri + "/user/login";
        var httpParams = new http_1.HttpParams()
            .set('userName', name)
            .set('password', password);
        return this.getByParams(httpParams);
    };
    //get user list
    UserService.prototype.getUser = function () {
        var _this = this;
        this.baseURL = uri + "/user/get-appuser";
        return new rxjs_1.Observable(function (observable) {
            _this.getAll().subscribe(function (users) {
                _this.userList = users;
                _this.users.next(users);
                observable.next(users);
                observable.complete();
            });
        });
    };
    //add or save user
    UserService.prototype.saveUser = function (user) {
        this.baseURL = uri + "/user/save-user";
        return this.save(user);
    };
    //logOut current user and remove it
    UserService.prototype.logOutUser = function () {
        localStorage.removeItem('user');
        localStorage.removeItem('machine');
        this.userSubject$.next(null);
        this.route.navigate(['/login']);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(0, core_1.Inject(http_1.HttpClient))
    ], UserService);
    return UserService;
}(abstract_service_1.AbstractService));
exports.UserService = UserService;
