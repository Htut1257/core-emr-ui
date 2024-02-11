"use strict";
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
exports.AppointmentPatientDialogComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var dialog_1 = require("@angular/material/dialog");
var table_1 = require("@angular/material/table");
var moment = require("moment");
var AppointmentPatientDialogComponent = /** @class */ (function () {
    function AppointmentPatientDialogComponent(appointService, userService, dialogRef, data) {
        this.appointService = appointService;
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.displayedColumn = ["no", "date", "regno", "patient", "doctor", "phone", "serialno", "wl"];
        this.user = this.userService.getUserValue();
        this.bookings = [];
        this.dataSource = new table_1.MatTableDataSource(this.bookings);
        // this.appointService.bookings.subscribe(data => {
        //   this.dataSource.data = data
        // })
    }
    AppointmentPatientDialogComponent.prototype.ngOnInit = function () {
        var filter = {
            fromDate: this.todayDate,
            toDate: '2024-01-01',
            doctorId: "047",
            regNo: '-',
            //tatus: '-'
            status: '-'
        };
        console.log(filter);
        this.getBooking(filter);
    };
    //get Appointment
    AppointmentPatientDialogComponent.prototype.getBooking = function (filter) {
        var _this = this;
        this.appointService.getAppointment(filter).pipe(rxjs_1.map(function (data) {
            return data.filter(function (appoint) {
                return appoint.bkPatientStatus;
            });
        })).subscribe(function (data) {
            _this.bookings = data;
            console.log(data);
            _this.dataSource = new table_1.MatTableDataSource(_this.bookings);
            _this.dataSource.data = data;
        });
        // this.appointService.getAppointment(filter)
        //   .subscribe(appoint => {
        //     this.bookings = appoint.filter(item => parseInt(item.bkPatientStatus) > 5)
        //     this.dataSource = new MatTableDataSource(this.bookings)
        //   })
    };
    AppointmentPatientDialogComponent.prototype.getBookingRowData = function (data) {
        this.dialogRef.close(data);
    };
    AppointmentPatientDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-appointment-patient-dialog',
            templateUrl: './appointment-patient-dialog.component.html',
            styleUrls: ['./appointment-patient-dialog.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AppointmentPatientDialogComponent);
    return AppointmentPatientDialogComponent;
}());
exports.AppointmentPatientDialogComponent = AppointmentPatientDialogComponent;
