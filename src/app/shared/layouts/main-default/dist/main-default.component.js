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
    function MainDefaultComponent(route, commonService, serverService, appointService, dialog, cdr) {
        this.route = route;
        this.commonService = commonService;
        this.serverService = serverService;
        this.appointService = appointService;
        this.dialog = dialog;
        this.cdr = cdr;
        this.items = [];
        this.loading = false;
        //this.getServerSideData()
        this.getServer();
    }
    MainDefaultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = nav_item_model_1.navItems;
        this.subscription = this.commonService.isProgress$.subscribe(function (data) {
            _this.loading = data;
            _this.cdr.detectChanges();
        });
    };
    MainDefaultComponent.prototype.ngAfterViewInit = function () {
        this.commonService.appDrawer = this.appDrawer;
    };
    MainDefaultComponent.prototype.ngOnDestroy = function () {
        if (this.serverSubscription) {
            this.serverSubscription.unsubscribe();
        }
    };
    MainDefaultComponent.prototype.getServer = function () {
        var uri = '/opdBooking/getSSEMessage';
        this.serverSubscription = this.serverService.getServerSource(uri).subscribe(function (data) {
            console.log(data.data);
        });
    };
    MainDefaultComponent.prototype.getScreenSize = function () {
        var screenSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        this.commonService.getSize(screenSize);
    };
    MainDefaultComponent.prototype.getServerSideData = function () {
        var uri = '/opdBooking/getSSEMessage';
        this.serverService.getServerSource(uri).subscribe(function (data) {
            console.log(data);
            //  let serverData = JSON.parse(data.data)
            //let bookings = 
            //  this.serverService.serverData = serverData
            //  console.log(this.serverService.serverData)
            // if (serverData.actionStatus == "ADD") {
            //   console.log("add")
            //   this.appointService._bookings.push(serverData.tranObject);
            //   this.appointService.bookings.next(this.appointService._bookings)
            // }
            // if (serverData.actionStatus == "UPDATE") {
            //   console.log("update")
            //  let targetIndex = this.appointService._bookings.findIndex(data => data.bookingId == serverData.tranObject.bookingId)
            //  console.log(targetIndex)
            //  console.log( this.appointService._bookings[targetIndex])
            //  this.appointService._bookings[targetIndex] = serverData.tranObject
            //  this.appointService.bookings.next(this.appointService._bookings)
            // }
        });
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
