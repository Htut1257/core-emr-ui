"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpdSetupComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var OpdSetupComponent = /** @class */ (function () {
    function OpdSetupComponent(opdService, commonService, toastService) {
        this.opdService = opdService;
        this.commonService = commonService;
        this.toastService = toastService;
        this.opdGroups = [];
        this.opdCategory = [];
        this.opdGroupControl = new forms_1.FormControl('');
    }
    OpdSetupComponent.prototype.ngOnInit = function () {
        this.getOpdGroup();
        this.autocompleteFilter();
        this.getOpdCategoryData();
        this.initializeGridTable();
    };
    OpdSetupComponent.prototype.initializeGridTable = function () {
        this.opdCategoryGridOption = {
            columnDefs: this.opdCategoryColumnDef,
            rowData: this.opdCategoryRow,
            suppressScrollOnNewData: false
        };
    };
    OpdSetupComponent.prototype.onGridReadyOpdCategory = function (params) {
        this.opdCategoryApi = params.api;
        this.opdCategoryColumn = params.columnApi;
        this.opdCategoryApi.sizeColumnsToFit();
    };
    OpdSetupComponent.prototype.getOpdCategoryData = function () {
        this.opdCategoryColumnDef = [
            {
                headerName: "Description",
                field: "cat_name",
                width: 100,
                editable: true
            },
        ];
        this.opdCategoryRow = [
            { description: '' }
        ];
    };
    OpdSetupComponent.prototype.cellEditingStopped = function (event) {
    };
    OpdSetupComponent.prototype.autocompleteFilter = function () {
        var _this = this;
        this.filteredGroup = this.opdGroupControl.valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (value) { return (value ? _this._filterOpdGroup(value) : _this.opdGroups.slice()); }));
    };
    OpdSetupComponent.prototype.getOpdGroup = function () {
        var _this = this;
        this.opdService.getOpdGroup().subscribe({
            next: function (opdGroups) {
                _this.opdGroups = opdGroups;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    OpdSetupComponent.prototype.opdGroupDisplayFn = function (item) {
        return item ? item.groupName : '';
    };
    //filter data for autocomplete
    OpdSetupComponent.prototype._filterOpdGroup = function (value) {
        var filterValue = value;
        if (value.groupName != null) {
            filterValue = value.groupName.toLowerCase();
        }
        else {
            filterValue = value.toLowerCase();
        }
        return this.opdGroups.filter(function (data) { return data.groupName.toLowerCase().includes(filterValue); });
    };
    OpdSetupComponent.prototype.getOpdCategory = function () {
        var _this = this;
        this.opdService.getOpdCategory().subscribe({
            next: function (opdCategory) {
                _this.opdCategory = opdCategory;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    //get selected data from autocomplete
    OpdSetupComponent.prototype.getopdGroupData = function (event) {
        this.opdGroup = event.option.value;
        console.log(this.opdGroup);
    };
    OpdSetupComponent.prototype.saveOpdCategory = function () {
    };
    OpdSetupComponent = __decorate([
        core_1.Component({
            selector: 'app-opd-setup',
            templateUrl: './opd-setup.component.html',
            styleUrls: ['./opd-setup.component.css']
        })
    ], OpdSetupComponent);
    return OpdSetupComponent;
}());
exports.OpdSetupComponent = OpdSetupComponent;
