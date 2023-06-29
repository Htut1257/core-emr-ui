import { Component, ViewChild, HostListener, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription, map, pipe } from 'rxjs';
import { GridApi, GridOptions, ColumnApi } from 'ag-grid-community';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { DoctorSchedule } from 'src/app/core/model/schedule.model';
import { WeekDay } from 'src/app/core/model/wee-day.model';

import { ScheduleService } from 'src/app/core/services/schedule-service/schedule.service';
import { WeekDayService } from 'src/app/core/services/week-day-service/week-day.service';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

import { AutocompleteCell } from 'src/app/shared/cell-renderer/autocomplete-cell';
import { CheckboxRenderer } from 'src/app/shared/cell-renderer/checkbox-cell';

import * as moment from 'moment';
import { Doctor } from 'src/app/core/model/doctor.model';

@Component({
  selector: 'app-doctor-schedule-setup',
  templateUrl: './doctor-schedule-setup.component.html',
  styleUrls: ['./doctor-schedule-setup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorScheduleSetupComponent implements OnInit, OnDestroy {

  //#region grid variables
  schGridOption: GridOptions
  schApi: GridApi
  schColumn: ColumnApi
  schColumnDef: any
  schRow: any

  docSchGridOption: GridOptions
  docSchApi: GridApi
  docSchColumn: ColumnApi
  docSchColumnDef: any
  docSchRow: any

  public frameworkComponents

  docSchedules: any[] = []
  docSchs: any
  //#endregion grid variables

  templateId: string = null
  docSchedule: DoctorSchedule
  schForm: FormGroup

  doctor: Doctor
  docSch: DoctorSchedule

  weekDay: WeekDay[] = []
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  todayTime = moment(new Date(), 'MM/DD/YYYY').format('HH:mm')
  constructor(
    private scheduleService: ScheduleService, private weekService: WeekDayService,
    private docService: DoctorService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public fb: FormBuilder,
  ) {
    this.frameworkComponents = {
      autoComplete: AutocompleteCell,
      checkBox: CheckboxRenderer
    }

    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        if (this.docService._doctor != undefined) {
          this.doctor = this.docService._doctor
          // this.initializeFormData(this.doctor)
          this.getDoctorSchedule(this.doctor.doctorId)
          this.getGeneratedSchedule()
        }
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()
    this.getScheduleTemplateData()
    //  this.getDoctorScheduleTemplateData()
    this.initializeGrid()
    //this.getWeekDay()
    
  }

  ngOnDestroy(): void {

  }

  initializeForm() {
    this.schForm = this.fb.group({
      fromDate: [this.todayDate, Validators.required],
      toDate: [this.todayDate, Validators.required],
    })
  }

  initializeFormData(data) {
    this.schForm.patchValue({
      doctor: this.doctor.doctorName
    })
  }

  getDoctorSchedule(docId: string) {
    this.scheduleService.getDoctorSchedule(docId).pipe(
      map(item => {
        console.log(item)
        return item.filter((data: any) => {
          data.fromTimeString = moment(this.todayDate + " " + data.fromTime).format('hh:mm A')
          data.toTimeString = moment(this.todayDate + " " + data.toTime).format('hh:mm A')
          return data;
        })
      })
    ).subscribe({
      next: schedules => {
        this.docSchedules = schedules
        this.renderScheduleTemplate(this.docSchedules)
        // this.schRow = this.docSchedules
        // this.schApi.setRowData(this.schRow)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getGeneratedSchedule() {
    this.scheduleService.searchDoctorSchedule(this.todayDate, this.doctor.doctorId).subscribe({
      next: schedules => {
        console.log(schedules)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  renderScheduleTemplate(data) {
    this.schRow = data.reduce(function (filter, option) {
      let someValue = {
        templateId: option.templateId,
        dayObj: {
          dayId: option.dayId, dayName: option.dayName
        },
        fromTimeString: option.fromTimeString,
        toTimeString: option.toTimeString,
        limitCount: option.limitCount,
        actStatus: option.actStatus
      }
      filter.push(someValue)
      return filter
    }, [])
    this.schRow.push(this.emptySchedule())
    this.schApi.setRowData(this.schRow)
  }

  getWeekDay() {
    this.weekService.getWeekDay().subscribe({
      next: days => {
        this.weekDay = days
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  initializeGrid() {
    this.schGridOption = {
      columnDefs: this.schColumnDef,
      rowData: this.schRow,
      suppressScrollOnNewData: false,
    }

    this.docSchGridOption = {
      columnDefs: this.docSchColumnDef,
      rowData: this.docSchRow,
      suppressScrollOnNewData: false,
    }
  }

  onGridReadySchedule(params) {
    this.schApi = params.api
    this.schColumn = params.columnApi
    this.schApi.sizeColumnsToFit()
  }

  onGridReadyDoctorSchedule(params) {
    this.docSchApi = params.api
    this.docSchColumn = params.columnApi
    this.docSchApi.sizeColumnsToFit()
  }



  //column and row defination for opd
  getScheduleTemplateData() {
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
        valueFormatter: params => {
          if (params.value) {
            return params.value.dayName;
          }
          return "";
        },
      },
      {
        headerName: "From",
        field: "fromTimeString",
        width: 25,
        editable: true,
      },
      {
        headerName: "To",
        field: "toTimeString",
        width: 25,
        editable: true,
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
    ]
    this.schRow = [

    ]
  }

  emptySchedule() {
    return {
      templateId: null,
      dayObj: {
        dayId: '', dayName: ''
      },
      fromTimeString: '',
      toTimeString: '',
      limitCount: 0,
      actStatus: true
    }
  }

  //column and row defination for opd
  getDoctorScheduleTemplateData() {
    this.docSchColumnDef = [
      {
        headerName: "Days",
        field: "day",
        width: 25,
      },
      {
        headerName: "From",
        field: "fromTime",
        width: 25,
      },
      {
        headerName: "To",
        field: "toTime",
        width: 25,
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
    ]
    this.docSchRow = [

    ]
  }

  cellValueChanged(event) {
    let columnField = event.colDef.field
    let rowData = event.data
    let rowIndex = event.rowIndex
    var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
    console.log(columnField)
    if (columnField == "actStatus") {
      if (rowData.templateId != null) {
        this.onSaveSchedule(rowData)
      }
      this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule())
    }

  }

  cellEditingStopped(event) {
    let columnField = event.colDef.field
    let rowData = event.data
    let row = event.rowIndex
    var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
    if (this.schApi.getFocusedCell()) {
      this.scheduleCellEvent(row, firstEditCol, columnField, this.schApi, rowData, [])

    }
  }

  scheduleCellEvent(rowIndex: any, firstColumn: any, columnField: string, gridApi: GridApi, rowData: Object, lstRow: any[]) {
    let data: any = rowData
    let validTime = ""
    if (columnField == "dayObj") {
      if (data.dayObj.dayId == '') {
        this.focusTableCell(rowIndex, columnField, gridApi)
        return
      }
      this.focusTableCell(rowIndex, "fromTimeString", gridApi)
    }
    if (columnField == "fromTimeString") {
      validTime = this.validateTime(data.fromTimeString)
      if (validTime == null) {
        this.toastService.showWarningToast("", "Please Enter valid time ,format hour:min am/pm")
        data.fromTimeString = ""
        this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule())
        this.focusTableCell(rowIndex, "fromTimeString", gridApi)
        return
      }

      data.fromTimeString = validTime
      this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule())
      this.focusTableCell(rowIndex, "toTimeString", gridApi)

    }
    if (columnField == "toTimeString") {
      validTime = this.validateTime(data.toTimeString)
      if (validTime == null) {
        this.toastService.showWarningToast("", "Please Enter valid time ,format hour:min am/pm")
        data.toTimeString = ""
        this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule())
        this.focusTableCell(rowIndex, "toTimeString", gridApi)
        return
      }

      data.toTimeString = validTime
      this.setRowDatatoTable(rowIndex, this.schRow, rowData, this.schApi, this.schGridOption, this.emptySchedule())
      this.focusTableCell(rowIndex, "limitCount", gridApi)
    }
    if (columnField == "limitCount") {


      this.onSaveSchedule(rowData)

      this.addNewRowtoTable(rowIndex, firstColumn, gridApi, data, lstRow, this.emptySchedule())
      this.focusTableCell(rowIndex + 1, "dayObj", gridApi)
      return
    }

    if (data.templateId != null) {
      this.onSaveSchedule(rowData)
    }
  }

  //add new row to table
  addNewRowtoTable(rowIndex: any, firstColumn: any, gridApi: GridApi, rowData: Object, lstRow: any[], rowObj: Object) {
    let currentRow = lstRow[rowIndex]
    if (currentRow != undefined) {
      currentRow = rowData
    }
    let totalRow = gridApi.getDisplayedRowCount() - 1
    if (totalRow == rowIndex) {
      let curentData = rowData
      lstRow.push(curentData)
      gridApi.applyTransaction({
        add: [rowObj]
      })
    }
  }

  //set Data to Table
  setRowDatatoTable(rowIndex: any, tableRow: any, rowData: Object, gridApi: GridApi, gridOption: GridOptions, rowObj: Object) {
    tableRow[rowIndex] = rowData;
    gridOption.api.setRowData(tableRow);
    // gridApi.applyTransaction({
    //   add: [rowObj]
    // })
  }

  //focusing table cell
  focusTableCell(rowIndex: any, column: any, gridApi: GridApi) {
    gridApi.ensureIndexVisible(0)
    gridApi.ensureColumnVisible(column);
    gridApi.setFocusedCell(rowIndex, column);
  }

  //validate time for table input
  validateTime(time: string): string {
    let validTime = moment(this.todayDate + " " + time).format("hh:mm A")
    if (validTime == "Invalid date") {
      validTime = null
    }
    return validTime
  }

  onSaveSchedule(data) {
    this.docSch = data
    this.docSch.templateId = data.templateId
    this.docSch.dayId = data.dayObj.dayId
    this.docSch.doctorId = this.doctor.doctorId
    this.docSch.fromTime = moment(this.todayDate + " " + data.fromTimeString).format("hh:mm:ss") // + ":00"
    this.docSch.toTime = moment(this.todayDate + " " + data.toTimeString).format("hh:mm:ss")  //+ ":00"

    this.scheduleService.saveDoctorSchedule(this.docSch).subscribe({
      next: schedule => {
        data.templateId = schedule.templateId

      },
      error: err => {
        console.trace(err)
      }
    })
  }

  generateSchedule(data: any) {
    let fromDate = moment(data.fromDate).format("YYYY-MM-DD")
    let toDate = moment(data.toDate).format("YYYY-MM-DD")
    this.scheduleService.generateDoctorSchedule(fromDate, toDate, this.doctor.doctorId).subscribe({
      next: schedule => {
        console.log("schedule generated")
        console.log(schedule)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

} 
