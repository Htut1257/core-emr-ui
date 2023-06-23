"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppointmentModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var common_modules_module_1 = require("src/app/shared/common-modules/common-modules.module");
var appointment_registration_component_1 = require("./appointment-registration/appointment-registration.component");
var appointment_routing_module_1 = require("./appointment-routing.module");
var appointment_history_component_1 = require("./appointment-history/appointment-history.component");
var appointment_component_1 = require("./appointment/appointment.component");
var appointment_search_dialog_component_1 = require("./appointment-search-dialog/appointment-search-dialog.component");
var appointment_patient_dialog_component_1 = require("./appointment-patient-dialog/appointment-patient-dialog.component");
var appointment_status_component_1 = require("./appointment-status/appointment-status.component");
var booking_status_pipe_1 = require("src/app/shared/pipe/booking-status.pipe");
var components = [
    appointment_component_1.AppointmentComponent,
    appointment_registration_component_1.AppointmentRegistrationComponent,
    appointment_history_component_1.AppointmentHistoryComponent,
    appointment_status_component_1.AppointmentStatusComponent,
];
var AppointmentModule = /** @class */ (function () {
    function AppointmentModule() {
    }
    AppointmentModule = __decorate([
        core_1.NgModule({
            declarations: [
                components,
                appointment_search_dialog_component_1.AppointmentSearchDialogComponent,
                appointment_patient_dialog_component_1.AppointmentPatientDialogComponent,
                booking_status_pipe_1.BookingStatus,
            ],
            imports: [
                common_1.CommonModule,
                common_modules_module_1.CommonModulesModule,
                appointment_routing_module_1.AppointmentRoutingModule
            ],
            exports: [
                components
            ]
        })
    ], AppointmentModule);
    return AppointmentModule;
}());
exports.AppointmentModule = AppointmentModule;
