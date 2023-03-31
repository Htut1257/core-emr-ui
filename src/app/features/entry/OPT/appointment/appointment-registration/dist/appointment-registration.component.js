"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppointmentRegistrationComponent = void 0;
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
var AppointmentRegistrationComponent = /** @class */ (function () {
    function AppointmentRegistrationComponent(appointService, patientService, docService, genderService, toastService, dateAdapter, fb) {
        this.appointService = appointService;
        this.patientService = patientService;
        this.docService = docService;
        this.genderService = genderService;
        this.toastService = toastService;
        this.dateAdapter = dateAdapter;
        this.fb = fb;
        this.doctors = [];
        this.patient = [];
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.isLoading = false;
        this.dateAdapter.setLocale('en-GB');
    }
    AppointmentRegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.getGender();
        this.initializeForm();
        this.filteredDoc = this.appointForm.controls['doctor'].valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (name) { return (name ? _this._filterDoc(name) : _this.doctors.slice()); }));
        this.filteredPatient = this.appointForm.controls['patient'].valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (name) { return (name ? _this._filterPatient(name) : _this.patient.slice()); }));
    };
    AppointmentRegistrationComponent.prototype.initializeForm = function () {
        this.appointForm = this.fb.group({
            regNo: [null],
            bkDate: ['', forms_1.Validators.required],
            patient: ['', forms_1.Validators.required],
            doctor: [null, forms_1.Validators.required],
            bkPhone: ['']
        });
        this.appointForm.get('bkDate').patchValue(this.todayDate);
    };
    AppointmentRegistrationComponent.prototype.getDoctor = function (id) {
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
    AppointmentRegistrationComponent.prototype.DocDisplayFn = function (item) {
        return item ? item.doctorName : '';
    };
    //filter data for autocomplete
    AppointmentRegistrationComponent.prototype._filterDoc = function (value) {
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
    AppointmentRegistrationComponent.prototype.getPatient = function (name) {
        var _this = this;
        this.patientService.getPatientByName(name).subscribe({
            next: function (data) {
                _this.patient = data;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    AppointmentRegistrationComponent.prototype.patientDisplayFn = function (item) {
        return item ? item.patientName : '';
    };
    //filter data for autocomplete
    AppointmentRegistrationComponent.prototype._filterPatient = function (value) {
        var filterValue = value;
        this.getPatient(value);
        if (value.patientName != null) {
            filterValue = value.patientName.toLowerCase();
        }
        else {
            filterValue = value.toLowerCase();
        }
        return this.patient.filter(function (data) { return data.patientName.toLowerCase().includes(filterValue); });
    };
    AppointmentRegistrationComponent.prototype.getGender = function () {
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
    //compare bonus data with initial data
    AppointmentRegistrationComponent.prototype.compareGender = function (b1, b2) {
        return b1 && b2 ? b1.genderId === b2.genderId : b1 === b2;
    };
    AppointmentRegistrationComponent.prototype.saveAppointment = function (data) {
        var _this = this;
        var booking = data;
        booking.patientName = data.patient.patientName != undefined ? data.patient.patientName : data.patient;
        booking.doctorId = data.doctor.doctorId;
        booking.bkDate = moment(data.bkDate).format("yyyy-MM-DD");
        this.appointService.saveAppointment(booking).subscribe(function (data) {
            _this.toastService.showSuccessToast("", "Success Adding new Appointment");
            _this.onClear();
        });
    };
    AppointmentRegistrationComponent.prototype.onNew = function () {
    };
    //called on patient change autocomplete
    AppointmentRegistrationComponent.prototype.getpatientData = function (event) {
        var patient = event.option.value;
        this.appointForm.get('regNo').patchValue(patient.regNo);
    };
    AppointmentRegistrationComponent.prototype.onBacktoList = function () {
    };
    AppointmentRegistrationComponent.prototype.onClear = function () {
        this.isLoading = false;
        this.clearForm();
    };
    AppointmentRegistrationComponent.prototype.clearForm = function () {
        this.appointForm.reset();
        this.reactiveForm.resetForm();
        this.appointForm.get('bkDate').patchValue(this.todayDate);
    };
    AppointmentRegistrationComponent.prototype.focusElement = function (eleString, nextString, type) {
        var _a;
        if (type == "autocomplete") {
            if (this.appointForm.controls['' + eleString + ''].value == null) {
                return;
            }
        }
        if (type == "option") {
            if (this.appointForm.controls['' + eleString + ''].value == null) {
                return;
            }
        }
        (_a = document.querySelector("#" + nextString)) === null || _a === void 0 ? void 0 : _a.focus();
    };
    //handle event from submitting
    AppointmentRegistrationComponent.prototype.handleEnter = function (event) {
        var tagname = event.srcElement.id;
        if (tagname !== 'btnSave') {
            return false;
        }
        return true;
    };
    __decorate([
        core_1.ViewChild('reactiveForm', { static: true })
    ], AppointmentRegistrationComponent.prototype, "reactiveForm");
    AppointmentRegistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-appointment-registration',
            templateUrl: './appointment-registration.component.html',
            styleUrls: ['./appointment-registration.component.css'],
            providers: [
                { provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [core_2.MAT_DATE_LOCALE] },
                { provide: core_2.MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
            ]
        })
    ], AppointmentRegistrationComponent);
    return AppointmentRegistrationComponent;
}());
exports.AppointmentRegistrationComponent = AppointmentRegistrationComponent;
