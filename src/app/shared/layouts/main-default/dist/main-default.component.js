"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainDefaultComponent = void 0;
var core_1 = require("@angular/core");
var doctor_status_modal_component_1 = require("src/app/features/entry/OPT/doctor-status-modal/doctor-status-modal.component");
var nav_item_model_1 = require("src/app/core/model/nav-item.model");
var MainDefaultComponent = /** @class */ (function () {
    function MainDefaultComponent(route, commonService, dialog) {
        this.route = route;
        this.commonService = commonService;
        this.dialog = dialog;
        this.items = [];
        this.loading = false;
    }
    MainDefaultComponent.prototype.ngOnInit = function () {
        this.items = nav_item_model_1.navItems;
    };
    MainDefaultComponent.prototype.ngAfterViewInit = function () {
        this.commonService.appDrawer = this.appDrawer;
    };
    MainDefaultComponent.prototype.getScreenSize = function () {
        var screenSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.commonService.getSize(screenSize);
    };
    MainDefaultComponent.prototype.openDialog = function () {
        var _this = this;
        this.dialogRef = this.dialog.open(doctor_status_modal_component_1.DoctorStatusModalComponent, {
            position: { right: "0", top: "0" },
            height: "100%",
            width: "200px",
            hasBackdrop: false,
            panelClass: ["animate__animated", "animate__bounceInRight"],
            data: { onClose: function () { return _this.close(); } }
        });
        this.dialogRef.afterOpened().subscribe(function (result) {
            //this.dialogRef.removePanelClass("animate__bounceInRight");
            console.log("after openeed");
        });
        this.dialogRef.afterClosed().subscribe(function (result) {
            console.log("Dialog result: " + result);
        });
    };
    MainDefaultComponent.prototype.close = function () {
        console.log("test 2 close");
        this.dialogRef.addPanelClass("animate__bounceOutRight");
    };
    __decorate([
        core_1.ViewChild('appDrawer')
    ], MainDefaultComponent.prototype, "appDrawer");
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], MainDefaultComponent.prototype, "getScreenSize");
    MainDefaultComponent = __decorate([
        core_1.Component({
            selector: 'app-main-default',
            templateUrl: './main-default.component.html',
            styleUrls: ['./main-default.component.css']
        })
    ], MainDefaultComponent);
    return MainDefaultComponent;
}());
exports.MainDefaultComponent = MainDefaultComponent;
