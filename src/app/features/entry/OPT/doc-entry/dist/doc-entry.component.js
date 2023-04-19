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
var DocEntryComponent = /** @class */ (function () {
    function DocEntryComponent(route, docService, autoService, appointService, serverService) {
        this.route = route;
        this.docService = docService;
        this.autoService = autoService;
        this.appointService = appointService;
        this.serverService = serverService;
        this.animationState = "in";
        this.isHide = false;
        this.doctorId = "211";
        this.frameworkComponents = {
            autoComplete: autocomplete_cell_1.AutocompleteCell
        };
    }
    DocEntryComponent.prototype.ngOnInit = function () {
        this.getExaminationData();
        this.getTreatmentData();
        this.getNoteData();
        this.InitializeGridTable();
        this.getServerSideData();
        // this.getDrTreatmentData("a")
    };
    DocEntryComponent.prototype.getServerSideData = function () {
        var _this = this;
        var uri = '/opdBooking/getMessage';
        this.serverService.getServerSource(uri).subscribe(function (data) {
            var serverData = JSON.parse(data.data);
            console.log(serverData);
            console.log(_this.doctorId == serverData.doctorId);
            if (_this.doctorId == serverData.doctorId) {
                _this.booking = serverData;
                _this.bookingId = serverData.bookingId;
                _this.bookingDate = serverData.bkDate;
                _this.regNo = serverData.regNo;
                _this.patientName = serverData.patientName;
            }
        });
    };
    DocEntryComponent.prototype.toggleShowDiv = function (divName) {
        if (divName === "divA") {
            console.log(this.animationState);
            this.animationState = this.animationState === "out" ? "in" : "out";
            console.log(this.animationState);
        }
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
    };
    //table for diagnosis 
    DocEntryComponent.prototype.onGriReadyExamination = function (params) {
        this.examinationApi = params.api;
        this.examinationColumn = params.columnApi;
        this.examinationApi.sizeColumnsToFit();
        //  params.examinationApi.resetRowHeights();
    };
    //table for treatment
    DocEntryComponent.prototype.onGridReadyTreatment = function (params) {
        this.treatmentApi = params.api;
        this.treatmentColumn = params.columnApi;
        this.treatmentApi.sizeColumnsToFit();
        //  params.treatmentApi.resetRowHeights();
    };
    DocEntryComponent.prototype.onGridReadyNote = function (params) {
        this.noteApi = params.api;
        this.noteColumn = params.columnApi;
        this.noteApi.sizeColumnsToFit();
        // params.noteApi.resetRowHeights();
    };
    DocEntryComponent.prototype.getExaminationData = function () {
        this.examinationColumnDef = [
            {
                headerName: "Examination/Diagnosis",
                field: "examination",
                cellEditor: 'autoComplete',
                valueFormatter: function (params) {
                    if (params.value) {
                        return params.value.label || params.value.value || params.value;
                    }
                    return "";
                },
                editable: true
            }
        ];
        this.examinationRow = [
            { examination: "testing 1" },
            { examination: "testing 2" },
            { examination: "testing 3" },
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
                    if (params.value)
                        return params.value.itemName;
                    return "";
                }
            },
            {
                headerName: "Pattern",
                field: "patternObj",
                editable: true,
                cellEditor: 'autoComplete',
                cellEditorParams: {
                    'propertyRendered': 'patternName',
                    'returnObject': true,
                    'columnDefs': [
                        { headerName: 'Name', field: 'patternName' },
                        { headerName: 'Option', field: 'itemOption' },
                    ]
                },
                valueFormatter: function (params) {
                    if (params.value)
                        return params.value.patternName;
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
                cellEditor: 'autoComplete',
                valueFormatter: function (params) {
                    if (params.value) {
                        return params.value.label || params.value.value || params.value;
                    }
                    return "";
                },
                editable: true
            },
        ];
        this.treatmentRow = [
            {
                'cityObject': { 'itemName': '', 'itemOption': '', 'itemType': '' },
                'patternObj': { 'patternName': '', 'itemOption': '' },
                'accommodation': ''
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
    DocEntryComponent.prototype.setBookingStatus = function () {
        var booking = this.booking;
        booking.bStatus = booking.bstatus;
        this.appointService.updateAppointmentStatus(booking).subscribe({
            next: function (booking) {
                console.log("status changed");
                console.log(booking);
            }, error: function (err) {
                console.trace(err);
            }
        });
    };
    DocEntryComponent.prototype.getDrTreatmentData = function (params) {
        var _this = this;
        this.autoService.getTreatmentData(params).subscribe(function (data) {
            var items = data.map(function (d) { return ({
                value: d,
                label: d.itemName,
                group: "-"
            }); });
            _this.examinationAutoData = items;
        });
    };
    DocEntryComponent.prototype.treatCellEditingStopped = function (event) {
        this.treatmentApi.setFocusedCell(event.rowIndex, event.colDef.field);
        var columnField = event.colDef.field;
        console.log(event);
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
        if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
            //this.navigateGrid();
            this.examinationApi;
            console.log(this.examinationApi.getFocusedCell());
            console.log(this.treatmentApi.getFocusedCell());
            console.log(this.noteApi.getFocusedCell());
            return false;
        }
        return true;
    };
    DocEntryComponent.prototype.navigateExaminationGrid = function () {
        if (this.examinationApi.getFocusedCell() != undefined) {
        }
    };
    DocEntryComponent.prototype.navigateTreatmentGrid = function () {
        if (this.treatmentApi.getFocusedCell() != undefined) {
        }
    };
    DocEntryComponent.prototype.navigateNoteGrid = function () {
        if (this.noteApi.getFocusedCell() != undefined) {
        }
    };
    __decorate([
        core_1.HostListener('keydown', ['$event'])
    ], DocEntryComponent.prototype, "onKeydown");
    DocEntryComponent = __decorate([
        core_1.Component({
            selector: 'app-doc-entry',
            templateUrl: './doc-entry.component.html',
            styleUrls: ['./doc-entry.component.css']
        })
    ], DocEntryComponent);
    return DocEntryComponent;
}());
exports.DocEntryComponent = DocEntryComponent;
