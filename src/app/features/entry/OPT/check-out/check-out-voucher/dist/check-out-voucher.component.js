"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckOutVoucherComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var autocomplete_cell_1 = require("src/app/shared/cell-renderer/autocomplete-cell");
var checkbox_cell_1 = require("src/app/shared/cell-renderer/checkbox-cell");
var moment = require("moment");
var CheckOutVoucherComponent = /** @class */ (function () {
    function CheckOutVoucherComponent(route, checkService, commonService) {
        var _this = this;
        this.route = route;
        this.checkService = checkService;
        this.commonService = commonService;
        this.drTreatment = [];
        this.pharmacyDay = "0";
        this.voucherDate = new forms_1.FormControl('');
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.commonService.isMobileObj$.subscribe(function (data) {
            if (data == false) {
                _this.initCheckOutData();
            }
        });
        this.frameworkComponents = {
            autoComplete: autocomplete_cell_1.AutocompleteCell,
            checkbox: checkbox_cell_1.CheckboxRenderer
        };
    }
    CheckOutVoucherComponent.prototype.ngOnInit = function () {
        this.getCheckOutData();
        this.getPaymentData();
        this.initializeGridTable();
        this.voucherDate.patchValue(this.todayDate);
    };
    //initialize data from the selected list
    CheckOutVoucherComponent.prototype.initCheckOutData = function () {
        if (this.checkService._checkOut != undefined) {
            this.checkOut = this.checkService._checkOut;
            console.log(this.checkOut);
            this.visitNo = this.checkOut.visitId;
            this.admNo = '';
            this.regNo = this.checkOut.regNo;
            this.patientName = this.checkOut.patientName;
            this.doctorId = this.checkOut.drId;
            this.doctorName = this.checkOut.drName;
            this.pharmacyDay = "1";
            this.renderTreatmentData(this.checkOut.treatments);
            console.log(this.checkOutRow);
        }
    };
    //render data to grid table 
    CheckOutVoucherComponent.prototype.renderTreatmentData = function (data) {
        this.checkOutRow = data.reduce(function (filtered, option) {
            var someValue = {
                cityObject: {
                    itemOption: option.group,
                    itemType: option.subGroup,
                    itemId: option.code,
                    itemName: option.desc,
                    relStr: option.relStr,
                    fees: option.fees,
                    fees1: option.fees1,
                    fees2: option.fees2,
                    fees3: option.fees3,
                    fees4: option.fees4,
                    fees5: option.fees5,
                    fees6: option.fees6,
                    isPercent: option.isPercent,
                    serviceCost: option.serviceCost,
                    itemUnit: option.itemUnit,
                    expDate: option.expDate,
                    isFOC: option.isFOC,
                    uniqueId: option.uniqueId
                },
                patternObj: {
                    patternCode: option.pattern.patternCode,
                    despEng: option.pattern.despEng
                },
                day: option.days,
                qty: option.qty,
                price: option.remark,
                foc: option.isFOC,
                discount: 0,
                amount: option.fees * option.qty,
                remark: option.remark
            };
            filtered.push(someValue);
            return filtered;
        }, []);
        var treatRow = this.emptydrTreat();
        // treatRow.day = this.pharmacyDays
        this.checkOutRow.push(treatRow);
        this.checkOutGridOption.api.setRowData(this.checkOutRow);
    };
    CheckOutVoucherComponent.prototype.initializeGridTable = function () {
        this.checkOutGridOption = {
            columnDefs: this.checkOutColumnDef,
            rowData: this.checkOutRow,
            suppressScrollOnNewData: false,
            defaultColDef: {
                resizable: true
            }
        };
        this.paymentGridOption = {
            columnDefs: this.paymentColumnDef,
            rowData: this.paymentRow,
            suppressScrollOnNewData: false,
            onGridReady: function (event) {
                this.paymentApi = event.api;
                this.paymentColumn = event.columnApi;
                this.paymentApi.sizeColumnsToFit();
            }
        };
    };
    CheckOutVoucherComponent.prototype.onGridReadyCheckOut = function (params) {
        this.checkOutApi = params.api;
        this.checkOutColumn = params.columnApi;
        this.checkOutApi.sizeColumnsToFit();
    };
    //column and row defination for check out
    CheckOutVoucherComponent.prototype.getCheckOutData = function () {
        this.checkOutColumnDef = [
            {
                headerName: 'Code',
                field: 'cityObject',
                width: 50,
                editable: true,
                cellEditor: 'autoComplete',
                cellEditorParams: {
                    'propertyRendered': 'itemId',
                    'returnObject': true,
                    'columnDefs': [
                        { headerName: 'Code', field: 'itemId' },
                        { headerName: 'Name', field: 'itemName' },
                        { headerName: 'Option', field: 'itemOption' },
                        { headerName: 'Type', field: 'itemType' }
                    ]
                },
                valueFormatter: function (params) {
                    if (params.value) {
                        return params.value.itemId;
                    }
                    return "";
                }
            },
            {
                headerName: 'Description',
                field: 'cityObject.itemName',
                width: 100,
                editable: true
            },
            {
                headerName: 'Pattern',
                field: 'patternObj',
                width: 45,
                editable: true,
                cellEditor: 'autoComplete',
                cellEditorParams: {
                    'propertyRendered': 'patternCode',
                    'returnObject': true,
                    'columnDefs': [
                        { headerName: 'Code', field: 'patternCode' },
                        { headerName: 'Description', field: 'despEng' },
                    ]
                },
                valueFormatter: function (params) {
                    if (params.value)
                        return params.value.patternCode;
                    return "";
                }
            },
            {
                headerName: 'Day',
                field: 'day',
                width: 35,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: 'Qty',
                field: 'qty',
                width: 30,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: 'Unit',
                field: 'cityObject.itemUnit',
                width: 35,
                editable: true
            },
            {
                headerName: 'Price',
                field: 'cityObject.fees',
                width: 50,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: 'Foc',
                field: 'isFOC',
                width: 30,
                cellRenderer: "checkbox",
                editable: false
            },
            {
                headerName: 'Discount',
                field: 'discount',
                width: 50,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: 'Amount',
                field: 'amount',
                width: 50,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: 'Remark',
                field: 'remark',
                width: 100,
                editable: true
            },
        ];
        this.checkOutRow = [
            this.emptydrTreat()
        ];
    };
    //column and row defination for payment
    CheckOutVoucherComponent.prototype.getPaymentData = function () {
        this.paymentColumnDef = [];
        this.paymentRow = [];
    };
    CheckOutVoucherComponent.prototype.emptydrTreat = function () {
        return {
            cityObject: {
                itemOption: '',
                itemType: '',
                itemId: '',
                itemName: '',
                relStr: '',
                fees: 0,
                fees1: 0,
                fees2: 0,
                fees3: 0,
                fees4: 0,
                fees5: 0,
                fees6: 0,
                isPercent: '',
                serviceCost: 0,
                itemUnit: '',
                isFOC: false,
                uniqueId: ''
            },
            patternObj: {
                patternCode: '',
                despEng: ''
            },
            day: '',
            qty: 0,
            price: 0,
            foc: false,
            discount: 0,
            amount: 0,
            remark: ''
        };
    };
    CheckOutVoucherComponent.prototype.cellEditingStopped = function (event) {
        var columnField = event.colDef.field;
        var rowData = event.data;
        var row = event.rowIndex;
        var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
        if (this.checkOutApi.getFocusedCell()) {
            this.checkOutCellEvent(row, firstEditCol, columnField, this.checkOutApi, rowData, this.drTreatment);
            if (columnField == "cityObject") {
                console.log(rowData);
                rowData.qty = 1;
                rowData.day = '';
                this.checkOutRow[row] = rowData;
                this.checkOutGridOption.api.setRowData(this.checkOutRow);
                var treatRow = this.emptydrTreat();
                //treatRow.day = this.pharmacyDays
                this.addNewRowtoTable(row, firstEditCol, this.checkOutApi, rowData, this.drTreatment, treatRow);
                this.focusTableCell(row + 1, firstEditCol, this.checkOutApi);
            }
        }
    };
    //cell Editing event for Check Out Table
    CheckOutVoucherComponent.prototype.checkOutCellEvent = function (rowIndex, firstColumn, columnField, gridApi, rowData, lstRow) {
        if (columnField == "cityObject") {
        }
        var treatRow = this.emptydrTreat();
        this.addNewRowtoTable(rowIndex, firstColumn, gridApi, rowData, lstRow, treatRow);
        this.focusTableCell(rowIndex + 1, firstColumn, gridApi);
    };
    //add new row to table
    CheckOutVoucherComponent.prototype.addNewRowtoTable = function (rowIndex, firstColumn, gridApi, rowData, lstRow, rowObj) {
        var currentRow = lstRow[rowIndex];
        if (currentRow != undefined) {
            currentRow = rowData;
        }
        var totalRow = gridApi.getDisplayedRowCount() - 1;
        if (totalRow == rowIndex) {
            var curentData = rowData;
            lstRow.push(curentData);
            gridApi.applyTransaction({
                add: [rowObj]
            });
            // gridApi.ensureIndexVisible(0)
            // gridApi.ensureColumnVisible(firstColumn);
            // gridApi.setFocusedCell(rowIndex + 1, firstColumn);
        }
    };
    //focusing table cell
    CheckOutVoucherComponent.prototype.focusTableCell = function (rowIndex, column, gridApi) {
        gridApi.ensureIndexVisible(0);
        gridApi.ensureColumnVisible(column);
        gridApi.setFocusedCell(rowIndex, column);
    };
    //get single row data
    CheckOutVoucherComponent.prototype.getRowData = function () {
        // var rowNode = this.gridApiCheckOut.getRenderedNodes()//.rowData
        // console.log(rowNode)
    };
    //get the current changed data
    CheckOutVoucherComponent.prototype.onSelectionChanged = function (event) {
        //const selectedData = this.gridApiCheckOut.getSelectedRows();
        console.log('Selection Changed', event);
    };
    CheckOutVoucherComponent = __decorate([
        core_1.Component({
            selector: 'app-check-out-voucher',
            templateUrl: './check-out-voucher.component.html',
            styleUrls: ['./check-out-voucher.component.css']
        })
    ], CheckOutVoucherComponent);
    return CheckOutVoucherComponent;
}());
exports.CheckOutVoucherComponent = CheckOutVoucherComponent;
