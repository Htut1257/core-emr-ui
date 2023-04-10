"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppointmentHistoryComponent = void 0;
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var appointment_search_dialog_component_1 = require("../appointment-search-dialog/appointment-search-dialog.component");
var moment = require("moment");
var AppointmentHistoryComponent = /** @class */ (function () {
    function AppointmentHistoryComponent(route, appointService, toastService, commonService, serverService, dialog) {
        var _this = this;
        this.route = route;
        this.appointService = appointService;
        this.toastService = toastService;
        this.commonService = commonService;
        this.serverService = serverService;
        this.dialog = dialog;
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.displayedColumn = ["no", "date", "regno", "patient", "doctor", "phone", "serialno", "wl", "reg"];
        this.bookings = [];
        this.dataSource = new table_1.MatTableDataSource(this.bookings);
        this.appointService.bookings.subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    AppointmentHistoryComponent.prototype.ngOnInit = function () {
        var filter = {
            fromDate: this.todayDate,
            toDate: this.todayDate,
            doctorId: '-',
            regNo: '-',
            status: '-'
        };
        this.getBooking(filter);
        this.getServerSideData();
    };
    AppointmentHistoryComponent.prototype.getServerSideData = function () {
        var _this = this;
        var uri = '/opdBooking/getMessage';
        this.serverService.getServerSource(uri).subscribe(function (data) {
            var serverData = JSON.parse(data.data);
            if (serverData.actionStatus = "ADD") {
                _this.bookings.push(serverData);
                _this.appointService.bookings.next(_this.bookings);
            }
            if (serverData.actionStatus = "UPDATE") {
                _this.bookings[_this.bookings.indexOf(serverData.bookingSerialNo)] = serverData;
            }
        });
    };
    //get Appointment
    AppointmentHistoryComponent.prototype.getBooking = function (filter) {
        var _this = this;
        this.appointService.getAppointment(filter).subscribe(function (appoint) {
            console.log(appoint);
            _this.bookings = appoint;
            _this.dataSource = new table_1.MatTableDataSource(_this.bookings);
            _this.filterBooking();
        });
    };
    //filter table data
    AppointmentHistoryComponent.prototype.filterBooking = function () {
        this.dataSource.filterPredicate = function (data, filter) {
            return data.bookingId.toString().toLowerCase().includes(filter) ||
                data.doctorName.toLowerCase().includes(filter);
        };
    };
    AppointmentHistoryComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    AppointmentHistoryComponent.prototype.searchBooking = function () {
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
    AppointmentHistoryComponent.prototype.registerBooking = function (model) {
        this.route.navigate(['/main/registration/registration-setup']);
        this.appointService._booking = model;
        this.commonService.getTitle("Registration");
    };
    //confirm patient booking 
    AppointmentHistoryComponent.prototype.confirmBooking = function (model) {
        model.bStatus = model.bstatus;
        this.appointService.updateAppointmentStatus(model).subscribe({
            next: function (appoint) {
                console.log(appoint);
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], AppointmentHistoryComponent.prototype, "sort");
    AppointmentHistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-appointment-history',
            templateUrl: './appointment-history.component.html',
            styleUrls: ['./appointment-history.component.css']
        })
    ], AppointmentHistoryComponent);
    return AppointmentHistoryComponent;
}());
exports.AppointmentHistoryComponent = AppointmentHistoryComponent;
