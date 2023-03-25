"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppointmentSearchDialogComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var core_2 = require("@angular/material/core");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var moment = require("moment");
var MY_DATE_FORMAT = {
    parse: {
        dateInput: 'DD/MM/YYYY'
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
var AppointmentSearchDialogComponent = /** @class */ (function () {
    function AppointmentSearchDialogComponent(appointService, doctorService, formBuilder, dateAdapter, dialogRef) {
        this.appointService = appointService;
        this.doctorService = doctorService;
        this.formBuilder = formBuilder;
        this.dateAdapter = dateAdapter;
        this.dialogRef = dialogRef;
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.dateAdapter.setLocale('en-GB');
        this.doctors = [];
    }
    AppointmentSearchDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeForm();
        this.filteredDoc = this.appointForm.controls['doctor'].valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (name) { return (name ? _this._filterDoc(name) : _this.doctors.slice()); }));
    };
    AppointmentSearchDialogComponent.prototype.initializeForm = function () {
        this.appointForm = this.formBuilder.group({
            fromDate: [''],
            toDate: [''],
            doctor: ['-'],
            regNo: ['-']
        });
        this.appointForm.get('fromDate').patchValue(this.todayDate);
        this.appointForm.get('toDate').patchValue(this.todayDate);
    };
    AppointmentSearchDialogComponent.prototype.getDoctor = function (name) {
        var _this = this;
        this.doctorService.getDoctor(name).subscribe({
            next: function (doctors) {
                _this.doctors = doctors;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    //filter data for autocomplete
    AppointmentSearchDialogComponent.prototype._filterDoc = function (value) {
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
    AppointmentSearchDialogComponent.prototype.DocDisplayFn = function (item) {
        return item ? item.doctorName : '';
    };
    AppointmentSearchDialogComponent.prototype.searchAppointment = function (data) {
        var filter = data;
        filter.fromDate = moment(data.fromDate).format("yyyy-MM-DD");
        filter.toDate = moment(data.toDate).format("yyyy-MM-DD");
        filter.doctorId = filter.doctor != '-' ? filter.doctor.doctorId : '-';
        filter.status = '-';
        filter.dialogStatus = true;
        this.dialogRef.close(filter);
    };
    AppointmentSearchDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-appointment-search-dialog',
            templateUrl: './appointment-search-dialog.component.html',
            styleUrls: ['./appointment-search-dialog.component.css'],
            providers: [
                { provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [core_2.MAT_DATE_LOCALE] },
                { provide: core_2.MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
            ]
        })
    ], AppointmentSearchDialogComponent);
    return AppointmentSearchDialogComponent;
}());
exports.AppointmentSearchDialogComponent = AppointmentSearchDialogComponent;
