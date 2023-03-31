"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VitalSignComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var appointment_search_dialog_component_1 = require("../../OPT/appointment/appointment-search-dialog/appointment-search-dialog.component");
var moment = require("moment");
var VitalSignComponent = /** @class */ (function () {
    function VitalSignComponent(route, appointService, commonService, dialog) {
        var _this = this;
        this.route = route;
        this.appointService = appointService;
        this.commonService = commonService;
        this.dialog = dialog;
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.displayedColumn = ["no", "date", "visitno", "regno", "patient", "doctor", "phone", "serialno", "wl", "reg"];
        this.isMobile = false;
        this.bookings = [];
        this.dataSource = new table_1.MatTableDataSource(this.bookings);
        this.commonService.isMobile$.subscribe(function (data) {
            _this.isMobile = data;
        });
        this.appointService.bookings.subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    VitalSignComponent.prototype.ngOnInit = function () {
        var filter = {
            fromDate: this.todayDate,
            toDate: this.todayDate,
            doctorId: '-',
            regNo: '-',
            status: 'CONFIRM'
        };
        this.getBooking(filter);
    };
    VitalSignComponent.prototype.getBooking = function (filter) {
        var _this = this;
        this.appointService.getAppointment(filter).subscribe(function (appoint) {
            console.log(appoint);
            _this.bookings = appoint;
            _this.dataSource = new table_1.MatTableDataSource(_this.bookings);
        });
    };
    VitalSignComponent.prototype.vitalBooking = function (model) {
        this.appointService._booking = model;
        console.log(this.isMobile);
        if (this.isMobile) {
            this.commonService.getCurrentObject(true);
        }
        else {
            this.commonService.getCurrentObject(false);
        }
    };
    VitalSignComponent.prototype.searchBooking = function () {
        var _this = this;
        this.dialog.open(appointment_search_dialog_component_1.AppointmentSearchDialogComponent, {
            disableClose: true,
            width: '50%'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result.dialogStatus) {
                _this.getBooking(result);
            }
        });
    };
    VitalSignComponent = __decorate([
        core_1.Component({
            selector: 'app-vital-sign',
            templateUrl: './vital-sign.component.html',
            styleUrls: ['./vital-sign.component.css']
        })
    ], VitalSignComponent);
    return VitalSignComponent;
}());
exports.VitalSignComponent = VitalSignComponent;
