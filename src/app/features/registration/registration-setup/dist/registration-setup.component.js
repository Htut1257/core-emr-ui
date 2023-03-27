"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegistrationSetupComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var moment = require("moment");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var core_2 = require("@angular/material/core");
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
var RegistrationSetupComponent = /** @class */ (function () {
    function RegistrationSetupComponent(route, patientService, docService, townService, appintService, formBuilder, dateAdapter) {
        this.route = route;
        this.patientService = patientService;
        this.docService = docService;
        this.townService = townService;
        this.appintService = appintService;
        this.formBuilder = formBuilder;
        this.dateAdapter = dateAdapter;
        this.doctors = [];
        this.towns = [];
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.dateAdapter.setLocale('en-GB');
    }
    RegistrationSetupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeForm();
        this.getTownship();
        if (this.appintService._booking != undefined) {
            this.booking = this.appintService._booking;
            console.log(this.booking);
            this.initializeFormData(this.booking);
        }
        this.filteredDoc = this.registrationForm.controls['doctor'].valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (name) { return (name ? _this._filterDoc(name) : _this.doctors.slice()); }));
        this.filteredTown = this.registrationForm.controls['township'].valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (name) { return (name ? _this._filterTown(name) : _this.towns.slice()); }));
    };
    //initialize form with interface model
    RegistrationSetupComponent.prototype.initializeForm = function () {
        this.registrationForm = this.formBuilder.group({
            regNo: [{ value: null, disabled: true }],
            regDate: [],
            dob: [null],
            sex: [''],
            fatherName: [''],
            nirc: [''],
            nationality: [''],
            religion: [''],
            doctor: [''],
            patientName: [''],
            address: [''],
            contactNo: [''],
            createdBy: [''],
            admissionNo: [''],
            age: [0],
            year: [0],
            month: [0],
            day: [0],
            township: [0],
            ptType: [''],
            otId: ['']
        });
        // fill the form with this data
        this.registrationForm.get('regDate').patchValue(this.todayDate);
        this.registrationForm.get('dob').patchValue(this.todayDate);
        //this.form.patchValue(this.myData);
    };
    RegistrationSetupComponent.prototype.initializeFormData = function (data) {
        this.registrationForm.get('regDate').patchValue(data.bkDate);
        this.registrationForm.get('patientName').patchValue(data.patientName);
        this.registrationForm.get('contactNo').patchValue(data.bkPhone);
    };
    RegistrationSetupComponent.prototype.getDoctor = function (id) {
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
    RegistrationSetupComponent.prototype.getTownship = function () {
        var _this = this;
        this.townService.getAllTownship().subscribe({
            next: function (towns) {
                _this.towns = towns;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    RegistrationSetupComponent.prototype.DocDisplayFn = function (item) {
        return item ? item.doctorName : '';
    };
    //compare Leave data with initial data
    RegistrationSetupComponent.prototype.compareDoctor = function (d1, d2) {
        return d1 && d2 ? d1.doctorId === d2.doctorId : d1 === d2;
    };
    RegistrationSetupComponent.prototype.TownDisplayFn = function (item) {
        return item ? item.townshipName : '';
    };
    //filter data for autocomplete
    RegistrationSetupComponent.prototype._filterDoc = function (value) {
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
    RegistrationSetupComponent.prototype._filterTown = function (value) {
        var filterValue = value;
        this.getDoctor(value);
        if (value.townshipName != null) {
            filterValue = value.townshipName.toLowerCase();
        }
        else {
            filterValue = value.toLowerCase();
        }
        return this.towns.filter(function (data) { return data.townshipName.toLowerCase().includes(filterValue); });
    };
    //save regis
    RegistrationSetupComponent.prototype.saveRegis = function (data) {
        var _this = this;
        var patient = data;
        patient.doctor = data.doctor.doctorId;
        patient.township = data.township.townshipId;
        patient.regDate = moment(data.regDate).format("yyyy-MM-DDTHH:mm:ss");
        patient.dob = moment(data.dob).format("yyyy-MM-DDTHH:mm:ss");
        patient.bookingId = this.booking != undefined ? this.booking.bookingId : null;
        console.log(patient);
        this.patientService.savePatient(patient).subscribe(function (data) {
            console.log("After Save" + JSON.stringify(data));
            _this.appintService._booking = undefined;
        });
    };
    RegistrationSetupComponent = __decorate([
        core_1.Component({
            selector: 'app-registration-setup',
            templateUrl: './registration-setup.component.html',
            styleUrls: ['./registration-setup.component.css'],
            providers: [
                { provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [core_2.MAT_DATE_LOCALE] },
                { provide: core_2.MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
            ]
        })
    ], RegistrationSetupComponent);
    return RegistrationSetupComponent;
}());
exports.RegistrationSetupComponent = RegistrationSetupComponent;
