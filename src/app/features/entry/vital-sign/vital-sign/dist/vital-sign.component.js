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
var sort_1 = require("@angular/material/sort");
var appointment_search_dialog_component_1 = require("../../OPT/appointment/appointment-search-dialog/appointment-search-dialog.component");
var moment = require("moment");
var VitalSignComponent = /** @class */ (function () {
    function VitalSignComponent(route, appointService, commonService, serverService, dialog) {
        var _this = this;
        this.route = route;
        this.appointService = appointService;
        this.commonService = commonService;
        this.serverService = serverService;
        this.dialog = dialog;
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.displayedColumn = ["no", "date", "regno", "patient", "doctor", "wl", "reg"];
        this.isMobile = false;
        this.bookings = [];
        this.dataSource = new table_1.MatTableDataSource(this.bookings);
        this.commonService.isMobile$.subscribe(function (data) {
            _this.isMobile = data;
        });
        this.appointService.bookings$.subscribe(function (data) {
            _this.dataSource.data = data;
        });
        this.getServer();
    }
    VitalSignComponent.prototype.ngOnInit = function () {
        var filter = {
            fromDate: this.todayDate,
            toDate: this.todayDate,
            doctorId: '-',
            regNo: '-',
            status: '-'
        };
        this.getBooking(filter);
        // this.getServerSideData();
    };
    VitalSignComponent.prototype.ngOnDestroy = function () {
        if (this.serverSubscription) {
            this.serverSubscription.unsubscribe();
        }
    };
    VitalSignComponent.prototype.getServer = function () {
        var uri = '/opdBooking/getSSEMessage';
        this.serverSubscription = this.serverService.getServerSource(uri).subscribe(function (data) {
            console.log(data.data);
        });
    };
    VitalSignComponent.prototype.getServerSideData = function () {
        var uri = '/opdBooking/getMessage';
        // this.serverService.getServerSource(uri).subscribe(data => {
        //   let serverData = JSON.parse(data.data)
        //   console.log(serverData)
        //   if (serverData.actionStatus == "UPDATE") {
        //     console.log("update")
        //     let filter = {
        //       fromDate: this.todayDate,
        //       toDate: this.todayDate,
        //       doctorId: '-',
        //       regNo: '-',
        //       status: 'Vital Sign'
        //     }
        //     this.getBooking(filter);
        //     let targetIndex = this.bookings.findIndex(data => data.bookingId == serverData.bookingId)
        //     this.bookings[targetIndex] = serverData
        //     this.appointService.bookings.next(this.bookings)
        //     //this.bookings[this.bookings.indexOf(serverData.bookingId)] = serverData
        //   }
        // })
    };
    VitalSignComponent.prototype.getBooking = function (filter) {
        var _this = this;
        console.log(filter);
        this.appointService.getAppointment(filter).subscribe(function (appoint) {
            _this.bookings = appoint; //.filter((data: any) => data.bstatus === "Confirm")
            _this.dataSource = new table_1.MatTableDataSource(_this.bookings);
            _this.filterBooking();
            _this.sortBooking();
        });
    };
    VitalSignComponent.prototype.filterBooking = function () {
        this.dataSource.filterPredicate = function (data, filter) {
            return data.bookingId.toString().toLowerCase().includes(filter) ||
                // data.regNo.toLowerCase().includes(filter) ||
                data.doctorName.toLowerCase().includes(filter) ||
                data.patientName.toLowerCase().includes(filter);
        };
    };
    VitalSignComponent.prototype.sortBooking = function () {
        this.dataSource.sortingDataAccessor = function (item, property) {
            switch (property) {
                case 'patient': return item.patientName;
                case 'doctor': return item.doctorName;
            }
        };
        this.dataSource.sort = this.sort;
    };
    VitalSignComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
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
            width: '40%',
            data: {
                'title': 'Vital Sign Search',
                'status': 'Vital Sign'
            }
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result.dialogStatus) {
                _this.getBooking(result);
            }
        });
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], VitalSignComponent.prototype, "sort");
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
