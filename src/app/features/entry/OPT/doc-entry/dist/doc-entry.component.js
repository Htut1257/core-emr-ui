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
var autocomplete_multiselect_cell_1 = require("src/app/shared/cell-renderer/autocomplete-multiselect-cell");
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
    function DocEntryComponent(route, docService, vitalService, entryService, autoService, appointService, userService, cfFeeService, visitDateService, serverService, dialog) {
        this.route = route;
        this.docService = docService;
        this.vitalService = vitalService;
        this.entryService = entryService;
        this.autoService = autoService;
        this.appointService = appointService;
        this.userService = userService;
        this.cfFeeService = cfFeeService;
        this.visitDateService = visitDateService;
        this.serverService = serverService;
        this.dialog = dialog;
        //table grid navigation for cell
        this.loop = false;
        this.drExamination = [];
        this.drTreatment = [];
        this.drNote = [];
        this.cfFees = [];
        this.opdVisitDate = [];
        this.foc = false;
        this.pharmacyDays = 1;
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.frameworkComponents = {
            autoComplete: autocomplete_cell_1.AutocompleteCell,
            autoCompletemulti: autocomplete_multiselect_cell_1.AutocompleteCellMultiSelect,
            checkboxRenderer: checkbox_cell_1.CheckboxRenderer
        };
        this.examObj = {};
        this.user = this.userService.getUserValue();
        if (this.user) {
            this.doctorId = this.user.doctorId;
            this.getDoctorCfFee(this.doctorId);
            this.getDoctorBookingStatus(this.doctorId, this.todayDate);
        }
    }
    DocEntryComponent.prototype.ngOnInit = function () {
        this.reVisitDate = this.todayDate;
        this.getExaminationData();
        this.getTreatmentData();
        this.getNoteData();
        this.InitializeGridTable();
        this.getServerSideData();
        // this.getVisitDate()
    };
    DocEntryComponent.prototype.onInitData = function (booking) {
        this.booking = booking;
        this.bookingId = booking.bookingId.toString();
        this.bookingDate = booking.bkDate.toString();
        this.regNo = booking.regNo;
        this.patientName = booking.patientName;
        this.getVitalSign(booking.bookingId.toString());
    };
    DocEntryComponent.prototype.getServerSideData = function () {
        var _this = this;
        var uri = '/opdBooking/getMessage';
        this.serverService.getServerSource(uri).subscribe(function (data) {
            var serverData = JSON.parse(data.data);
            _this.booking = serverData;
            if (serverData.bstatus == "Doctor Room") {
                if (_this.doctorId == serverData.doctorId) { //
                    _this.onInitData(_this.booking);
                }
            }
        });
    };
    //get Booking status
    DocEntryComponent.prototype.getDoctorBookingStatus = function (id, date) {
        this.appointService.getDoctorBookingStatus(id, date).subscribe({
            next: function (docBookings) {
                console.log(docBookings);
            }
        });
    };
    DocEntryComponent.prototype.getDocMedicalHistory = function (visitId) {
        var _this = this;
        this.entryService.getDoctorMedicalByVisitId(visitId).subscribe({
            next: function (entry) {
                console.log(entry);
                if (entry != null) {
                    var data = entry;
                    _this.medicalHisId = data.id;
                    _this.cfFee = data.cfFees;
                    _this.pharmacyDays = data.treatments[0].days;
                    _this.reVisitDate = moment(data.reVisitDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
                    _this.cfFeeobj = data.cfType;
                    _this.renderExaminationData(data.examinations);
                    _this.renderTreatmetData(data.treatments);
                    _this.renderDocNote(data.kvDrNotes);
                }
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DocEntryComponent.prototype.renderExaminationData = function (data) {
        this.examinationRow = data.reduce(function (filtered, option) {
            var someNewValue = {
                examinationObj: {
                    desc: option.desc
                }
            };
            filtered.push(someNewValue);
            return filtered;
        }, []);
        for (var _i = 0, _a = this.examinationRow; _i < _a.length; _i++) {
            var item = _a[_i];
            this.drExamination.push(item);
        }
        this.examinationRow.push(this.emptyExamination());
        this.examinationGridOption.api.setRowData(this.examinationRow);
    };
    DocEntryComponent.prototype.renderTreatmetData = function (data) {
        this.treatmentRow = data.reduce(function (filtered, option) {
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
                    itemUnit: option.itemUnit
                },
                patternObj: option.pattern,
                day: option.days,
                qty: option.qty,
                remark: option.remark
            };
            filtered.push(someValue);
            return filtered;
        }, []);
        for (var _i = 0, _a = this.treatmentRow; _i < _a.length; _i++) {
            var item = _a[_i];
            this.drTreatment.push(item);
        }
        var treatRow = this.emptydrTreat();
        treatRow.day = this.pharmacyDays;
        this.treatmentRow.push(treatRow);
        this.treatmentGridOption.api.setRowData(this.treatmentRow);
    };
    DocEntryComponent.prototype.renderDocNote = function (data) {
        this.noteRow = data;
        this.noteRow.push(this.emptyNote);
        for (var _i = 0, _a = this.noteRow; _i < _a.length; _i++) {
            var item = _a[_i];
            this.drNote.push(item);
        }
        this.noteGridOption.api.setRowData(this.noteRow);
    };
    DocEntryComponent.prototype.getVitalSign = function (bookingId) {
        var _this = this;
        this.vitalService.getVitalSignByPatient(bookingId).subscribe({
            next: function (vitalSign) {
                if (vitalSign != null) {
                    _this.vitalSign = vitalSign;
                    _this.temp = _this.vitalSign.temperature ? _this.vitalSign.bpLower : '0';
                    _this.bp = _this.vitalSign.bpUpper ? _this.vitalSign.bpUpper : '0' + "/" + _this.vitalSign.bpLower ? _this.vitalSign.bpLower : '0';
                }
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
                console.log(fees);
                _this.cfFees = fees;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DocEntryComponent.prototype.getDoctorFeeData = function (fees) {
        this.cfFeeobj = fees;
        this.cfFee = fees.fees;
    };
    DocEntryComponent.prototype.compareCfType = function (fee1, fee2) {
        return fee1 && fee2 ? fee1.serviceId === fee2.serviceId : fee1 === fee2;
    };
    DocEntryComponent.prototype.getVisitDate = function () {
        var _this = this;
        this.visitDateService.getReVisitDate().subscribe({
            next: function (visitDate) {
                _this.opdVisitDate = visitDate;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DocEntryComponent.prototype.getReVisitData = function (row) {
    };
    DocEntryComponent.prototype.InitializeGridTable = function () {
        this.examinationGridOption = {
            columnDefs: this.examinationColumnDef,
            rowData: this.examinationRow,
            suppressScrollOnNewData: false,
            stopEditingWhenCellsLoseFocus: true
        };
        this.treatmentGridOption = {
            columnDefs: this.treatmentColumnDef,
            rowData: this.treatmentRow,
            suppressScrollOnNewData: false,
            defaultColDef: {
                resizable: true
            },
            stopEditingWhenCellsLoseFocus: true
        };
        this.noteGridOption = {
            columnDefs: this.noteColumnDef,
            rowData: this.noteRow,
            suppressScrollOnNewData: false,
            stopEditingWhenCellsLoseFocus: true
        };
    };
    //table for diagnosis 
    DocEntryComponent.prototype.onGriReadyExamination = function (params) {
        this.examinationApi = params.api;
        this.examinationColumn = params.columnApi;
        this.examinationApi.sizeColumnsToFit();
    };
    //table for treatment
    DocEntryComponent.prototype.onGridReadyTreatment = function (params) {
        this.treatmentApi = params.api;
        this.treatmentColumn = params.columnApi;
        this.treatmentApi.sizeColumnsToFit();
        //this.treatmentColumn.autoSizeAllColumns()
    };
    //table for note
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
                cellEditor: 'autoCompletemulti',
                cellEditorParams: {
                    'propertyRendered': 'desc',
                    'returnObject': true,
                    'columnDefs': [
                        { headerName: 'Name', field: 'desc' },
                    ]
                },
                valueFormatter: function (params) {
                    if (params.value) {
                        return params.value.desc;
                    }
                    return params.value;
                }
            },
        ];
        this.examinationRow = [
            this.emptyExamination()
        ];
    };
    DocEntryComponent.prototype.getTreatmentData = function () {
        this.treatmentColumnDef = [
            {
                headerName: "Description",
                field: "cityObject",
                editable: true,
                width: 100,
                cellEditor: 'autoComplete',
                cellEditorParams: {
                    'propertyRendered': 'itemName',
                    'returnObject': true,
                    'columnDefs': [
                        { headerName: 'Name', field: 'itemName', width: 100 },
                        { headerName: 'Option', field: 'itemOption', width: 50 },
                        { headerName: 'Type', field: 'itemType', width: 50 }
                    ]
                },
                valueFormatter: function (params) {
                    if (params.value) {
                        return params.value.itemName;
                    }
                    return "";
                }
            },
            {
                headerName: "Pattern",
                field: "patternObj",
                width: 30,
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
                headerName: "Days",
                field: "day",
                width: 25,
                editable: function (params) { return params.data.cityObject.itemOption == "Pharmacy"; },
                type: 'rightAligned'
            },
            {
                headerName: "Qty",
                field: "qty",
                width: 30,
                editable: function (params) { return params.data.cityObject.itemOption == "Pharmacy"; },
                type: 'rightAligned'
            },
            {
                headerName: "Remark",
                field: "remark",
                width: 100,
                editable: true
            },
            {
                headerName: "Option",
                field: "cityObject.itemOption",
                width: 50,
                editable: false
            },
        ];
        this.treatmentRow = [
            this.emptydrTreat()
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
            this.emptyNote()
        ];
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
                despEng: '',
                id: '',
                despMM: '',
                factor: 0
            },
            day: 1,
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
    //grid navigation
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
    //navigate grid func
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
    //navigate each cell in table
    DocEntryComponent.prototype.navigateTreatmentGrid = function () {
        var cell = this.treatmentApi.getFocusedCell();
        if (cell != undefined) {
            var colName = cell.column.colId;
            switch (colName) {
                case "cityObject": {
                    this.cellNavigation("#examinationGrid", 'examinationObj', this.examinationApi, this.treatmentApi);
                    break;
                }
                case "cityObject.itemOption": {
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
    //navigate each cell in table
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
            if (rowData.examinationObj.desc == "") {
                this.examinationApi.setFocusedCell(row, columnField);
                return;
            }
            this.addNewRowtoTable(row, firstEditCol, this.examinationApi, rowData, this.drExamination, this.emptyExamination());
            this.focusTableCell(row, firstEditCol, this.examinationApi);
        }
        if (this.treatmentApi.getFocusedCell()) {
            if (columnField == "cityObject") {
                var itemType = rowData.cityObject.itemOption;
                if (rowData.cityObject.itemId == '') {
                    this.treatmentApi.setFocusedCell(row, columnField);
                    return;
                }
                if (itemType == "Pharmacy") {
                    var treatRow_1 = this.emptydrTreat();
                    treatRow_1.day = this.pharmacyDays;
                    this.addNewRowtoTable(row, firstEditCol, this.treatmentApi, rowData, this.drTreatment, treatRow_1);
                    this.treatmentApi.setFocusedCell(row, "patternObj");
                    return;
                }
                rowData.qty = 1;
                rowData.day = '';
                this.treatmentRow[row] = rowData;
                this.treatmentGridOption.api.setRowData(this.treatmentRow);
                var treatRow = this.emptydrTreat();
                treatRow.day = this.pharmacyDays;
                this.addNewRowtoTable(row, firstEditCol, this.treatmentApi, rowData, this.drTreatment, treatRow);
                this.focusTableCell(row + 1, firstEditCol, this.treatmentApi);
            }
            if (columnField == "patternObj") {
                this.treatmentApi.setFocusedCell(row, columnField);
                rowData.qty = rowData.patternObj.factor * rowData.day;
                this.treatmentRow[row] = rowData;
                this.treatmentGridOption.api.setRowData(this.treatmentRow);
                var treatRow = this.emptydrTreat();
                treatRow.day = this.pharmacyDays;
                this.treatmentApi.applyTransaction({
                    add: [treatRow]
                });
                this.focusTableCell(row + 1, firstEditCol, this.treatmentApi);
            }
            if (columnField == "day") {
                this.treatmentApi.setFocusedCell(row, columnField);
                rowData.qty = rowData.patternObj.factor * rowData.day;
                var rowIndex = this.treatmentGridOption.api.getRowNode(event.node.id).rowIndex;
                this.treatmentRow[rowIndex] = rowData;
                this.treatmentGridOption.api.setRowData(this.treatmentRow);
                this.reVisitDate = moment(this.reVisitDate, "YYYY-MM-DD").add(rowData.day, 'day').format('YYYY-MM-DD');
            }
            if (columnField == "remark") {
                // let treatRow: any = this.emptydrTreat()
                // treatRow.day = rowData.day
                // this.addNewRowtoTable(row, firstEditCol, this.treatmentApi, rowData, this.drTreatment, treatRow)
            }
        }
        if (this.noteApi.getFocusedCell()) {
            if (columnField == "key") {
                this.noteApi.setFocusedCell(row, "value");
            }
            if (columnField == "value") {
                this.addNewRowtoTable(row, firstEditCol, this.noteApi, rowData, this.drNote, this.emptyNote());
                this.focusTableCell(row + 1, firstEditCol, this.noteApi);
            }
        }
    };
    //add new row to table
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
            // gridApi.ensureIndexVisible(0)
            // gridApi.ensureColumnVisible(firstColumn);
            // gridApi.setFocusedCell(rowIndex + 1, firstColumn);
        }
    };
    //focusing table cell
    DocEntryComponent.prototype.focusTableCell = function (rowIndex, column, gridApi) {
        gridApi.ensureIndexVisible(0);
        gridApi.ensureColumnVisible(column);
        gridApi.setFocusedCell(rowIndex, column);
    };
    //set date and pharmancy day
    DocEntryComponent.prototype.confirmPharmacyDate = function () {
        this.reVisitDate = this.todayDate;
        for (var _i = 0, _a = this.treatmentRow; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.cityObject.itemOption == "Pharmacy") {
                item.day = this.pharmacyDays;
                item.qty = this.pharmacyDays * item.patternObj.factor;
            }
        }
        this.treatmentGridOption.api.setRowData(this.treatmentRow);
        var treatRow = this.emptydrTreat();
        treatRow.day = this.pharmacyDays;
        if (this.drTreatment.length >= this.treatmentRow.length) {
            this.treatmentApi.applyTransaction({
                add: [treatRow]
            });
        }
        this.reVisitDate = moment(this.reVisitDate, "YYYY-MM-DD").add(this.pharmacyDays, 'day').format('YYYY-MM-DD');
    };
    //search the patient of current doctor session 
    DocEntryComponent.prototype.searchPatient = function () {
        var _this = this;
        this.dialog.open(appointment_patient_dialog_component_1.AppointmentPatientDialogComponent, {
            disableClose: false,
            width: '100%',
            data: { 'data key': 'data value' }
        }).afterClosed().subscribe({
            next: function (booking) {
                console.log(booking);
                if (booking) {
                    _this.booking = booking;
                    _this.onInitData(_this.booking);
                    _this.getDocMedicalHistory(_this.booking.bookingId);
                }
            },
            error: function (err) {
                console.trace(err);
            }
        });
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
    //save all data
    DocEntryComponent.prototype.saveMedHistory = function () {
        var _this = this;
        console.log(this.savetoDrExam());
        var docMedic = {
            id: this.medicalHisId,
            visitId: this.booking.bookingId,
            visitDate: this.booking.bkDate,
            regNo: this.booking.regNo,
            admissionNo: '',
            patientName: this.booking.patientName,
            drId: this.booking.doctorId,
            drName: this.booking.doctorName,
            cfType: this.cfFeeobj,
            cfFees: this.cfFee,
            reVisitDate: this.reVisitDate,
            drNotes: this.doctorNote,
            isFoc: this.foc,
            examinations: this.savetoDrExam(),
            treatments: this.savetoDrTreatment(),
            kvDrNotes: this.drNote
        };
        var booking = this.booking;
        booking.bStatus = booking.bstatus;
        return;
        this.entryService.saveDoctorMedical(docMedic).subscribe({
            next: function (data) {
                _this.appointService.updateAppointmentStatus(booking).subscribe({
                    next: function (booking) {
                        console.log("status changed");
                        console.log(booking);
                        _this.onClear();
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
    DocEntryComponent.prototype.onClear = function () {
        this.examinationRow = [this.emptyExamination()];
        this.treatmentRow = [this.emptydrTreat()];
        this.noteRow = [this.emptyNote()];
        this.examinationGridOption.api.setRowData(this.examinationRow);
        this.treatmentGridOption.api.setRowData(this.treatmentRow);
        this.noteGridOption.api.setRowData(this.noteRow);
        this.drExamination = [];
        this.drTreatment = [];
        this.drNote = [];
        this.bookingId = '';
        this.bookingDate = '';
        this.regNo = '';
        this.patientName = '';
        this.cfFee = 0;
        this.pharmacyDays = 0;
        this.reVisitDate = this.todayDate;
        this.doctorNote = '';
        this.temp = 0;
        this.bp = '';
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
            ],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], DocEntryComponent);
    return DocEntryComponent;
}());
exports.DocEntryComponent = DocEntryComponent;
