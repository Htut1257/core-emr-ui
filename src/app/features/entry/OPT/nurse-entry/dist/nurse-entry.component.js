"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NurseEntryComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var appointment_search_dialog_component_1 = require("../appointment/appointment-search-dialog/appointment-search-dialog.component");
var moment = require("moment");
var forms_1 = require("@angular/forms");
var NurseEntryComponent = /** @class */ (function () {
    function NurseEntryComponent(route, nurseService, appointService, docService, serverService, dialog) {
        var _this = this;
        this.route = route;
        this.nurseService = nurseService;
        this.appointService = appointService;
        this.docService = docService;
        this.serverService = serverService;
        this.dialog = dialog;
        this.doctors = [];
        this.docControl = new forms_1.FormControl();
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.displayedColumns = ["position", "name", "status"];
        this.dataSource = new table_1.MatTableDataSource(this.bookings);
        this.appointService.bookings.subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    NurseEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var filter = {
            fromDate: this.todayDate,
            toDate: this.todayDate,
            doctorId: '-',
            regNo: '-',
            status: 'Doctor Waiting'
        };
        this.getBooking(filter);
        this.getServerSideData();
        this.filteredDoc = this.docControl.valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (name) { return (name ? _this._filterDoc(name) : _this.doctors.slice()); }));
    };
    NurseEntryComponent.prototype.getServerSideData = function () {
        var _this = this;
        var uri = '/opdBooking/getMessage';
        this.serverService.getServerSource(uri).subscribe(function (data) {
            var serverData = JSON.parse(data.data);
            console.log(serverData);
            if (serverData.actionStatus == "UPDATE") {
                console.log("update");
                var filter = {
                    fromDate: _this.todayDate,
                    toDate: _this.todayDate,
                    doctorId: '-',
                    regNo: '-',
                    status: 'Doctor Waiting'
                };
                _this.getBooking(filter);
                var targetIndex = _this.bookings.findIndex(function (data) { return data.bookingId == serverData.bookingId; });
                _this.bookings[targetIndex] = serverData;
                _this.appointService.bookings.next(_this.bookings);
                //this.bookings[this.bookings.indexOf(serverData.bookingId)] = serverData
            }
        });
    };
    //get Appointment
    NurseEntryComponent.prototype.getBooking = function (filter) {
        var _this = this;
        this.appointService.getAppointment(filter).subscribe(function (appoint) {
            _this.bookings = appoint;
            _this.dataSource = new table_1.MatTableDataSource(_this.bookings);
        });
    };
    NurseEntryComponent.prototype.getDoctor = function (id) {
        var _this = this;
        this.docService.getDoctor(id).subscribe({
            next: function (doctors) {
                _this.doctors = doctors;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    NurseEntryComponent.prototype.DocDisplayFn = function (item) {
        return item ? item.doctorName : '';
    };
    //filter data for autocomplete
    NurseEntryComponent.prototype._filterDoc = function (value) {
        var filterValue = value;
        this.getDoctor(value);
        if (value.doctorName != null) {
            filterValue = value.doctorName.toLowerCase();
        }
        else {
            filterValue = value.toLowerCase();
        }
        return this.doctors.filter(function (data) { return data.doctorName.toLowerCase().includes(filterValue); });
    };
    NurseEntryComponent.prototype.getNurse = function () {
        this.nurseService.getNurse().subscribe(function (data) {
            console.log(data);
        });
    };
    NurseEntryComponent.prototype.consultPatient = function (model) {
        var booking = model;
        booking.bStatus = booking.bstatus;
        this.appointService.updateAppointmentStatus(booking).subscribe({
            next: function (booking) {
                console.log("status changed");
            }, error: function (err) {
                console.trace(err);
            }
        });
    };
    NurseEntryComponent.prototype.searchBooking = function () {
        var _this = this;
        this.dialog.open(appointment_search_dialog_component_1.AppointmentSearchDialogComponent, {
            disableClose: true,
            width: '50%'
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result.dialogStatus) {
                result.status = "Doctor Waiting";
                _this.getBooking(result);
            }
        });
    };
    NurseEntryComponent.prototype.getDoctorData = function (event) {
        var doc = event.option.value;
        var filter = {
            fromDate: this.todayDate,
            toDate: this.todayDate,
            doctorId: doc.doctorId,
            regNo: '-',
            status: 'Doctor Waiting'
        };
        this.getBooking(filter);
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], NurseEntryComponent.prototype, "sort");
    NurseEntryComponent = __decorate([
        core_1.Component({
            selector: 'app-nurse-entry',
            templateUrl: './nurse-entry.component.html',
            styleUrls: ['./nurse-entry.component.css']
        })
    ], NurseEntryComponent);
    return NurseEntryComponent;
}());
exports.NurseEntryComponent = NurseEntryComponent;