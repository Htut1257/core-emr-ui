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
var forms_1 = require("@angular/forms");
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
    function RegistrationSetupComponent(route, patientService, docService, townService, appintService, commonService, toastService, genderService, formBuilder, dateAdapter) {
        this.route = route;
        this.patientService = patientService;
        this.docService = docService;
        this.townService = townService;
        this.appintService = appintService;
        this.commonService = commonService;
        this.toastService = toastService;
        this.genderService = genderService;
        this.formBuilder = formBuilder;
        this.dateAdapter = dateAdapter;
        this.doctors = [];
        this.towns = [];
        this.gender = [];
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.todayYear = moment(new Date(), 'MM/DD/YYYY').format('YYYY');
        this.isLoading = false;
        this.regNo = null;
        this.dateAdapter.setLocale('en-GB');
    }
    RegistrationSetupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeForm();
        this.getTownship();
        this.getGender();
        if (this.appintService._booking != undefined) {
            this.booking = this.appintService._booking;
            this.initializeFormData(this.booking);
        }
        this.filteredDoc = this.registrationForm.controls['doctor'].valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (name) { return (name ? _this._filterDoc(name) : _this.doctors.slice()); }));
        this.filteredTown = this.registrationForm.controls['township'].valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (name) { return (name ? _this._filterTown(name) : _this.towns.slice()); }));
    };
    //initialize form with interface model
    RegistrationSetupComponent.prototype.initializeForm = function () {
        this.registrationForm = this.formBuilder.group({
            regNo: [{ value: null, disabled: true }],
            regDate: [null, forms_1.Validators.required],
            dob: [null],
            sex: [null, forms_1.Validators.required],
            fatherName: [''],
            nirc: [''],
            nationality: [''],
            religion: [''],
            doctor: [null, forms_1.Validators.required],
            patientName: ['', forms_1.Validators.required],
            address: [''],
            contactNo: [''],
            createdBy: [''],
            admissionNo: [''],
            age: [0],
            year: [0],
            month: [0],
            day: [0],
            township: [null, forms_1.Validators.required],
            ptType: [''],
            otId: ['']
        });
        // fill the form with this data
        this.registrationForm.get('regDate').patchValue(this.todayDate);
        this.registrationForm.get('dob').patchValue(this.todayDate);
    };
    RegistrationSetupComponent.prototype.initializeFormData = function (data) {
        this.regNo = data.regNo;
        this.registrationForm.get('regNo').patchValue(data.regNo);
        this.registrationForm.get('regDate').patchValue(data.bkDate);
        this.registrationForm.get('patientName').patchValue(data.patientName);
        this.registrationForm.get('contactNo').patchValue(data.bkPhone);
        var doc = {
            doctorId: data.doctorId,
            doctorName: data.doctorName
        };
        this.registrationForm.get('doctor').patchValue(doc);
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
    RegistrationSetupComponent.prototype.getGender = function () {
        var _this = this;
        this.genderService.getGender().subscribe({
            next: function (data) {
                _this.gender = data;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    RegistrationSetupComponent.prototype.DocDisplayFn = function (item) {
        return item ? item.doctorName : '';
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
    RegistrationSetupComponent.prototype.changed = function () {
        console.log("changed");
    };
    //filter data for autocomplete
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
        console.log(data);
        var patient = data;
        patient.regNo = this.regNo;
        patient.sex = data.sex.genderId;
        patient.doctor = data.doctor.doctorId;
        patient.township = data.township.townshipId;
        patient.regDate = moment(data.regDate).format("yyyy-MM-DDTHH:mm:ss");
        patient.dob = moment(data.dob).format("yyyy-MM-DDTHH:mm:ss");
        patient.bookingId = this.booking != undefined ? this.booking.bookingId : null;
        console.log(patient);
        this.patientService.savePatient(patient).subscribe({
            next: function (registration) {
                _this.toastService.showSuccessToast("Registrations", "Success adding new Registration");
                _this.appintService._booking = undefined;
                _this.onClear();
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    RegistrationSetupComponent.prototype.onNew = function () {
    };
    RegistrationSetupComponent.prototype.onBacktoList = function () {
        this.appintService._booking = undefined;
        this.route.navigate(['/main/opd/appointment']);
        this.commonService.getTitle("Appiontment");
    };
    RegistrationSetupComponent.prototype.onClear = function () {
        this.isLoading = false;
        this.clearForm();
    };
    RegistrationSetupComponent.prototype.clearForm = function () {
        this.registrationForm.reset();
        this.reactiveForm.resetForm();
        this.registrationForm.get('regDate').patchValue(this.todayDate);
        this.registrationForm.get('dob').patchValue(this.todayDate);
    };
    RegistrationSetupComponent.prototype.focusElement = function (eleString, nextString, type) {
        var _a;
        if (type == "autocomplete") {
            if (this.registrationForm.controls['' + eleString + ''].value == null) {
                return;
            }
        }
        if (type == "option") {
            if (this.registrationForm.controls['' + eleString + ''].value == null) {
                return;
            }
        }
        if (eleString == "year") {
            var patientYear = this.registrationForm.controls['' + eleString + ''].value;
            patientYear = parseInt(this.todayYear) - patientYear;
            patientYear = moment('01/01/' + patientYear, 'MM/DD/YYYY').format('YYYY-MM-DD');
            this.registrationForm.get('dob').patchValue(patientYear);
        }
        (_a = document.querySelector("#" + nextString)) === null || _a === void 0 ? void 0 : _a.focus();
    };
    //handle event from submitting
    RegistrationSetupComponent.prototype.handleEnter = function (event) {
        var tagname = event.srcElement.id;
        if (tagname !== 'btnSave') {
            return false;
        }
        return true;
    };
    __decorate([
        core_1.ViewChild('reactiveForm', { static: true })
    ], RegistrationSetupComponent.prototype, "reactiveForm");
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
