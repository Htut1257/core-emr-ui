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
var rxjs_1 = require("rxjs");
var autocomplete_item_model_1 = require("src/app/core/model/autocomplete-item.model");
var doctor_entry_model_1 = require("src/app/core/model/doctor-entry.model");
var autocomplete_cell_1 = require("src/app/shared/cell-renderer/autocomplete-cell");
var checkbox_cell_1 = require("src/app/shared/cell-renderer/checkbox-cell");
var moment = require("moment");
var CheckOutVoucherComponent = /** @class */ (function () {
    function CheckOutVoucherComponent(route, checkService, locationService, payService, currencyService, userService, machineService, commonService, toastService, formBuilder) {
        var _this = this;
        this.route = route;
        this.checkService = checkService;
        this.locationService = locationService;
        this.payService = payService;
        this.currencyService = currencyService;
        this.userService = userService;
        this.machineService = machineService;
        this.commonService = commonService;
        this.toastService = toastService;
        this.formBuilder = formBuilder;
        this.drTreatment = [];
        this.payments = [];
        this.locations = [];
        this.currencies = [];
        this.pharmacyDay = new forms_1.FormControl(1);
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.commonService.isMobileObj$.subscribe(function (data) {
            if (data == false) {
                _this.initCheckOutData();
            }
        });
        this.user = this.userService.getUserValue();
        this.machine = this.machineService.getMachineValue();
        this.frameworkComponents = {
            autoComplete: autocomplete_cell_1.AutocompleteCell,
            checkbox: checkbox_cell_1.CheckboxRenderer
        };
    }
    CheckOutVoucherComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initialzeForm();
        this.getCheckOutData();
        this.getPaymentData();
        this.initializeGridTable();
        this.getPayment();
        this.getLocation();
        this.getCurency();
        this.checkOutForm.controls['pharmacyDay'].valueChanges.pipe(rxjs_1.map(function (name) { return name ? name : '1'; })).subscribe(function (data) {
            _this.setPharmacyDay(data);
        });
    };
    //initialize Form
    CheckOutVoucherComponent.prototype.initialzeForm = function () {
        this.checkOutForm = this.formBuilder.group({
            visitNo: [{ value: '', disabled: true }],
            admissionNo: [{ value: '', disabled: true }],
            regNo: [{ value: '', disabled: true }],
            patientName: [{ value: '', disabled: true }],
            doctorName: [{ value: '', disabled: true }],
            payment: [null, forms_1.Validators.required],
            location: [null, forms_1.Validators.required],
            pharmacyDay: [1],
            currency: [null, forms_1.Validators.required],
            vouTotal: [0],
            tax: [0],
            discountPharmacy: [0],
            discountOpd: [0],
            totalAmount: [{ value: 0, disabled: true }]
        });
    };
    //initialize Form data
    CheckOutVoucherComponent.prototype.initializeFormData = function (data) {
        this.checkOutForm.patchValue({
            visitNo: data.visitId,
            admissionNo: data.admissionNo ? data.admissionNo : '',
            regNo: data.regNo,
            patientName: data.patientName,
            doctorName: data.drName,
            pharmacyDay: 1,
            vouTotal: 0,
            tax: 0,
            discountPharmacy: 0,
            discountOpd: 0,
            totalAmount: 0
        });
    };
    //get location
    CheckOutVoucherComponent.prototype.getLocation = function () {
        var _this = this;
        this.locationService.getLocation().subscribe({
            next: function (locations) {
                _this.locations = locations;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    //get payment
    CheckOutVoucherComponent.prototype.getPayment = function () {
        var _this = this;
        this.payService.getPayment().subscribe({
            next: function (payments) {
                _this.payments = payments;
                _this.checkOutForm.get('payment').patchValue(_this.payments[0]);
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    //compare payment data with initial data
    CheckOutVoucherComponent.prototype.comparePayment = function (pay1, pay2) {
        return pay1 && pay2 ? pay1.paymentTypeId === pay2.paymentTypeId : pay1 === pay2;
    };
    //get currency
    CheckOutVoucherComponent.prototype.getCurency = function () {
        var _this = this;
        this.currencyService.getCurrency().subscribe({
            next: function (currencies) {
                _this.currencies = currencies;
                _this.checkOutForm.get('currency').patchValue(_this.currencies[0]);
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    //compare currency data with initial data
    CheckOutVoucherComponent.prototype.compareCurrency = function (c1, c2) {
        return c1 && c2 ? c1.currencyCode === c2.currencyCode : c1 === c2;
    };
    //initialize data from the selected list
    CheckOutVoucherComponent.prototype.initCheckOutData = function () {
        if (this.checkService._checkOut != undefined) {
            this.checkOutHis = this.checkService._checkOut;
            this.checkOut = this.checkService._checkOut;
            //console.log(this.checkOutHis)
            console.log(this.checkOut);
            this.initializeFormData(this.checkOut);
            this.renderTreatmentData(this.checkOut.treatments);
        }
    };
    //render data to grid table 
    CheckOutVoucherComponent.prototype.renderTreatmentData = function (data) {
        console.log(data);
        this.checkOutRow = data.reduce(function (filtered, option) {
            var someValue = {
                cityObject: doctor_entry_model_1.tableItem(option),
                patternObj: option.pattern,
                day: option.days,
                qty: option.qty,
                price: option.fees,
                foc: option.isFOC,
                discount: 0,
                amount: option.fees * option.qty,
                remark: option.remark
            };
            filtered.push(someValue);
            return filtered;
        }, []);
        for (var _i = 0, _a = this.checkOutRow; _i < _a.length; _i++) {
            var item = _a[_i];
            this.drTreatment.push(item);
        }
        this.setTotalAmount(this.drTreatment);
        this.checkOutRow.push(this.emptydrTreat());
        this.checkOutGridOption.api.setRowData(this.checkOutRow);
    };
    CheckOutVoucherComponent.prototype.initializeGridTable = function () {
        this.checkOutGridOption = {
            columnDefs: this.checkOutColumnDef,
            rowData: this.checkOutRow,
            suppressScrollOnNewData: true,
            suppressHorizontalScroll: true,
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
                editable: function (params) { return params.data.cityObject.itemOption == "Pharmacy"; },
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
                editable: function (params) { return params.data.cityObject.itemOption == "Pharmacy"; },
                type: 'rightAligned'
            },
            {
                headerName: 'Qty',
                field: 'qty',
                width: 30,
                editable: function (params) { return params.data.cityObject.itemOption == "Pharmacy"; },
                type: 'rightAligned'
            },
            {
                headerName: 'Unit',
                field: 'cityObject.itemUnit',
                width: 35,
                editable: false
            },
            {
                headerName: 'Price',
                field: 'price',
                width: 50,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: 'Foc',
                field: 'isFOC',
                width: 30,
                cellRendererSelector: function (params) {
                    if (params.data.cityObject.itemOption != "Pharmacy") {
                        return {
                            component: checkbox_cell_1.CheckboxRenderer
                        };
                    }
                    else {
                        return undefined;
                    }
                },
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
                despEng: '',
                id: '',
                despMM: '',
                factor: 0
            },
            day: this.checkOutForm.get('pharmacyDay').value,
            qty: 0,
            price: 0,
            foc: false,
            discount: 0,
            amount: 0,
            remark: ''
        };
    };
    CheckOutVoucherComponent.prototype.cellValueChanged = function (event) {
        var columnField = event.colDef.field;
        var rowData = event.data;
        var rowIndex = event.rowIndex;
        var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
        if (columnField == "isFOC") {
            rowData.amount = rowData.price * rowData.qty;
            if (rowData.isFOC == true) {
                rowData.amount = 0;
            }
            this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption);
        }
        this.setTotalAmount(this.checkOutRow);
    };
    CheckOutVoucherComponent.prototype.cellEditingStopped = function (event) {
        var columnField = event.colDef.field;
        var rowData = event.data;
        var row = event.rowIndex;
        var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
        if (this.checkOutApi.getFocusedCell()) {
            this.checkOutCellEvent(row, firstEditCol, columnField, this.checkOutApi, rowData, this.drTreatment);
        }
        this.setTotalAmount(this.checkOutRow);
    };
    //cell Editing event for Check Out Table
    CheckOutVoucherComponent.prototype.checkOutCellEvent = function (rowIndex, firstColumn, columnField, gridApi, rowData, lstRow) {
        var data = rowData;
        console.log(data);
        var itemType = data.cityObject.itemOption;
        if (columnField == "cityObject") {
            if (data.cityObject.itemId == '') {
                gridApi.setFocusedCell(rowIndex, columnField);
                return;
            }
            data.qty = 1;
            data.price = data.cityObject.fees;
            data.amount = (data.price * data.qty) - data.discount;
            if (itemType == "Pharmacy") {
                this.checkOutRow[rowIndex] = rowData;
                this.checkOutGridOption.api.setRowData(this.checkOutRow);
                this.addNewRowtoTable(rowIndex, firstColumn, gridApi, rowData, lstRow, this.emptydrTreat());
                this.focusTableCell(rowIndex, "patternObj", gridApi);
                return;
            }
            data.day = '';
            this.checkOutRow[rowIndex] = rowData;
            this.checkOutGridOption.api.setRowData(this.checkOutRow);
            this.addNewRowtoTable(rowIndex, firstColumn, gridApi, rowData, lstRow, this.emptydrTreat());
            this.focusTableCell(rowIndex, "price", gridApi);
        }
        if (columnField == "patternObj") {
            if (data.patternObj.patternCode == '') {
                gridApi.setFocusedCell(rowIndex, columnField);
                return;
            }
            data.qty = data.patternObj.factor * data.day;
            data.amount = (data.price * data.qty) - data.discount;
            this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption);
            this.focusTableCell(rowIndex + 1, firstColumn, gridApi);
        }
        if (columnField == "day") {
            data.qty = data.patternObj.factor * data.day;
            data.amount = (data.price * data.qty) - data.discount;
            this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption);
        }
        if (columnField == "qty") {
            data.amount = (data.price * data.qty) - data.discount;
            this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption);
        }
        if (columnField == "price") {
            data.amount = (data.price * data.qty) - data.discount;
            this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption);
            if (itemType != "Pharmacy" && itemType != '') {
                this.focusTableCell(rowIndex + 1, firstColumn, gridApi);
            }
        }
        if (columnField == "discount") {
            data.amount = (data.price * data.qty) - data.discount;
            if (data.price === 0 || data.amount < 0) {
                data.amount = 0;
            }
            this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption);
        }
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
        }
    };
    //set Data to Table
    CheckOutVoucherComponent.prototype.setRowDatatoTable = function (rowIndex, tableRow, rowData, gridApi, gridOption) {
        tableRow[rowIndex] = rowData;
        gridOption.api.setRowData(tableRow);
        gridApi.applyTransaction({
            add: [this.emptydrTreat()]
        });
    };
    //focusing table cell
    CheckOutVoucherComponent.prototype.focusTableCell = function (rowIndex, column, gridApi) {
        gridApi.ensureIndexVisible(0);
        gridApi.ensureColumnVisible(column);
        gridApi.setFocusedCell(rowIndex, column);
    };
    //set nummber of days pharmacy Item
    CheckOutVoucherComponent.prototype.setPharmacyDay = function (day) {
        for (var _i = 0, _a = this.checkOutRow; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.cityObject.itemOption === "Pharmacy") {
                item.day = day;
                item.qty = day * item.patternObj.factor;
                item.amount = item.price * item.qty;
            }
        }
        this.checkOutGridOption.api.setRowData(this.checkOutRow);
        if (this.drTreatment.length >= this.checkOutRow.length) {
            this.checkOutApi.applyTransaction({
                add: [this.emptydrTreat()]
            });
        }
        this.setTotalAmount(this.checkOutRow);
    };
    //calculate amount total from table
    CheckOutVoucherComponent.prototype.setTotalAmount = function (rowData) {
        var sumAmount = 0;
        rowData.forEach(function (element) {
            sumAmount += element.amount;
        });
        this.checkOutForm.get('vouTotal').patchValue(sumAmount);
        //this.totalAmount = sumAmount
    };
    //save list to mappable obj
    CheckOutVoucherComponent.prototype.savetoDrTreatment = function () {
        return this.drTreatment.reduce(function (filtered, option) {
            var item = autocomplete_item_model_1.treatmentItem(option.cityObject);
            var someNewValue = {
                group: item.group,
                subGroup: item.subGroup,
                code: item.code,
                desc: item.desc,
                relStr: item.relStr,
                fees: item.fees,
                fees1: item.fees1,
                fees2: item.fees2,
                fees3: item.fees3,
                fees4: item.fees4,
                fees5: item.fees5,
                fees6: item.fees6,
                isPercent: item.isPercent,
                serviceCost: item.serviceCost,
                itemUnit: item.itemUnit,
                expDate: item.expDate,
                isFOC: item.isFOC,
                uniqueId: item.uniqueId,
                pattern: option.patternObj,
                days: option.day,
                qty: option.qty,
                remark: option.remark,
                amount: option.amount
            };
            filtered.push(someNewValue);
            return filtered;
        }, []);
    };
    // 
    CheckOutVoucherComponent.prototype.saveCashierData = function (data) {
        this.checkOut.visitDate = moment(new Date(), 'MM/DD/YYYY').format("yyyy-MM-DDThh:mm:ss");
        this.checkOut.reVisitDate = moment(new Date(), 'MM/DD/YYYY').format("yyyy-MM-DDThh:mm:ss");
        this.checkOut.id = null;
        this.checkOut.admissionNo = '';
        this.checkOut.locId = data.location.locationId;
        this.checkOut.locName = data.location.locationName;
        this.checkOut.currId = data.currency.currencyCode;
        this.checkOut.currName = data.currency.currencyName;
        this.checkOut.payTypeId = data.payment.paymentTypeId;
        this.checkOut.payTypeName = data.payment.paymentTypeName;
        this.checkOut.treatments = this.savetoDrTreatment();
        this.checkOut.vouTotal = data.vouTotal;
        var totalAmount = data.vouTotal - (data.tax + data.discountOpd + data.discountPharmacy);
        this.checkOut.paid = 0;
        this.checkOut.balance = totalAmount;
        if (data.payment.paymentTypeName == "Cash") {
            this.checkOut.paid = totalAmount;
            this.checkOut.balance = 0;
        }
        this.checkOut.discP = 0;
        this.checkOut.discAmt = 0;
        this.checkOut.taxP = 0;
        this.checkOut.taxAmt = data.tax;
        this.checkOut.maxUniqueId = 0;
        this.checkOut.sessionId = null;
        this.checkOut.userId = this.user.userCode;
        this.checkOut.macId = this.machine.machineId;
    };
    CheckOutVoucherComponent.prototype.saveCashierHisData = function (data) {
        this.checkOut.id = '';
        this.checkOut.drNotes = '';
        this.checkOut.admissionNo = '';
        this.checkOutHis.locId = data.location.locationId;
        this.checkOutHis.locName = data.location.locationName;
        this.checkOutHis.currId = data.currency.currencyCode;
        this.checkOutHis.currName = data.currency.currencyName;
        this.checkOutHis.payTypeId = data.payment.paymentTypeId;
        this.checkOutHis.payTypeName = data.payment.paymentTypeName;
        this.checkOutHis.treatments = this.savetoDrTreatment();
        this.checkOutHis.vouTotal = data.vouTotal;
        var totalAmount = data.vouTotal - (data.tax + data.discountOpd + data.discountPharmacy);
        this.checkOutHis.paid = 0;
        this.checkOutHis.balance = totalAmount;
        if (data.payment.paymentTypeName == "Cash") {
            this.checkOutHis.paid = totalAmount;
            this.checkOutHis.balance = 0;
        }
        this.checkOutHis.discP = 0;
        this.checkOutHis.discA = 0;
        this.checkOutHis.taxP = 0;
        this.checkOutHis.taxA = data.tax;
        this.checkOutHis.sessionId = null;
        this.checkOutHis.saleVouNo = null;
        this.checkOutHis.opdVouNo = null;
        this.checkOutHis.userId = this.user.userCode;
        this.checkOutHis.macId = "20";
    };
    CheckOutVoucherComponent.prototype.saveCheckOut = function (data) {
        var _this = this;
        this.saveCashierData(data);
        this.saveCashierHisData(data);
        console.log(this.checkOut);
        //return
        this.checkService.saveCheckOut(this.checkOut).subscribe({
            next: function (checkOut) {
                console.log("mongo completed");
                console.log(checkOut);
                _this.checkService.saveCheckoutHistory(_this.checkOutHis).subscribe(function (data) {
                    console.log("maria completed");
                    console.log(data);
                    _this.onClear();
                });
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    CheckOutVoucherComponent.prototype.onClear = function () {
        this.checkOutForm.reset();
        this.reactiveForm.resetForm();
        this.checkOutForm.get('payment').patchValue(this.payments[0]);
        this.checkOutForm.get('currency').patchValue(this.currencies[0]);
        this.drTreatment = [];
        this.checkOutRow = [this.emptydrTreat()];
        this.checkOutGridOption.api.setRowData(this.checkOutRow);
    };
    //limit input to number
    CheckOutVoucherComponent.prototype.numberLimit = function (e) {
        var txt = String.fromCharCode(e.which);
        if (!txt.match(/^[0-9-@&#%()]*$/)) { //
            return false;
        }
        return txt;
    };
    __decorate([
        core_1.ViewChild('reactiveForm', { static: true })
    ], CheckOutVoucherComponent.prototype, "reactiveForm");
    CheckOutVoucherComponent = __decorate([
        core_1.Component({
            selector: 'app-check-out-voucher',
            templateUrl: './check-out-voucher.component.html',
            styleUrls: ['./check-out-voucher.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], CheckOutVoucherComponent);
    return CheckOutVoucherComponent;
}());
exports.CheckOutVoucherComponent = CheckOutVoucherComponent;
