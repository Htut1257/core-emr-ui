"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DoctorSetupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var doctor_model_1 = require("src/app/core/model/doctor.model");
var initial_dialog_component_1 = require("../../initial/initial-dialog/initial-dialog.component");
var gender_dialog_component_1 = require("../../gender/gender-dialog/gender-dialog.component");
var speciality_dialog_component_1 = require("../../speciality/speciality-dialog/speciality-dialog.component");
var autocomplete_cell_1 = require("src/app/shared/cell-renderer/autocomplete-cell");
var DoctorSetupComponent = /** @class */ (function () {
    function DoctorSetupComponent(doctorService, genderService, initialService, specialService, commonService, toastService, formBuilder, dialog) {
        var _this = this;
        this.doctorService = doctorService;
        this.genderService = genderService;
        this.initialService = initialService;
        this.specialService = specialService;
        this.commonService = commonService;
        this.toastService = toastService;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.opdFees = [];
        this.otFees = [];
        this.dcFees = [];
        this.genders = [];
        this.initials = [];
        this.specials = [];
        this.type = [];
        this.doctorId = '';
        this.type = doctor_model_1.Type;
        this.frameworkComponents = {
            autoComplete: autocomplete_cell_1.AutocompleteCell
        };
        this.commonService.isMobileObj$.subscribe(function (data) {
            if (data == false) {
                _this.doctor = _this.doctorService._doctor;
                if (_this.doctor != undefined) {
                    _this.doctorId = _this.doctor.doctorId;
                    _this.initializeFormData(_this.doctor);
                }
            }
        });
    }
    DoctorSetupComponent.prototype.ngOnInit = function () {
        this.initializeForm();
        this.getOpdData();
        this.getOtData();
        this.getDcData();
        this.initializeGrid();
        this.getGender();
        this.getInitial();
        this.getSpeciality();
    };
    DoctorSetupComponent.prototype.ngOnDestroy = function () {
        if (this.subscribe) {
            this.subscribe.unsubscribe();
        }
    };
    DoctorSetupComponent.prototype.initializeForm = function () {
        this.doctorForm = this.formBuilder.group({
            doctorId: [{ value: null, disabled: true }],
            doctorName: ['', forms_1.Validators.required],
            gender: [null, forms_1.Validators.required],
            speciality: [null],
            initial: [null, forms_1.Validators.required],
            licenseNo: [''],
            type: [null, forms_1.Validators.required],
            active: [true]
        });
    };
    DoctorSetupComponent.prototype.initializeFormData = function (data) {
        console.log(data);
        this.doctorForm.patchValue({
            doctorId: data.doctorId,
            doctorName: data.doctorName,
            gender: data.genderId,
            speciality: '',
            initial: data.initialID,
            licenseNo: data.licenseNo,
            active: data.active
        });
    };
    DoctorSetupComponent.prototype.getGender = function () {
        var _this = this;
        this.genderService.getGender().subscribe({
            next: function (genders) {
                _this.genders = genders;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DoctorSetupComponent.prototype.getInitial = function () {
        var _this = this;
        this.initialService.getInitial().subscribe({
            next: function (initials) {
                _this.initials = initials;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DoctorSetupComponent.prototype.getSpeciality = function () {
        var _this = this;
        this.specialService.getAllSpeciality().subscribe({
            next: function (specials) {
                _this.specials = specials;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DoctorSetupComponent.prototype.genderDisplayFn = function (item) {
        return item ? item.description : '';
    };
    DoctorSetupComponent.prototype.initialDisplayFn = function (item) {
        return item ? item.initialName : '';
    };
    DoctorSetupComponent.prototype.specialDisplayFn = function (item) {
        return item ? item.desp : '';
    };
    DoctorSetupComponent.prototype.initializeGrid = function () {
        this.opdFeeGridOption = {
            columnDefs: this.opdFeeColumnDef,
            rowData: this.opdFeeRow,
            suppressScrollOnNewData: false,
            rowHeight: 22,
            suppressHorizontalScroll: true,
            defaultColDef: {
                resizable: true
            }
        };
        this.otFeeGridOption = {
            columnDefs: this.otFeeColumnDef,
            rowData: this.otFeeRow,
            suppressScrollOnNewData: false,
            rowHeight: 22,
            suppressHorizontalScroll: true,
            defaultColDef: {
                resizable: true
            }
        };
        this.dcFeeGridOption = {
            columnDefs: this.dcFeeColumnDef,
            rowData: this.dcFeeRow,
            suppressScrollOnNewData: false,
            rowHeight: 22,
            suppressHorizontalScroll: true,
            defaultColDef: {
                resizable: true
            }
        };
    };
    DoctorSetupComponent.prototype.onGridOptionReadyOpdFee = function (param) {
        this.opdFeeApi = param.api;
        this.opdFeeColumn = param.columnApi;
        this.opdFeeApi.sizeColumnsToFit();
    };
    DoctorSetupComponent.prototype.onGridOptionReadyOtFee = function (param) {
        this.otFeeApi = param.api;
        this.otFeeColumn = param.columnApi;
        this.otFeeApi.sizeColumnsToFit();
    };
    DoctorSetupComponent.prototype.onGridOptionReadyDcFee = function (param) {
        this.dcFeeApi = param.api;
        this.dcFeeColumn = param.columnApi;
        this.dcFeeApi.sizeColumnsToFit();
    };
    //column and row defination for opd
    DoctorSetupComponent.prototype.getOpdData = function () {
        this.opdFeeColumnDef = [
            {
                headerName: 'OPD Service',
                field: 'opdFeeObj',
                width: 100,
                editable: true,
                cellEditor: 'autoComplete',
                cellEditorParams: {
                    'propertyRendered': 'serviceName',
                    'returnObject': true,
                    'columnDefs': [
                        {
                            headerName: 'Code',
                            field: 'serviceId',
                            width: 40
                        },
                        {
                            headerName: 'Description',
                            field: 'serviceName',
                            width: 100
                        },
                        {
                            headerName: 'Fee',
                            field: 'fees',
                            width: 40
                        },
                    ]
                },
                valueFormatter: function (params) {
                    if (params.value) {
                        return params.value.serviceName;
                    }
                    return "";
                }
            },
            {
                headerName: 'OPD Fee',
                field: 'opdFeeObj.fees',
                type: 'rightAligned',
                width: 100,
                editable: true
            }
        ];
        this.opdFeeRow = [
            {
                opdFeeObj: {
                    serviceId: '',
                    serviceName: '',
                    fees: ''
                },
                fee: ''
            },
        ];
    };
    //column and row defination for ot
    DoctorSetupComponent.prototype.getOtData = function () {
        this.otFeeColumnDef = [
            {
                headerName: 'OT Service',
                field: 'service',
                width: 100,
                editable: true
            },
            {
                headerName: 'OT Fee',
                field: 'fee',
                width: 100,
                editable: true
            }
        ];
        this.otFeeRow = [
            { service: '', fee: '' }
        ];
    };
    //column and row defination for dc
    DoctorSetupComponent.prototype.getDcData = function () {
        this.dcFeeColumnDef = [
            {
                headerName: 'DC Service',
                field: 'service',
                width: 100,
                editable: true
            },
            {
                headerName: 'DC Fee',
                field: 'fee',
                width: 100,
                editable: true
            }
        ];
        this.dcFeeRow = [
            { service: '', fee: '' }
        ];
    };
    DoctorSetupComponent.prototype.emptyOpd = function () {
        return {
            opdFeeObj: {
                serviceId: '',
                serviceName: '',
                fees: 0
            },
            fee: 0
        };
    };
    DoctorSetupComponent.prototype.cellEditingStopped = function (event) {
        var columnField = event.colDef.field;
        var rowData = event.data;
        var row = event.rowIndex;
        var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
        if (this.opdFeeApi.getFocusedCell()) {
            this.opdCellEvent(row, firstEditCol, columnField, this.opdFeeApi, rowData, this.opdFees);
        }
    };
    //cell Editing event for OpdTable
    DoctorSetupComponent.prototype.opdCellEvent = function (rowIndex, firstColumn, columnField, gridApi, rowData, lstRow) {
        var data = rowData;
        if (columnField == "opdFeeObj") {
            data.fee = data.opdFeeObj.fees;
            this.addNewRowtoTable(rowIndex, firstColumn, gridApi, rowData, lstRow, this.emptyOpd());
            this.focusTableCell(rowIndex + 1, firstColumn, gridApi);
        }
        if (columnField == "opdFeeObj.fees") {
            console.log(data);
        }
    };
    //cell Editing event for Ot Table
    DoctorSetupComponent.prototype.otCellEvent = function (rowIndex, firstColumn, columnField, gridApi, rowData, lstRow) {
        var data = rowData;
    };
    //cell Editing event for Dc Table
    DoctorSetupComponent.prototype.dcCellEvent = function (rowIndex, firstColumn, columnField, gridApi, rowData, lstRow) {
        var data = rowData;
    };
    //add new row to table
    DoctorSetupComponent.prototype.addNewRowtoTable = function (rowIndex, firstColumn, gridApi, rowData, lstRow, rowObj) {
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
    DoctorSetupComponent.prototype.setRowDatatoTable = function (rowIndex, tableRow, rowData, gridApi, gridOption, rowObj) {
        tableRow[rowIndex] = rowData;
        gridOption.api.setRowData(tableRow);
        gridApi.applyTransaction({
            add: [rowObj]
        });
    };
    //focusing table cell
    DoctorSetupComponent.prototype.focusTableCell = function (rowIndex, column, gridApi) {
        gridApi.ensureIndexVisible(0);
        gridApi.ensureColumnVisible(column);
        gridApi.setFocusedCell(rowIndex, column);
    };
    DoctorSetupComponent.prototype.openInitial = function (event) {
        event.stopPropagation();
        this.dialog.open(initial_dialog_component_1.InitialDialogComponent, {
            disableClose: true,
            width: '40%',
            data: {
                'title': 'Appointment Search',
                'status': '-'
            }
        });
    };
    DoctorSetupComponent.prototype.openGender = function (event) {
        event.stopPropagation();
        this.dialog.open(gender_dialog_component_1.GenderDialogComponent, {
            disableClose: true,
            width: '40%',
            data: {
                'title': 'Appointment Search',
                'status': '-'
            }
        });
    };
    DoctorSetupComponent.prototype.openSpeciality = function (event) {
        event.stopPropagation();
        this.dialog.open(speciality_dialog_component_1.SpecialityDialogComponent, {
            disableClose: true,
            width: '40%',
            data: {
                'title': 'Appointment Search',
                'status': '-'
            }
        });
    };
    DoctorSetupComponent.prototype.saveOpdFee = function () {
        var opdDocFee = [];
        for (var i = 0; i < this.opdFees.length; i++) {
            var item = this.opdFees[i].opdFeeObj;
            console.log(item);
            var someValue = {
                mapId: '',
                drId: '047',
                serviceId: item.serviceId,
                serviceName: item.serviceName,
                fees: item.fees,
                uniqueId: i + 1
            };
            opdDocFee.push(someValue);
        }
        return opdDocFee;
    };
    DoctorSetupComponent.prototype.onSaveDoctor = function (data) {
        this.doctor = data;
        this.doctor.doctorId = this.doctorId;
        this.doctor.genderId = data.gender.genderId;
        this.doctor.speciality = data.speciality.specId;
        this.doctor.initialID = data.initial.initialId;
        this.doctor.nirc = data.nirc;
        this.doctor.licenseNo = data.licenseNo;
        this.doctor.drType = data.type;
        this.doctor.listOPD = this.saveOpdFee();
        console.log(this.doctor);
        this.doctorService.saveDoctor(this.doctor).subscribe({
            next: function (doctor) {
                console.log(doctor);
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DoctorSetupComponent.prototype.onNew = function () {
    };
    DoctorSetupComponent.prototype.onClear = function () {
    };
    DoctorSetupComponent.prototype.clearForm = function () {
    };
    __decorate([
        core_1.ViewChild("reactiveForm", { static: true })
    ], DoctorSetupComponent.prototype, "reactiveForm");
    DoctorSetupComponent = __decorate([
        core_1.Component({
            selector: 'app-doctor-setup',
            templateUrl: './doctor-setup.component.html',
            styleUrls: ['./doctor-setup.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], DoctorSetupComponent);
    return DoctorSetupComponent;
}());
exports.DoctorSetupComponent = DoctorSetupComponent;
