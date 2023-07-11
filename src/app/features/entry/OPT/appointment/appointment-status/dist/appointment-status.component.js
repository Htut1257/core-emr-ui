"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppointmentStatusComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var moment = require("moment");
var AppointmentStatusComponent = /** @class */ (function () {
    function AppointmentStatusComponent(appointService, serverService) {
        this.appointService = appointService;
        this.serverService = serverService;
        this.docBookings = [];
        this.displayedColumn = ["position", "doctor", "schedule", "status1", "status2", "status3", "status4",
            "status5", "status6", "status7", "status8", "status9", "status10"];
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
    }
    AppointmentStatusComponent.prototype.ngOnInit = function () {
        this.getDoctorBookingStatus('-', '2023-07-03');
        //this.getServerSideData()
    };
    AppointmentStatusComponent.prototype.getServerSideData = function () {
        var uri = '/opdBooking/getMessage';
        // this.serverService.getServerSource(uri).subscribe(data => {
        //   let serverData = JSON.parse(data.data)
        //   console.log(serverData)
        //   this.getDoctorBookingStatus('-', '2023-07-03')
        // })
    };
    AppointmentStatusComponent.prototype.getDoctorBookingStatus = function (id, date) {
        var _this = this;
        this.dataSource = new table_1.MatTableDataSource(this.docBookings);
        this.appointService.getDoctorBookingStatus(id, date).subscribe({
            next: function (docBookings) {
                console.log(docBookings);
                _this.docBookings = docBookings;
                _this.dataSource.data = _this.docBookings;
            }
        });
    };
    AppointmentStatusComponent = __decorate([
        core_1.Component({
            selector: 'app-appointment-status',
            templateUrl: './appointment-status.component.html',
            styleUrls: ['./appointment-status.component.css']
        })
    ], AppointmentStatusComponent);
    return AppointmentStatusComponent;
}());
exports.AppointmentStatusComponent = AppointmentStatusComponent;
