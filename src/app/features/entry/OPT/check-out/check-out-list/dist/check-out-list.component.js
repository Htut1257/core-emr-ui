"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckOutListComponent = void 0;
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var appointment_search_dialog_component_1 = require("../../appointment/appointment-search-dialog/appointment-search-dialog.component");
var moment = require("moment");
var CheckOutListComponent = /** @class */ (function () {
    function CheckOutListComponent(route, serverService, appointService, checkService, commonService, dialog) {
        var _this = this;
        this.route = route;
        this.serverService = serverService;
        this.appointService = appointService;
        this.checkService = checkService;
        this.commonService = commonService;
        this.dialog = dialog;
        this.bookings = [];
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.isMobile = false;
        this.displayedColumns = ["reg", "adm", "name", "date"];
        this.commonService.isMobile$.subscribe(function (data) {
            _this.isMobile = data;
        });
    }
    CheckOutListComponent.prototype.ngOnInit = function () {
        var filter = {
            fromDate: this.todayDate,
            toDate: this.todayDate,
            doctorId: '-',
            regNo: '-',
            status: 'Billing'
        };
        this.getBooking(filter);
        this.getServerSideData();
    };
    CheckOutListComponent.prototype.getServerSideData = function () {
        var uri = '/opdBooking/getMessage';
        this.serverService.getServerSource(uri).subscribe(function (data) {
            var serverData = JSON.parse(data.data);
            console.log(serverData);
        });
    };
    //get Appointment
    CheckOutListComponent.prototype.getBooking = function (filter) {
        var _this = this;
        this.appointService.getAppointment(filter).subscribe(function (appoint) {
            _this.bookings = appoint;
            _this.dataSource = new table_1.MatTableDataSource(_this.bookings);
            _this.filterBooking();
            _this.sortBooking();
        });
    };
    CheckOutListComponent.prototype.filterBooking = function () {
        this.dataSource.filterPredicate = function (data, filter) {
            return data.bookingId.toString().toLowerCase().includes(filter) ||
                // data.regNo.toLowerCase().includes(filter) ||
                data.doctorName.toLowerCase().includes(filter) ||
                data.patientName.toLowerCase().includes(filter);
        };
    };
    CheckOutListComponent.prototype.sortBooking = function () {
        this.dataSource.sortingDataAccessor = function (item, property) {
            console.log(property);
            switch (property) {
                case 'name': return item.patientName;
            }
        };
        this.dataSource.sort = this.sort;
    };
    CheckOutListComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    //get all checkout
    CheckOutListComponent.prototype.getCheckOut = function (id) {
        var _this = this;
        return this.checkService.getCheckoutByVisitId(id).subscribe({
            next: function (checkOut) {
                _this.checkService._checkOut = checkOut;
                if (_this.isMobile) {
                    _this.commonService.getCurrentObject(true);
                    _this.route.navigate(['/main/opd/check-out/voucher']);
                }
                else {
                    _this.commonService.getCurrentObject(false);
                }
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    CheckOutListComponent.prototype.getRowData = function (data) {
        this.booking = data;
        if (this.booking) {
            this.getCheckOut(this.booking.bookingId);
        }
        // if (this.isMobile) {
        //   this.commonService.getCurrentObject(true)
        //   this.route.navigate(['/main/opd/check-out/voucher'])
        // }else{
        //   this.commonService.getCurrentObject(false)
        // }
    };
    CheckOutListComponent.prototype.searchBooking = function () {
        var _this = this;
        this.dialog.open(appointment_search_dialog_component_1.AppointmentSearchDialogComponent, {
            disableClose: true,
            width: '40%',
            data: {
                'title': 'Check Out Search',
                'status': '-'
            }
        })
            .afterClosed()
            .subscribe(function (result) {
            if (result.dialogStatus) {
                _this.getBooking(result);
            }
        });
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], CheckOutListComponent.prototype, "sort");
    CheckOutListComponent = __decorate([
        core_1.Component({
            selector: 'app-check-out-list',
            templateUrl: './check-out-list.component.html',
            styleUrls: ['./check-out-list.component.css']
        })
    ], CheckOutListComponent);
    return CheckOutListComponent;
}());
exports.CheckOutListComponent = CheckOutListComponent;
