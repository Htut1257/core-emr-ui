"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DoctorListComponent = void 0;
var core_1 = require("@angular/core");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var DoctorListComponent = /** @class */ (function () {
    function DoctorListComponent(route, doctorService, commonService, toastService) {
        var _this = this;
        this.route = route;
        this.doctorService = doctorService;
        this.commonService = commonService;
        this.toastService = toastService;
        this.doctors = [];
        this.displayedColumn = ["position", "name", "nrc", "gender"];
        this.isMobile = false;
        this.isSelected = false;
        this.dataSource = new table_1.MatTableDataSource(this.doctors);
        this.doctorService.doctor$.subscribe(function (data) {
            _this.dataSource.data = data;
        });
        this.commonService.isMobile$.subscribe(function (data) {
            _this.isMobile = data;
        });
    }
    DoctorListComponent.prototype.ngOnInit = function () {
        this.getAllDoctor();
    };
    DoctorListComponent.prototype.getAllDoctor = function () {
        var _this = this;
        this.doctorService.getDoctor().subscribe({
            next: function (doctors) {
                _this.doctors = doctors;
                _this.dataSource.data = _this.doctors;
                _this.filterDctor();
                _this.sortDctor();
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DoctorListComponent.prototype.filterDctor = function () {
        this.dataSource.filterPredicate = function (data, filter) {
            return data.doctorName.toLowerCase().includes(filter);
            //data.bookingId.toString().toLowerCase().includes(filter) ||
            // data.regNo.toLowerCase().includes(filter) ||
            //data.patientName.toLowerCase().includes(filter);
        };
    };
    DoctorListComponent.prototype.sortDctor = function () {
        this.dataSource.sortingDataAccessor = function (item, property) {
            switch (property) {
                case 'name': return item.doctorName;
            }
        };
        this.dataSource.sort = this.sort;
    };
    DoctorListComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    DoctorListComponent.prototype.getselectedRowData = function (data) {
        this.dataSource.data = this.dataSource.data.map(function (item) {
            item.isSelected = false;
            return item;
        });
        this.doctorService._doctor = data;
        data.isSelected = !data.isSelected;
        if (this.isMobile) {
            this.commonService.getCurrentObject(true);
        }
        else {
            this.commonService.getCurrentObject(false);
        }
    };
    DoctorListComponent.prototype.getRowData = function (data) {
        this.doctorService._doctor = data;
        if (this.isMobile) {
            this.commonService.getCurrentObject(true);
        }
        else {
            this.commonService.getCurrentObject(false);
        }
    };
    __decorate([
        core_1.ViewChild(sort_1.MatSort, { static: true })
    ], DoctorListComponent.prototype, "sort");
    DoctorListComponent = __decorate([
        core_1.Component({
            selector: 'app-doctor-list',
            templateUrl: './doctor-list.component.html',
            styleUrls: ['./doctor-list.component.css']
        })
    ], DoctorListComponent);
    return DoctorListComponent;
}());
exports.DoctorListComponent = DoctorListComponent;
