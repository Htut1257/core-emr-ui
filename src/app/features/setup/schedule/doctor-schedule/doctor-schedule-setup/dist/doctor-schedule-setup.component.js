"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DoctorScheduleSetupComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var autocomplete_cell_1 = require("src/app/shared/cell-renderer/autocomplete-cell");
var checkbox_cell_1 = require("src/app/shared/cell-renderer/checkbox-cell");
var moment = require("moment");
var DoctorScheduleSetupComponent = /** @class */ (function () {
    function DoctorScheduleSetupComponent(scheduleService, weekService, docService, commonService, toastService, fb) {
        var _this = this;
        this.scheduleService = scheduleService;
        this.weekService = weekService;
        this.docService = docService;
        this.commonService = commonService;
        this.toastService = toastService;
        this.fb = fb;
        this.docSchedules = [];
        //#endregion grid variables
        this.templateId = null;
        this.weekDay = [];
        this.todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD');
        this.todayTime = moment(new Date(), 'MM/DD/YYYY').format('HH:mm');
        this.frameworkComponents = {
            autoComplete: autocomplete_cell_1.AutocompleteCell,
            checkBox: checkbox_cell_1.CheckboxRenderer
        };
        this.commonService.isMobileObj$.subscribe(function (data) {
            if (data == false) {
                if (_this.docService._doctor != undefined) {
                    _this.doctor = _this.docService._doctor;
                    // this.initializeFormData(this.doctor)
                    _this.getDoctorSchedule(_this.doctor.doctorId);
                }
            }
        });
    }
    DoctorScheduleSetupComponent.prototype.ngOnInit = function () {
        //this.initializeForm()
        this.getScheduleTemplateData();
        //  this.getDoctorScheduleTemplateData()
        this.initializeGrid();
        //this.getWeekDay()
    };
    DoctorScheduleSetupComponent.prototype.ngOnDestroy = function () {
    };
    DoctorScheduleSetupComponent.prototype.initializeForm = function () {
        this.schForm = this.fb.group({
            day: [null],
            doctor: [''],
            fromTime: [this.todayTime, forms_1.Validators.required],
            toTime: [this.todayTime, forms_1.Validators.required],
            limitCount: [0],
            status: [true]
        });
    };
    DoctorScheduleSetupComponent.prototype.initializeFormData = function (data) {
        this.schForm.patchValue({
            doctor: this.doctor.doctorName
        });
    };
    DoctorScheduleSetupComponent.prototype.getDoctorSchedule = function (docId) {
        var _this = this;
        this.scheduleService.getDoctorSchedule(docId).pipe(rxjs_1.map(function (item) {
            console.log(item);
            return item.filter(function (data) {
                data.fromTimeString = moment(_this.todayDate + " " + data.fromTime).format('hh:mm A');
                data.toTimeString = moment(_this.todayDate + " " + data.toTime).format('hh:mm A');
                return data;
            });
        })).subscribe({
            next: function (schedules) {
                _this.docSchedules = schedules;
                _this.renderScheduleTemplate(_this.docSchedules);
                // this.schRow = this.docSchedules
                // this.schApi.setRowData(this.schRow)
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DoctorScheduleSetupComponent.prototype.renderScheduleTemplate = function (data) {
        this.schRow = data.reduce(function (filter, option) {
            var someValue = {
                templateId: option.templateId,
                dayObj: {
                    dayId: option.dayId, dayName: option.dayName
                },
                fromTimeString: option.fromTimeString,
                toTimeString: option.toTimeString,
                limitCount: option.limitCount,
                actStatus: option.actStatus
            };
            filter.push(someValue);
            return filter;
        }, []);
        this.schRow.push(this.emptySchedule());
        this.schApi.setRowData(this.schRow);
    };
    DoctorScheduleSetupComponent.prototype.getWeekDay = function () {
        var _this = this;
        this.weekService.getWeekDay().subscribe({
            next: function (days) {
                _this.weekDay = days;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DoctorScheduleSetupComponent.prototype.initializeGrid = function () {
        this.schGridOption = {
            columnDefs: this.schColumnDef,
            rowData: this.schRow,
            suppressScrollOnNewData: false
        };
        this.docSchGridOption = {
            columnDefs: this.docSchColumnDef,
            rowData: this.docSchRow,
            suppressScrollOnNewData: false
        };
    };
    DoctorScheduleSetupComponent.prototype.onGridReadySchedule = function (params) {
        this.schApi = params.api;
        this.schColumn = params.columnApi;
        this.schApi.sizeColumnsToFit();
    };
    DoctorScheduleSetupComponent.prototype.onGridReadyDoctorSchedule = function (params) {
        this.docSchApi = params.api;
        this.docSchColumn = params.columnApi;
        this.docSchApi.sizeColumnsToFit();
    };
    //column and row defination for opd
    DoctorScheduleSetupComponent.prototype.getScheduleTemplateData = function () {
        this.schColumnDef = [
            {
                headerName: "Days",
                field: "dayObj",
                width: 25,
                editable: true,
                cellEditor: 'autoComplete',
                cellEditorParams: {
                    'propertyRendered': 'dayName',
                    'returnObject': true,
                    'columnDefs': [
                        { headerName: 'Day', field: 'dayName' },
                    ]
                },
                valueFormatter: function (params) {
                    if (params.value) {
                        return params.value.dayName;
                    }
                    return "";
                }
            },
            {
                headerName: "From",
                field: "fromTimeString",
                width: 25,
                editable: true
            },
            {
                headerName: "To",
                field: "toTimeString",
                width: 25,
                editable: true
            },
            {
                headerName: "Limit",
                field: "limitCount",
                width: 25,
                editable: true,
                type: 'rightAligned'
            },
            {
                headerName: "Status",
                field: "actStatus",
                width: 25,
                cellRenderer: "checkBox"
            },
        ];
        this.schRow = [];
    };
    DoctorScheduleSetupComponent.prototype.emptySchedule = function () {
        return {
            templateId: null,
            dayObj: {
                dayId: '', dayName: ''
            },
            fromTimeString: '',
            toTimeString: '',
            limitCount: 0,
            actStatus: true
        };
    };
    //column and row defination for opd
    DoctorScheduleSetupComponent.prototype.getDoctorScheduleTemplateData = function () {
        this.docSchColumnDef = [
            {
                headerName: "Days",
                field: "day",
                width: 25
            },
            {
                headerName: "From",
                field: "fromTime",
                width: 25
            },
            {
                headerName: "To",
                field: "toTime",
                width: 25
            },
            {
                headerName: "Limit",
                field: "limitCount",
                width: 25,
                type: 'rightAligned'
            },
            {
                headerName: "Status",
                field: "status",
                width: 25,
                cellRenderer: "checkBox"
            },
        ];
        this.docSchRow = [];
    };
    DoctorScheduleSetupComponent.prototype.cellValueChanged = function (event) {
        var columnField = event.colDef.field;
        var rowData = event.data;
        var rowIndex = event.rowIndex;
        var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
        console.log(columnField);
        if (columnField == "actStatus") {
            if (rowData.templateId != null) {
                this.onSaveSchedule(rowData);
            }
            this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule());
        }
    };
    DoctorScheduleSetupComponent.prototype.cellEditingStopped = function (event) {
        var columnField = event.colDef.field;
        var rowData = event.data;
        var row = event.rowIndex;
        var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
        if (this.schApi.getFocusedCell()) {
            this.scheduleCellEvent(row, firstEditCol, columnField, this.schApi, rowData, []);
        }
    };
    DoctorScheduleSetupComponent.prototype.scheduleCellEvent = function (rowIndex, firstColumn, columnField, gridApi, rowData, lstRow) {
        var data = rowData;
        var validTime = "";
        if (columnField == "dayObj") {
            if (data.dayObj.dayId == '') {
                this.focusTableCell(rowIndex, columnField, gridApi);
                return;
            }
            this.focusTableCell(rowIndex, "fromTimeString", gridApi);
        }
        if (columnField == "fromTimeString") {
            validTime = this.validateTime(data.fromTimeString);
            if (validTime == null) {
                this.toastService.showWarningToast("", "Please Enter valid time ,format hour:min am/pm");
                data.fromTimeString = "";
                this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule());
                this.focusTableCell(rowIndex, "fromTimeString", gridApi);
                return;
            }
            data.fromTimeString = validTime;
            this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule());
            this.focusTableCell(rowIndex, "toTimeString", gridApi);
        }
        if (columnField == "toTimeString") {
            validTime = this.validateTime(data.toTimeString);
            if (validTime == null) {
                this.toastService.showWarningToast("", "Please Enter valid time ,format hour:min am/pm");
                data.toTimeString = "";
                this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule());
                this.focusTableCell(rowIndex, "toTimeString", gridApi);
                return;
            }
            data.toTimeString = validTime;
            this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule());
            this.focusTableCell(rowIndex, "limitCount", gridApi);
        }
        if (columnField == "limitCount") {
            this.onSaveSchedule(rowData);
            this.addNewRowtoTable(rowIndex, firstColumn, gridApi, data, lstRow, this.emptySchedule());
            this.focusTableCell(rowIndex + 1, "dayObj", gridApi);
            return;
        }
        if (data.templateId != null) {
            this.onSaveSchedule(rowData);
        }
    };
    //add new row to table
    DoctorScheduleSetupComponent.prototype.addNewRowtoTable = function (rowIndex, firstColumn, gridApi, rowData, lstRow, rowObj) {
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
    DoctorScheduleSetupComponent.prototype.setRowDatatoTable = function (rowIndex, tableRow, rowData, gridApi, gridOption, rowObj) {
        tableRow[rowIndex] = rowData;
        gridOption.api.setRowData(tableRow);
        // gridApi.applyTransaction({
        //   add: [rowObj]
        // })
    };
    //focusing table cell
    DoctorScheduleSetupComponent.prototype.focusTableCell = function (rowIndex, column, gridApi) {
        gridApi.ensureIndexVisible(0);
        gridApi.ensureColumnVisible(column);
        gridApi.setFocusedCell(rowIndex, column);
    };
    //validate time for table input
    DoctorScheduleSetupComponent.prototype.validateTime = function (time) {
        var validTime = moment(this.todayDate + " " + time).format("hh:mm A");
        if (validTime == "Invalid date") {
            validTime = null;
        }
        return validTime;
    };
    DoctorScheduleSetupComponent.prototype.onSaveSchedule = function (data) {
        this.docSch = data;
        this.docSch.templateId = data.templateId;
        this.docSch.dayId = data.dayObj.dayId;
        this.docSch.doctorId = this.doctor.doctorId;
        this.docSch.fromTime = moment(this.todayDate + " " + data.fromTimeString).format("hh:mm:ss"); // + ":00"
        this.docSch.toTime = moment(this.todayDate + " " + data.toTimeString).format("hh:mm:ss"); //+ ":00"
        this.scheduleService.saveDoctorSchedule(this.docSch).subscribe({
            next: function (schedule) {
                data.templateId = schedule.templateId;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    DoctorScheduleSetupComponent.prototype.generateSchedule = function () {
        console.log(this.schRow);
    };
    DoctorScheduleSetupComponent = __decorate([
        core_1.Component({
            selector: 'app-doctor-schedule-setup',
            templateUrl: './doctor-schedule-setup.component.html',
            styleUrls: ['./doctor-schedule-setup.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], DoctorScheduleSetupComponent);
    return DoctorScheduleSetupComponent;
}());
exports.DoctorScheduleSetupComponent = DoctorScheduleSetupComponent;
