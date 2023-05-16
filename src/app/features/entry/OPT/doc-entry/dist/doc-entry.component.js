"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DocEntryComponent = void 0;
var core_1 = require("@angular/core");
var autocomplete_cell_1 = require("src/app/shared/cell-renderer/autocomplete-cell");
var checkbox_cell_1 = require("src/app/shared/cell-renderer/checkbox-cell");
var appointment_patient_dialog_component_1 = require("../appointment/appointment-patient-dialog/appointment-patient-dialog.component");
var moment = require("moment");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var core_2 = require("@angular/material/core");
var forms_1 = require("@angular/forms");
var MY_DATE_FORMAT = {
    parse: {
        dateInput: 'DD/MM/YYYY'
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
var DocEntryComponent = /** @class */ (function () {
    function DocEntryComponent(route, docService, vitalService, entryService, autoService, appointService, userService, cfFeeService, serverService, dialog) {
        this.route = route;
        this.docService = docService;
        this.vitalService = vitalService;
        this.entryService = entryService;
        this.autoService = autoService;
        this.appointService = appointService;
        this.userService = userService;
        this.cfFeeService = cfFeeService;
        this.serverService = serverService;
        this.dialog = dialog;
        this.loop = false;
        this.drExamination = [];
        this.drTreatment = [];
        this.drNote = [];
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.reVisitDate = '';
        this.cfFeeControl = new forms_1.FormControl(0);
        this.cfFees = [];
        this.frameworkComponents = {
            autoComplete: autocomplete_cell_1.AutocompleteCell,
            checkboxRenderer: checkbox_cell_1.CheckboxRenderer
        };
        this.examObj = {};
        this.user = this.userService.getUserValue();
        if (this.user) {
            this.doctorId = this.user.doctorId;
            this.getDoctorCfFee(this.doctorId);
        }
    }
    DocEntryComponent.prototype.ngOnInit = function () {
        this.reVisitDate = this.todayDate;
        this.getExaminationData();
        this.getTreatmentData();
        this.getNoteData();
        this.InitializeGridTable();
        this.getServerSideData();
    };
    DocEntryComponent.prototype.getVitalSign = function (bookingId) {
        var _this = this;
        this.vitalService.getVitalSignByPatient(bookingId).subscribe({
            next: function (vitalSign) {
                console.log(vitalSign);
                _this.vitalSign = vitalSign;
                _this.temp = _this.vitalSign.temperature;
                _this.bp = _this.vitalSign.bpUpper + "/" + _this.vitalSign.bpLower;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DocEntryComponent.prototype.getDoctorCfFee = function (id) {
        var _this = this;
        this.cfFeeService.getOpdCfFeeByDoctor(id).subscribe({
            next: function (fees) {
                _this.cfFees = fees;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DocEntryComponent.prototype.getDoctorFeeData = function (fees) {
        console.log(fees);
        this.cfFeeControl.patchValue(fees.fees);
    };
    DocEntryComponent.prototype.getServerSideData = function () {
        var _this = this;
        var uri = '/opdBooking/getMessage';
        this.serverService.getServerSource(uri).subscribe(function (data) {
            console.log(data);
            var serverData = JSON.parse(data.data);
            _this.bookingData = serverData;
            if (serverData.bstatus == "Doctor Room") {
                if (_this.doctorId == serverData.doctorId) {
                    _this.booking = serverData;
                    _this.bookingId = serverData.bookingId;
                    _this.bookingDate = serverData.bkDate;
                    _this.regNo = serverData.regNo;
                    _this.patientName = serverData.patientName;
                    _this.getVitalSign(serverData.bookingId);
                }
            }
        });
    };
    DocEntryComponent.prototype.InitializeGridTable = function () {
        this.examinationGridOption = {
            columnDefs: this.examinationColumnDef,
            rowData: this.examinationRow,
            suppressScrollOnNewData: false
        };
        this.treatmentGridOption = {
            columnDefs: this.treatmentColumnDef,
            rowData: this.treatmentRow,
            suppressScrollOnNewData: false
        };
        this.noteGridOption = {
            columnDefs: this.noteColumnDef,
            rowData: this.noteRow,
            suppressScrollOnNewData: false
        };
        console.log(this.noteGridOption);
    };
    //table for diagnosis 
    DocEntryComponent.prototype.onGriReadyExamination = function (params) {
        console.log("on grid called");
        this.examinationApi = params.api;
        this.examinationColumn = params.columnApi;
        this.examinationApi.sizeColumnsToFit();
    };
    //table for treatment
    DocEntryComponent.prototype.onGridReadyTreatment = function (params) {
        this.treatmentApi = params.api;
        this.treatmentColumn = params.columnApi;
        this.treatmentApi.sizeColumnsToFit();
    };
    DocEntryComponent.prototype.onGridReadyNote = function (params) {
        this.noteApi = params.api;
        this.noteColumn = params.columnApi;
        this.noteApi.sizeColumnsToFit();
    };
    DocEntryComponent.prototype.getExaminationData = function () {
        this.examinationColumnDef = [
            {
                headerName: "Examination",
                field: "examinationObj",
                editable: true,
                cellEditor: 'autoComplete',
                cellEditorParams: {
                    'propertyRendered': 'desc',
                    'returnObject': true,
                    'columnDefs': [
                        { headerName: 'Name', field: 'desc' },
                    ]
                },
                valueFormatter: function (params) {
                    if (params.value)
                        return params.value.desc;
                    return params.value;
                }
            }
        ];
        this.examinationRow = [
            { 'examinationObj': { 'desc': '' } },
        ];
    };
    DocEntryComponent.prototype.getTreatmentData = function () {
        this.treatmentColumnDef = [
            {
                headerName: "Description",
                field: "cityObject",
                editable: true,
                cellEditor: 'autoComplete',
                cellEditorParams: {
                    'propertyRendered': 'itemName',
                    'returnObject': true,
                    'columnDefs': [
                        { headerName: 'Name', field: 'itemName' },
                        { headerName: 'Option', field: 'itemOption' },
                        { headerName: 'Type', field: 'itemType' }
                    ]
                },
                valueFormatter: function (params) {
                    if (params.value) {
                        return params.value.itemName;
                    }
                    return "";
                }
            },
            // {
            //   headerName: "Pattern",
            //   field: "pattern",
            //   width: 100,
            //   editable: true
            // },
            {
                headerName: "Pattern",
                field: "patternObj",
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
                headerName: "Days",
                field: "day",
                width: 100,
                editable: true
            },
            {
                headerName: "Qty",
                field: "qty",
                width: 100,
                editable: true
            },
            {
                headerName: "Remark",
                field: "remark",
                width: 300,
                editable: true
            },
        ];
        this.treatmentRow = [
            {
                'cityObject': { 'itemName': '', 'itemOption': '', 'itemType': '' },
                'patternObj': { 'patternCode': '', 'despEng': '' },
                'day': '',
                'qty': '',
                'remark': ''
            },
        ];
    };
    DocEntryComponent.prototype.getNoteData = function () {
        this.noteColumnDef = [
            {
                headerName: "Key",
                field: "key",
                editable: true
            },
            {
                headerName: "Value",
                field: "value",
                editable: true
            }
        ];
        this.noteRow = [
            { key: 'key remark1', value: 'value remark1' }
        ];
    };
    //save list to mappable obj
    DocEntryComponent.prototype.savetoDrExam = function () {
        return this.drExamination.reduce(function (filtered, option) {
            var someNewValue = {
                desc: option.examinationObj.desc
            };
            filtered.push(someNewValue);
            return filtered;
        }, []);
    };
    //save list to mappable obj
    DocEntryComponent.prototype.savetoDrTreatment = function () {
        return this.drTreatment.reduce(function (filtered, option) {
            var someNewValue = {
                // group: option.cityObject.itemOption,
                // subGroup: option.cityObject.itemType,
                // code: option.cityObject.itemId,
                // desc: option.cityObject.itemName,
                // pattern: option.pattern,
                // days: option.day,
                // qty: option.aty,
                group: option.cityObject.itemOption,
                subGroup: option.cityObject.itemType,
                code: option.cityObject.itemId,
                desc: option.cityObject.itemName,
                pattern: option.patternObj,
                days: option.day,
                qty: option.qty,
                remark: option.remark,
                relStr: option.cityObject.relStr,
                fees: option.cityObject.fees,
                fees1: option.cityObject.fees1,
                fees2: option.cityObject.fees2,
                fees3: option.cityObject.fees3,
                fees4: option.cityObject.fees4,
                fees5: option.cityObject.fees5,
                fees6: option.cityObject.fees6,
                isPercent: option.cityObject.isPercent,
                serviceCost: option.cityObject.serviceCost,
                itemUnit: option.cityObject.itemUnit
            };
            filtered.push(someNewValue);
            return filtered;
        }, []);
    };
    //save list to mappable obj
    DocEntryComponent.prototype.savetoDrNote = function () {
    };
    DocEntryComponent.prototype.saveMedHistory = function () {
        var _this = this;
        var docMedic = {
            visitId: this.bookingData.bookingId,
            visitDate: this.bookingData.bkDate,
            regNo: this.bookingData.regNo,
            admissionNo: ' ',
            patientName: this.bookingData.patientName,
            drId: this.bookingData.doctorId,
            drName: this.bookingData.doctorName,
            reVisitDate: '2023-04-27',
            drNotes: 'testing',
            examinations: this.savetoDrExam(),
            treatments: this.savetoDrTreatment(),
            kvDrNotes: this.drNote
        };
        console.log(docMedic);
        var booking = this.booking;
        booking.bStatus = booking.bstatus;
        this.entryService.saveDoctorMedical(docMedic).subscribe({
            next: function (data) {
                _this.appointService.updateAppointmentStatus(booking).subscribe({
                    next: function (booking) {
                        console.log("status changed");
                        console.log(booking);
                    }, error: function (err) {
                        console.trace(err);
                    }
                });
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DocEntryComponent.prototype.treatCellEditingStopped = function (event) {
        this.treatmentApi.setFocusedCell(event.rowIndex, event.colDef.field);
        var columnField = event.colDef.field;
    };
    DocEntryComponent.prototype.onKeydown = function (event) {
        event.stopPropagation();
        if (event.key == "Escape") {
            // this.params.api.stopEditing();
            return false;
        }
        if (event.key == "Enter" || event.key == "Tab") {
            // this.rowConfirmed();
            return false;
        }
        if (event.key == "ArrowUp" || event.key == "ArrowDown") {
            //this.navigateGrid();
            return false;
        }
        if (event.key == "ArrowLeft") {
            this.navigateTreatmentGrid();
            this.navigateNoteGrid();
            return false;
        }
        if (event.key == "ArrowRight") {
            this.navigateExaminationGrid();
            this.navigateTreatmentGrid();
            return false;
        }
        return true;
    };
    DocEntryComponent.prototype.navigateExaminationGrid = function () {
        var cell = this.examinationApi.getFocusedCell();
        if (cell != undefined) {
            if (cell.column.colId == "examinationObj") {
                document.querySelector("#treatmentGrid").focus();
                this.treatmentApi.setFocusedCell(0, 'cityObject');
                this.examinationApi.clearFocusedCell();
            }
        }
    };
    DocEntryComponent.prototype.navigateTreatmentGrid = function () {
        var cell = this.treatmentApi.getFocusedCell();
        if (cell != undefined) {
            var colName = cell.column.colId;
            switch (colName) {
                case "cityObject": {
                    this.cellNavigation("#examinationGrid", 'examinationObj', this.examinationApi, this.treatmentApi);
                    break;
                }
                case "remark": {
                    this.cellNavigation("#noteGrid", 'key', this.noteApi, this.treatmentApi);
                    break;
                }
                default: {
                    this.loop = false;
                    break;
                }
            }
        }
    };
    DocEntryComponent.prototype.navigateNoteGrid = function () {
        var cell = this.noteApi.getFocusedCell();
        if (cell != undefined) {
            var colName = cell.column.colId;
            if (colName == "key") {
                this.cellNavigation("#treatmentGrid", 'cityObject', this.treatmentApi, this.noteApi);
            }
        }
    };
    //cell navigaton for jumping to another cell
    DocEntryComponent.prototype.cellNavigation = function (tableId, tableCell, currGridApi, nextGridApi) {
        if (this.loop == false) {
            this.loop = true;
        }
        else {
            document.querySelector(tableId).focus();
            currGridApi.setFocusedCell(0, tableCell);
            nextGridApi.clearFocusedCell();
            this.loop = false;
        }
    };
    //table cell editing
    DocEntryComponent.prototype.cellEditingStopped = function (event) {
        var columnField = event.colDef.field;
        var rowData = event.data;
        var row = event.rowIndex;
        var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
        if (this.examinationApi.getFocusedCell()) {
            this.examinationApi.setFocusedCell(event.rowIndex, event.colDef.field);
            this.addNewRowtoTable(row, firstEditCol, this.examinationApi, rowData, this.drExamination, this.emptyExamination());
        }
        if (this.treatmentApi.getFocusedCell()) {
            if (columnField == "cityObject") {
                this.treatmentApi.setFocusedCell(event.rowIndex, event.colDef.field);
            }
            if (columnField == "patternObj") {
                this.treatmentApi.setFocusedCell(event.rowIndex, event.colDef.field);
            }
            if (columnField == "remark") {
                this.addNewRowtoTable(row, firstEditCol, this.treatmentApi, rowData, this.drTreatment, this.emptydrTreat());
            }
        }
        if (this.noteApi.getFocusedCell()) {
            if (columnField == "value") {
                this.addNewRowtoTable(row, firstEditCol, this.noteApi, rowData, this.drNote, this.emptyNote());
            }
        }
    };
    DocEntryComponent.prototype.emptyExamination = function () {
        return {
            examinationObj: {
                desc: ''
            }
        };
    };
    DocEntryComponent.prototype.emptydrTreat = function () {
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
                itemUnit: ''
            },
            patternObj: {
                patternCode: '',
                despEng: ''
            },
            day: '',
            qty: 0,
            remark: ''
        };
    };
    DocEntryComponent.prototype.emptyNote = function () {
        return {
            key: '',
            value: ''
        };
    };
    DocEntryComponent.prototype.addNewRowtoTable = function (rowIndex, firstColumn, gridApi, rowData, lstRow, rowObj) {
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
            gridApi.ensureIndexVisible(0);
            gridApi.ensureColumnVisible(firstColumn);
            gridApi.setFocusedCell(rowIndex + 1, firstColumn);
        }
    };
    DocEntryComponent.prototype.searchPatient = function () {
        var _this = this;
        this.dialog.open(appointment_patient_dialog_component_1.AppointmentPatientDialogComponent, {
            disableClose: false,
            width: '100%',
            data: { 'data key': 'data value' }
        }).afterClosed().subscribe({
            next: function (booking) {
                if (booking) {
                    _this.bookingData = booking;
                    _this.booking = booking;
                    _this.bookingId = booking.bookingId;
                    _this.bookingDate = booking.bkDate;
                    _this.regNo = booking.regNo;
                    _this.patientName = booking.patientName;
                    _this.getVitalSign(booking.bookingId);
                }
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DocEntryComponent.prototype.onClear = function () {
        //this.examinationRow=this.emptyExamination()
        this.treatmentRow = [this.emptydrTreat()];
        this.treatmentGridOption.api.setRowData(this.treatmentRow);
    };
    __decorate([
        core_1.HostListener('keydown', ['$event'])
    ], DocEntryComponent.prototype, "onKeydown");
    DocEntryComponent = __decorate([
        core_1.Component({
            selector: 'app-doc-entry',
            templateUrl: './doc-entry.component.html',
            styleUrls: ['./doc-entry.component.css'],
            providers: [
                { provide: core_2.DateAdapter, useClass: material_moment_adapter_1.MomentDateAdapter, deps: [core_2.MAT_DATE_LOCALE] },
                { provide: core_2.MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
            ]
        })
    ], DocEntryComponent);
    return DocEntryComponent;
}());
exports.DocEntryComponent = DocEntryComponent;
