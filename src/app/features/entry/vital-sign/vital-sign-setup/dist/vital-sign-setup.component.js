"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VitalSignSetupComponent = void 0;
var core_1 = require("@angular/core");
var VitalSignSetupComponent = /** @class */ (function () {
    function VitalSignSetupComponent(route, vitalService, appointService, commonService, formBuilder) {
        var _this = this;
        this.route = route;
        this.vitalService = vitalService;
        this.appointService = appointService;
        this.commonService = commonService;
        this.formBuilder = formBuilder;
        this.isLoading = false;
        this.commonService.isMobileObj$.subscribe(function (data) {
            if (data == false) {
                console.log(data);
                console.log(_this.appointService._booking);
                if (_this.appointService._booking != undefined) {
                    _this.booking = _this.appointService._booking;
                    _this.initializeFormData(_this.booking);
                }
            }
        });
    }
    VitalSignSetupComponent.prototype.ngOnInit = function () {
        this.initializeForm();
    };
    VitalSignSetupComponent.prototype.initializeForm = function () {
        this.vitalForm = this.formBuilder.group({
            bookingId: [{ value: null, disabled: true }],
            regNo: [{ value: null, disabled: true }],
            nurseRemark: [''],
            temperature: [''],
            tempUnit: [''],
            plus: [''],
            respiratory: [''],
            bpUpper: [''],
            bpLower: [''],
            oxygenStatus: [''],
            oxygenRate: [''],
            oxygenConcentration: [''],
            oxygenMethod: [''],
            glucometer: [''],
            glucoUnit: [''],
            weight: [''],
            weightUnit: [''],
            height: [''],
            heightUnit: [''],
            bmi: ['']
        });
    };
    VitalSignSetupComponent.prototype.initializeFormData = function (data) {
        this.vitalForm.get('bookingId').patchValue(data.bookingId);
        this.vitalForm.get('regNo').patchValue(data.regNo);
    };
    VitalSignSetupComponent.prototype.onSaveVital = function (data) {
        var _this = this;
        var Vital = data;
        var booking = this.booking;
        booking.bStatus = booking.bstatus;
        Vital.regNo = this.vitalForm.get('regNo').value;
        Vital.bookingId = this.vitalForm.get('bookingId').value;
        this.vitalService.saveVitalSign(Vital).subscribe({
            next: function (vital) {
                console.log("vital saved");
                console.log(vital);
                _this.appointService.updateAppointmentStatus(booking).subscribe({
                    next: function (booking) {
                        console.log("status changed");
                        console.log(booking);
                    }, error: function (err) {
                        console.trace(err);
                    }
                });
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    VitalSignSetupComponent.prototype.onNew = function () {
    };
    VitalSignSetupComponent.prototype.onBackToList = function () {
    };
    VitalSignSetupComponent.prototype.onClear = function () {
        this.isLoading = false;
        this.clearForm();
    };
    VitalSignSetupComponent.prototype.clearForm = function () {
        this.vitalForm.reset();
        this.reactiveForm.resetForm();
    };
    VitalSignSetupComponent.prototype.focusElement = function (eleString, nextString, type) {
        var _a;
        if (type == "autocomplete") {
            if (this.vitalForm.controls['' + eleString + ''].value == null) {
                return;
            }
        }
        if (type == "option") {
            if (this.vitalForm.controls['' + eleString + ''].value == null) {
                return;
            }
        }
        (_a = document.querySelector("#" + nextString)) === null || _a === void 0 ? void 0 : _a.focus();
    };
    //handle event from submitting
    VitalSignSetupComponent.prototype.handleEnter = function (event) {
        var tagname = event.srcElement.id;
        if (tagname !== 'btnSave') {
            return false;
        }
        return true;
    };
    __decorate([
        core_1.ViewChild('reactiveForm', { static: true })
    ], VitalSignSetupComponent.prototype, "reactiveForm");
    VitalSignSetupComponent = __decorate([
        core_1.Component({
            selector: 'app-vital-sign-setup',
            templateUrl: './vital-sign-setup.component.html',
            styleUrls: ['./vital-sign-setup.component.css']
        })
    ], VitalSignSetupComponent);
    return VitalSignSetupComponent;
}());
exports.VitalSignSetupComponent = VitalSignSetupComponent;
