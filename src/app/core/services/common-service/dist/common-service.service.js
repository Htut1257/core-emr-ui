"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommonServiceService = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var CommonServiceService = /** @class */ (function () {
    function CommonServiceService(route) {
        var _this = this;
        this.route = route;
        this.isDrawer = false;
        this.currentUrl$ = new rxjs_1.BehaviorSubject('');
        //set title object
        this.titleSubject = new rxjs_1.BehaviorSubject(localStorage.getItem('headerName'));
        this.titleSubject$ = this.titleSubject.asObservable();
        //for configurating mobile screen
        this.isMobile = new rxjs_1.BehaviorSubject(false);
        this.isMobile$ = this.isMobile.asObservable();
        //set mobile screen 
        this.isMobileObj = new rxjs_1.BehaviorSubject(false);
        this.isMobileObj$ = this.isMobileObj.asObservable();
        //define route name 
        this.route.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.currentUrl$.next(event.urlAfterRedirects);
            }
        });
        //get screen size 
        this.sizeSubject$ = new rxjs_1.BehaviorSubject(this.getCurrScreen());
        this.$sizeObserver = this.sizeSubject$;
        if (this.isMobile.value == false) {
            if (this.sizeSubject$.value.width <= 400 || this.sizeSubject$.value.width <= 750) {
                this.isMobile.next(true);
            }
        }
    }
    //to open close navigation
    CommonServiceService.prototype.openNavigation = function () {
        if (this.isDrawer) {
            this.appDrawer.close();
        }
        else {
            this.appDrawer.open();
        }
        this.isDrawer = !this.isDrawer;
    };
    //get current title component
    CommonServiceService.prototype.getTitle = function (name) {
        localStorage.setItem('headerName', name);
        this.titleSubject.next(name);
    };
    //get screen size
    CommonServiceService.prototype.getSize = function (size) {
        this.sizeSubject$.next(size);
        if (size.width <= 750 || size.width <= 875) {
            this.isMobile.next(true);
        }
        else {
            this.isMobile.next(false);
        }
    };
    //get current screen size
    CommonServiceService.prototype.getCurrScreen = function () {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    };
    //set mobile object
    CommonServiceService.prototype.getCurrentObject = function (data) {
        this.isMobileObj.next(data);
    };
    CommonServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CommonServiceService);
    return CommonServiceService;
}());
exports.CommonServiceService = CommonServiceService;
