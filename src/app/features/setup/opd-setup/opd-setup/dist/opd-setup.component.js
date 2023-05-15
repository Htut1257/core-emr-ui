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
var opd_group_component_1 = require("../../opd-group/opd-group/opd-group.component");
var checkbox_cell_1 = require("src/app/shared/cell-renderer/checkbox-cell");
var OpdSetupComponent = /** @class */ (function () {
    function OpdSetupComponent(opdService, commonService, toastService, dialog) {
        this.opdService = opdService;
        this.commonService = commonService;
        this.toastService = toastService;
        this.dialog = dialog;
        this.opdGroups = [];
        this.opdCategories = [];
        this.opdCategoryId = "-";
        this.opdServices = [];
        this.opdServiceId = "-";
        this.opdGroupControl = new forms_1.FormControl('');
        this.opdCategoryControl = new forms_1.FormControl('');
        this.opdServiceControl = new forms_1.FormControl('');
        this.opdType = '';
        this.frameworkComponentsCheckBox = {
            checkboxRenderer: checkbox_cell_1.CheckboxRenderer
        };
    }
    OpdSetupComponent.prototype.ngOnInit = function () {
        //
        this.autocompleteFilter();
        this.getOpdCategoryData();
        this.getOpdServiceData();
        this.initializeGridTable();
        this.getOpdGroup();
    };
    OpdSetupComponent.prototype.initializeGridTable = function () {
        var _this = this;
        this.opdCategoryGridOption = {
            columnDefs: this.opdCategoryColumnDef,
            rowData: this.opdCategoryRow,
            suppressScrollOnNewData: false,
            onGridReady: function (event) {
                this.opdCategoryApi = event.api;
                this.opdCategoryColumn = event.columnApi;
                this.opdCategoryApi.sizeColumnsToFit();
            },
            onCellClicked: function (event) {
                _this.getOpdServicesData(event);
            }
        };
        this.opdServiceGridOption = {
            columnDefs: this.opdServiceColumnDef,
            rowData: this.opdServiceRow,
            suppressScrollOnNewData: false
        };
    };
    OpdSetupComponent.prototype.onGridReadyOpdCategory = function (params) {
        console.log("on grid called");
        this.opdCategoryApi = params.api;
        this.opdCategoryColumn = params.columnApi;
        this.opdCategoryApi.sizeColumnsToFit();
    };
    OpdSetupComponent.prototype.getOpdCategoryData = function () {
        this.opdCategoryColumnDef = [
            {
                headerName: "Description",
                field: "catName",
                width: 100,
                editable: true
            },
        ];
        this.opdCategoryRow = [
            this.emptyOpdCategory()
        ];
    };
    OpdSetupComponent.prototype.onGridReadyOpdService = function (params) {
        this.opdServiceApi = params.api;
        this.opdServiceColumn = params.columnApi;
        this.opdServiceApi.sizeColumnsToFit();
    };
    OpdSetupComponent.prototype.getOpdServiceData = function () {
        this.opdServiceColumnDef = [
            {
                headerName: "Description",
                field: "serviceName",
                width: 170,
                editable: true
            },
            {
                headerName: "Fees",
                field: "",
                width: 70,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: "Srv Fee",
                field: "fees1",
                width: 80,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: "Mo Fee ",
                field: "fees2",
                width: 75,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: "Staff Fee",
                field: "fees3",
                width: 85,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: "Teach Fee",
                field: "fees4",
                width: 100,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: "Refer Fee",
                field: "fees6",
                width: 90,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: "Read Fee",
                field: "fees5",
                width: 90,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: "%",
                field: "percent",
                width: 50,
                cellRenderer: "checkboxRenderer"
            },
            {
                headerName: "CFS",
                field: "cfs",
                width: 65,
                cellRenderer: "checkboxRenderer"
            },
            {
                headerName: "Active",
                field: "status",
                width: 70,
                cellRenderer: "checkboxRenderer"
            },
            {
                headerName: "Doctor",
                field: "doctor",
                width: 100,
                editable: true
            },
            {
                headerName: "Cost",
                field: "serviceCost",
                width: 80,
                editable: true,
                type: 'rightAligned'
            },
        ];
        this.opdServiceRow = [
            this.emptyOpdServiceModel()
            // {
            //   serviceName: '', fees: 0, fees1: 0, fees2: 0, fees3: 0, fees4: 0, fees5: 0,
            //   percent: false, cfs: false, status: false, doctor: '', serviceCost: 0,
            // }
        ];
    };
    OpdSetupComponent.prototype.changedCell = function (event) {
        var columnField = event.colDef.field;
        var rowData = event.data;
        var row = event.rowIndex;
        var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
        var tableParams = {
            rowIndex: row,
            firstColumn: firstEditCol,
            gridApi: this.opdCategoryApi,
            rowObj: null
        };
        if (this.opdServiceApi.getFocusedCell()) {
            if (columnField == "status" || columnField == "cfs" || columnField == "percent") {
                tableParams = {
                    rowIndex: row,
                    firstColumn: firstEditCol,
                    gridApi: this.opdServiceApi,
                    rowObj: this.emptyOpdServiceModel()
                };
                this.onSaveOpdService(rowData, tableParams);
            }
        }
    };
    OpdSetupComponent.prototype.cellEditingStopped = function (event) {
        var columnField = event.colDef.field;
        var rowData = event.data;
        var row = event.rowIndex;
        var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
        var tableParams = {
            rowIndex: row,
            firstColumn: firstEditCol,
            gridApi: this.opdCategoryApi,
            rowObj: null
        };
        if (this.opdCategoryApi.getFocusedCell()) {
            tableParams = {
                rowIndex: row,
                firstColumn: firstEditCol,
                gridApi: this.opdCategoryApi,
                rowObj: this.emptyOpdCategory()
            };
            this.opdCategoryApi.setFocusedCell(event.rowIndex, event.colDef.field);
            if (columnField = "catName") {
                this.saveOpdCategory(rowData, tableParams);
            }
        }
        if (this.opdServiceApi.getFocusedCell()) {
            tableParams = {
                rowIndex: row,
                firstColumn: firstEditCol,
                gridApi: this.opdServiceApi,
                rowObj: this.emptyOpdServiceModel()
            };
            this.onSaveOpdService(rowData, tableParams);
        }
    };
    OpdSetupComponent.prototype.emptyOpdCategory = function () {
        return {
            catId: '',
            catName: '',
            groupId: '',
            migId: 0,
            opdAccCode: null,
            ipdAccCode: null,
            depCode: null,
            srvF1AccId: null,
            srvF2AccId: null,
            srvF3AccId: null,
            srvF4AccId: null,
            srvF5AccId: null,
            payableAccId: null,
            payableAccOpt: null,
            srvF2RefDr: null,
            srvF3RefDr: null,
            ipdDeptCode: null,
            userCode: null,
            expense: false,
            updateStatus: null,
            status: false
        };
    };
    OpdSetupComponent.prototype.emptyOpdServiceModel = function () {
        return {
            serviceId: null,
            serviceName: '',
            catId: '',
            fees: 0,
            fees1: 0,
            cfs: false,
            serviceCode: '',
            status: false,
            migId: 0,
            doctor: '',
            fees2: 0,
            fees3: 0,
            fees4: 0,
            fees5: 0,
            fees6: 0,
            percent: false,
            labGroupId: 0,
            labRemark: '',
            serviceCost: 0
        };
    };
    //filter for autocomplete
    OpdSetupComponent.prototype.autocompleteFilter = function () {
        var _this = this;
        this.filteredGroup = this.opdGroupControl.valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (value) { return (value ? _this._filterOpdGroup(value) : _this.opdGroups.slice()); }));
        this.filteredCategory = this.opdCategoryControl.valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (value) { return (value ? _this._filterOpdCategory(value) : _this.opdCategories.slice()); }));
        this.filteredService = this.opdServiceControl.valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (value) { return (value ? _this._filterOpdService(value) : _this.opdServices.slice()); }));
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
    //open dialog of opd group setup
    OpdSetupComponent.prototype.openOpdGroupDialog = function () {
        this.dialog.open(opd_group_component_1.OpdGroupComponent, {
            disableClose: false,
            width: '50%',
            height: '50%'
        });
    };
    //get selected data from autocomplete
    OpdSetupComponent.prototype.getOpdGroupData = function (event) {
        this.opdType = 'groupId';
        this.opdGroup = event.option.value;
        if (this.opdGroup) {
            this.opdServiceGridOption.api.setRowData([]);
            this.opdServiceApi.applyTransaction({
                add: [
                    this.emptyOpdServiceModel()
                ]
            });
            this.getOpdCategory(this.opdType, this.opdGroup.groupId);
        }
    };
    OpdSetupComponent.prototype.getOpdCategory = function (type, value) {
        var _this = this;
        this.opdService.getOpdCategorybyFilter(type, value).subscribe({
            next: function (opdCategory) {
                _this.opdCategories = opdCategory;
                _this.opdCategoryRow = _this.opdCategories;
                if (_this.opdCategoryRow.length < 1) {
                    _this.opdCategoryRow.push(_this.emptyOpdCategory());
                    _this.opdCategoryGridOption.api.setRowData(_this.opdCategoryRow);
                }
                else {
                    _this.opdCategoryGridOption.api.setRowData(_this.opdCategoryRow);
                    _this.opdCategoryApi.applyTransaction({
                        add: [
                            _this.emptyOpdCategory()
                        ]
                    });
                }
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    //filter data for autocomplete
    OpdSetupComponent.prototype._filterOpdCategory = function (value) {
        var filterValue = value;
        this.opdType = "catName";
        this.getOpdCategory(this.opdType, value);
        if (value.catName != null) {
            filterValue = value.catName.toLowerCase();
        }
        else {
            filterValue = value.toLowerCase();
        }
        return this.opdCategories.filter(function (data) { return data.catName.toLowerCase().includes(filterValue); });
    };
    OpdSetupComponent.prototype.opdCategoryDisplayFn = function (item) {
        return item ? item.catName : '';
    };
    OpdSetupComponent.prototype.getOpdService = function (type, value) {
        var _this = this;
        this.opdService.getOpdServicebyFilter(type, value).subscribe({
            next: function (opdServices) {
                console.log(opdServices);
                _this.opdServices = opdServices;
                _this.opdServiceRow = _this.opdServices;
                if (_this.opdServiceRow.length < 1) {
                    _this.opdServiceRow.push(_this.emptyOpdServiceModel());
                    _this.opdServiceGridOption.api.setRowData(_this.opdServiceRow);
                }
                else {
                    _this.opdServiceGridOption.api.setRowData(_this.opdServiceRow);
                    _this.opdServiceApi.applyTransaction({
                        add: [
                            _this.emptyOpdServiceModel()
                        ]
                    });
                }
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    //get selected data from Table cell
    OpdSetupComponent.prototype.getOpdServicesData = function (event) {
        this.opdType = 'catId';
        this.opdCategory = event.data;
        if (this.opdCategory) {
            this.getOpdService(this.opdType, this.opdCategory.catId);
        }
    };
    //filter data for autocomplete
    OpdSetupComponent.prototype._filterOpdService = function (value) {
        var filterValue = value;
        this.opdType = "serviceName";
        this.getOpdService(this.opdType, value);
        if (value.serviceName != null) {
            filterValue = value.serviceName.toLowerCase();
        }
        else {
            filterValue = value.toLowerCase();
        }
        return this.opdServices.filter(function (data) { return data.serviceName.toLowerCase().includes(filterValue); });
    };
    OpdSetupComponent.prototype.opdServiceDisplayFn = function (item) {
        return item ? item.catName : '';
    };
    OpdSetupComponent.prototype.saveTable = function (rowIndex, firstColumn, gridApi, rowObj) {
        var totalRow = gridApi.getDisplayedRowCount() - 1;
        if (totalRow == rowIndex) {
            gridApi.applyTransaction({
                add: [rowObj]
            });
            gridApi.ensureIndexVisible(0);
            gridApi.ensureColumnVisible(firstColumn);
            gridApi.setFocusedCell(rowIndex + 1, firstColumn);
        }
    };
    OpdSetupComponent.prototype.saveOpdCategory = function (data, TableParams) {
        var _this = this;
        data.groupId = this.opdGroup.groupId;
        this.opdService.saveOpdCategory(data).subscribe({
            next: function (opdCategory) {
                data.catId = opdCategory.catId;
                _this.opdCategories.push(opdCategory);
                _this.saveTable(TableParams.rowIndex, TableParams.firstColumn, TableParams.gridApi, TableParams.rowObj);
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    OpdSetupComponent.prototype.onSaveOpdService = function (data, TableParams) {
        var _this = this;
        if (!this.opdCategory) {
            this.toastService.showWarningToast("", "Please Select Opd Category");
            return;
        }
        console.log("before");
        console.log(data);
        data.catId = this.opdCategory.catId;
        this.opdService.saveOpdService(data).subscribe({
            next: function (opdService) {
                data.serviceId = opdService.serviceId;
                _this.opdServices.push(opdService);
                _this.saveTable(TableParams.rowIndex, TableParams.firstColumn, TableParams.gridApi, TableParams.rowObj);
            },
            error: function (err) {
                console.trace(err);
            }
        });
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
