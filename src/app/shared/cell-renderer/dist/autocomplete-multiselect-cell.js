"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AutocompleteCellMultiSelect = void 0;
var core_1 = require("@angular/core");
var AutocompleteCellMultiSelect = /** @class */ (function () {
    function AutocompleteCellMultiSelect(autoService, patternService) {
        this.autoService = autoService;
        this.patternService = patternService;
        this.rowSelection = 'single';
        this.gridHeight = 315;
        this.gridWidth = 500;
        this.isCanceled = true;
        this.selectedObject = {};
        this.isInput = false;
        this.inputElement = document.getElementById('input');
    }
    AutocompleteCellMultiSelect.prototype.ngAfterViewInit = function () {
        var _this = this;
        window.setTimeout(function () {
            if (_this.inputValue == _this.cellValue) {
                _this.input.nativeElement.focus();
            }
            else {
                _this.input.nativeElement.focus();
            }
            if (_this.inputValue && !_this.useApi)
                _this.updateFilter();
        });
    };
    // ICellEditorAngularComp functions
    AutocompleteCellMultiSelect.prototype.agInit = function (params) {
        var _this = this;
        this.params = params;
        //to get witch field to use
        this.columnObject = params.colDef.field;
        if (!params.rowData) {
            this.apiEndpoint = params.apiEndpoint;
            this.useApi = true;
            this.rowData = [{}];
        }
        else {
            this.rowData = params.rowData;
        }
        //console.log(params.value)
        if (params.gridHeight)
            this.gridHeight = params.gridHeight;
        if (params.gridWidth)
            this.gridWidth = params.gridWidth;
        this.columnDefs = params.columnDefs;
        this.propertyName = params.propertyRendered;
        if (this.columnObject == "examinationObj") {
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
        this.getApiData(params.charPress).subscribe(function (data) {
            _this.rowData = data;
        });
    };
    AutocompleteCellMultiSelect.prototype.getValue = function () {
        if (!this.returnObject) {
            return this.selectedObject[this.propertyName];
        }
        this.selectedObject.desc = this.cellValue;
        return this.selectedObject;
    };
    AutocompleteCellMultiSelect.prototype.isPopup = function () {
        return true;
    };
    AutocompleteCellMultiSelect.prototype.isCancelAfterEnd = function () {
        return this.isCanceled;
    };
    // ag-Grid functions
    AutocompleteCellMultiSelect.prototype.onGridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.columnFilter = this.gridApi.getFilterInstance(this.propertyName);
        this.gridApi.setHeaderHeight(0);
    };
    // component functions
    AutocompleteCellMultiSelect.prototype.rowClicked = function (params) {
        this.selectedObject = params.data;
        this.isCanceled = false;
        this.params.api.stopEditing();
    };
    AutocompleteCellMultiSelect.prototype.rowConfirmed = function () {
        if (!this.isInput) {
            this.params.stopEditing();
        }
        if (this.gridApi.getSelectedRows()[0]) {
            this.selectedObject = this.gridApi.getSelectedRows()[0];
            this.isCanceled = false;
            this.getCellValue(this.cellValue, this.inputValue);
            this.inputValue = this.cellValue;
            this.gridApi.setFocusedCell(this.gridApi.getDisplayedRowAtIndex(0).rowIndex, this.propertyName);
            this.input.nativeElement.focus();
        }
        else {
            this.isCanceled = false;
            this.cellValue = this.inputValue;
            this.selectedObject = {
                id: '',
                desc: this.inputValue
            };
            this.params.stopEditing();
        }
        //  this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex).setSelected(true);
        this.isInput = false;
    };
    AutocompleteCellMultiSelect.prototype.getCellValue = function (cell, input) {
        var cellArr = cell.split(" ");
        var inputArr = input.split(" ");
        var strCell = "";
        for (var i = 0; i < inputArr.length; i++) {
            if (inputArr[i] !== cellArr[i]) {
                inputArr[i] = this.selectedObject.desc;
            }
            if (inputArr[i] == " ") {
                inputArr[i] = this.selectedObject.desc;
            }
            strCell += inputArr[i] + " ";
        }
        this.cellValue = strCell;
    };
    AutocompleteCellMultiSelect.prototype.onKeydown = function (event) {
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
            console.log(this.isInput);
            this.rowConfirmed();
            return false;
        }
        if (event.key == "ArrowUp" || event.key == "ArrowDown") {
            this.navigateGrid();
            return false;
        }
        return true;
    };
    //splitting string and re calculate the array
    AutocompleteCellMultiSelect.prototype.splitStringBySpace = function (value) {
        var inputValue = value;
        var cursorPosition = this.input.nativeElement.selectionStart;
        for (var i = 0; i < inputValue.length; i++) {
            while (cursorPosition > 0 && inputValue[cursorPosition - 1] !== ' ' && cursorPosition < i) {
                cursorPosition++;
            }
        }
        var newArr = '';
        newArr = inputValue.substring(0, cursorPosition);
        if (inputValue.length > 1 && cursorPosition != inputValue.length) {
            newArr = inputValue.substring(0, cursorPosition - 1);
        }
        return newArr;
    };
    AutocompleteCellMultiSelect.prototype.processDataInput = function (event) {
        var _this = this;
        this.isInput = true;
        //let Arr = event.split(" ")
        //let value = Arr[Arr.length - 1]
        var spliValue = this.splitStringBySpace(event);
        var Arr = spliValue.split(" ");
        var value = Arr[Arr.length - 1];
        if (this.useApi) {
            this.columnFilter = this.gridApi.getFilterInstance(this.propertyName);
            if (event.length == 0)
                this.gridApi.setRowData();
            if (event.length >= 1) {
                this.getApiData(value).subscribe(function (data) {
                    _this.rowData = data;
                });
            }
            ;
            // if (event.length > 2) {
            //     this.getApiData(event).subscribe(data => {
            //         this.rowData = data;
            //     });
            // }
        }
        else {
            this.updateFilter();
        }
    };
    AutocompleteCellMultiSelect.prototype.getApiData = function (filter) {
        if (this.columnObject == "examinationObj") {
            return this.autoService.getExaminationData(filter);
        }
        else {
            return this.autoService.getTreatmentData(filter);
        }
        //     if (this.columnObject == "cityObject") {
        //         return this.autoService.getTreatmentData(filter)
        //     } else if (this.columnObject == "examinationObj") {
        //         return this.autoService.getExaminationData(filter)
        //     } else if (this.columnObject == "patternObj") {
        //         return this.patternService.getPattern()
        //     }
        //     else {
        //         return this.autoService.getTreatmentData(filter)
        //     }
        //     // return this.httpClient.get(this.apiEndpoint + this.toQueryString(filter));
    };
    AutocompleteCellMultiSelect.prototype.toQueryString = function (filter) {
        return "?" + this.propertyName + "=" + filter;
    };
    AutocompleteCellMultiSelect.prototype.updateFilter = function () {
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
    AutocompleteCellMultiSelect.prototype.navigateGrid = function () {
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
    ], AutocompleteCellMultiSelect.prototype, "input");
    __decorate([
        core_1.HostListener('keydown', ['$event'])
    ], AutocompleteCellMultiSelect.prototype, "onKeydown");
    AutocompleteCellMultiSelect = __decorate([
        core_1.Component({
            selector: 'auto-complete',
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                style: "position: absolute;\n\t\t\t\t\tleft: 0px; \n\t\t\t\t\ttop: 0px;\n\t\t\t\t\tbackground-color: transparant;\n\t\t\t\t\t"
            },
            template: " \n\t\t<input #input [id]=\"'autoText'\"\n\t\t\t[(ngModel)]=\"inputValue\"\n\t\t\t(ngModelChange)=\"processDataInput($event)\"\n\t\t\tstyle=\" height: 28px; font-weight: 400; font-size: 12px;\"\n\t\t\t[style.width]=\"params.column.actualWidth + 'px'\" autocomplete=\"off\">\n\t\t<ag-grid-angular *ngIf=\"isInput\"\n        \n\t\t\tstyle=\"font-weight: 150;\" \n\t\t\t[style.height]=\"gridHeight + 'px'\"\n\t\t\t[style.width]=\"gridWidth + 'px'\"\n\t\t\tclass=\"ag-theme-balham\"\n\t\t\t[rowData]=\"rowData\" \n\t\t\t[columnDefs]=\"columnDefs\"\n\t\t\t(gridReady)=\"onGridReady($event)\"\n\t\t\t(rowClicked)=\"rowClicked($event)\">\n\t\t</ag-grid-angular>\n\t"
        })
    ], AutocompleteCellMultiSelect);
    return AutocompleteCellMultiSelect;
}());
exports.AutocompleteCellMultiSelect = AutocompleteCellMultiSelect;
