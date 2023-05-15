"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AutocompleteCell = void 0;
var core_1 = require("@angular/core");
var AutocompleteCell = /** @class */ (function () {
    function AutocompleteCell(autoService, patternService) {
        this.autoService = autoService;
        this.patternService = patternService;
        this.rowSelection = 'single';
        this.gridHeight = 175;
        this.gridWidth = 500;
        this.isCanceled = true;
        this.selectedObject = {};
    }
    AutocompleteCell.prototype.ngAfterViewInit = function () {
        var _this = this;
        window.setTimeout(function () {
            if (_this.inputValue == _this.cellValue) {
                _this.input.nativeElement.select();
            }
            else {
                _this.input.nativeElement.focus();
            }
            if (_this.inputValue && !_this.useApi)
                _this.updateFilter();
        });
    };
    // ICellEditorAngularComp functions
    AutocompleteCell.prototype.agInit = function (params) {
        this.params = params;
        //to get witch field to use
        //   console.log(params)
        this.columnObject = params.colDef.field;
        if (!params.rowData) {
            this.apiEndpoint = params.apiEndpoint;
            this.useApi = true;
            this.rowData = [{}];
        }
        else {
            this.rowData = params.rowData;
        }
        if (params.gridHeight)
            this.gridHeight = params.gridHeight;
        if (params.gridWidth)
            this.gridWidth = params.gridWidth;
        this.columnDefs = params.columnDefs;
        this.propertyName = params.propertyRendered;
        if (this.columnObject == "patternObj") {
            this.gridWidth = 200;
        }
        else if (this.columnObject == "examinationObj") {
            this.gridWidth = 300;
        }
        this.cellValue = params.value[this.propertyName];
        this.returnObject = params.returnObject;
        if (!params.charPress) {
            if (this.cellValue)
                this.inputValue = this.cellValue;
        }
        else {
            this.inputValue = params.charPress;
        }
    };
    AutocompleteCell.prototype.getValue = function () {
        if (!this.returnObject)
            return this.selectedObject[this.propertyName];
        return this.selectedObject;
    };
    AutocompleteCell.prototype.isPopup = function () {
        return true;
    };
    AutocompleteCell.prototype.isCancelAfterEnd = function () {
        return this.isCanceled;
    };
    // ag-Grid functions
    AutocompleteCell.prototype.onGridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.columnFilter = this.gridApi.getFilterInstance(this.propertyName);
    };
    // component functions
    AutocompleteCell.prototype.rowClicked = function (params) {
        this.selectedObject = params.data;
        this.isCanceled = false;
        this.params.api.stopEditing();
    };
    AutocompleteCell.prototype.rowConfirmed = function () {
        if (this.gridApi.getSelectedRows()[0]) {
            this.selectedObject = this.gridApi.getSelectedRows()[0];
            this.isCanceled = false;
        }
        this.params.api.stopEditing();
    };
    AutocompleteCell.prototype.onKeydown = function (event) {
        var _a;
        event.stopPropagation();
        if (event.keyCode >= 66 && event.keyCode <= 90 || event.key == "Backspace") {
            (_a = document.querySelector("#autoText")) === null || _a === void 0 ? void 0 : _a.focus();
        }
        if (event.key == "Escape") {
            this.params.api.stopEditing();
            return false;
        }
        if (event.key == "Enter" || event.key == "Tab") {
            this.rowConfirmed();
            return false;
        }
        if (event.key == "ArrowUp" || event.key == "ArrowDown") {
            this.navigateGrid();
            return false;
        }
        return true;
    };
    AutocompleteCell.prototype.processDataInput = function (event) {
        var _this = this;
        if (this.useApi) {
            this.columnFilter = this.gridApi.getFilterInstance(this.propertyName);
            if (event.length == 0)
                this.gridApi.setRowData();
            if (event.length >= 1) {
                this.getApiData(event).subscribe(function (data) {
                    _this.rowData = data;
                });
            }
            ;
            if (event.length > 2) {
                this.getApiData(event).subscribe(function (data) {
                    _this.rowData = data;
                });
            }
        }
        else {
            this.updateFilter();
        }
    };
    AutocompleteCell.prototype.getApiData = function (filter) {
        if (this.columnObject == "cityObject") {
            return this.autoService.getTreatmentData(filter);
        }
        else if (this.columnObject == "examinationObj") {
            return this.autoService.getExaminationData(filter);
        }
        else if (this.columnObject == "patternObj") {
            // return this.autoService.getTreatmentData(filter)
            return this.patternService.getPattern();
        }
        else {
            return this.autoService.getTreatmentData(filter);
        }
        // return this.httpClient.get(this.apiEndpoint + this.toQueryString(filter));
    };
    AutocompleteCell.prototype.toQueryString = function (filter) {
        return "?" + this.propertyName + "=" + filter;
    };
    AutocompleteCell.prototype.updateFilter = function () {
        this.columnFilter.setModel({
            type: 'startsWith',
            filter: this.inputValue
        });
        this.columnFilter.onFilterChanged();
        if (this.gridApi.getDisplayedRowAtIndex(0)) {
            this.gridApi.getDisplayedRowAtIndex(0).setSelected(true);
            this.gridApi.ensureIndexVisible(0, 'top');
        }
        else {
            this.gridApi.deselectAll();
        }
    };
    AutocompleteCell.prototype.navigateGrid = function () {
        if (this.gridApi.getFocusedCell() == null || this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex) == null) { // check if no cell has focus, or if focused cell is filtered
            this.gridApi.setFocusedCell(this.gridApi.getDisplayedRowAtIndex(0).rowIndex, this.propertyName);
            this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex).setSelected(true);
        }
        else {
            this.gridApi.setFocusedCell(this.gridApi.getFocusedCell().rowIndex, this.propertyName);
            this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex).setSelected(true);
        }
    };
    __decorate([
        core_1.ViewChild("input")
    ], AutocompleteCell.prototype, "input");
    __decorate([
        core_1.HostListener('keydown', ['$event'])
    ], AutocompleteCell.prototype, "onKeydown");
    AutocompleteCell = __decorate([
        core_1.Component({
            selector: 'auto-complete',
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                style: "position: absolute;\n\t\t\t\t\tleft: 0px; \n\t\t\t\t\ttop: 0px;\n\t\t\t\t\tbackground-color: transparant;\n\t\t\t\t\t"
            },
            template: " \n\t\t<input #input [id]=\"'autoText'\"\n\t\t\t[(ngModel)]=\"inputValue\"\n\t\t\t(ngModelChange)=\"processDataInput($event)\"\n\t\t\tstyle=\" height: 28px; font-weight: 400; font-size: 12px;\"\n\t\t\t[style.width]=\"params.column.actualWidth + 'px'\">\n\t\t<ag-grid-angular\n\t\t\tstyle=\"font-weight: 150;\" \n\t\t\t[style.height]=\"gridHeight + 'px'\"\n\t\t\t[style.width]=\"gridWidth + 'px'\"\n\t\t\tclass=\"ag-theme-balham\"\n\t\t\t[rowData]=\"rowData\" \n\t\t\t[columnDefs]=\"columnDefs\"\n\t\t\t(gridReady)=\"onGridReady($event)\"\n\t\t\t(rowClicked)=\"rowClicked($event)\">\n\t\t</ag-grid-angular>\n\t"
        })
    ], AutocompleteCell);
    return AutocompleteCell;
}());
exports.AutocompleteCell = AutocompleteCell;
