import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
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

import { CheckboxRenderer } from 'src/app/shared/cell-renderer/checkbox-cell';

import * as moment from 'moment';
import { Doctor } from 'src/app/core/model/doctor.model';

@Component({
  selector: 'app-doctor-schedule-setup',
  templateUrl: './doctor-schedule-setup.component.html',
  styleUrls: ['./doctor-schedule-setup.component.css']
})
export class DoctorScheduleSetupComponent implements OnInit, OnDestroy {

  //#region grid variables

  schApi: GridApi
  schColumn: ColumnApi
  schGridOption: GridOptions
  schColumnDef: any
  schRow: any

  docSchApi: GridApi
  docSchColumn: ColumnApi
  docSchGridOption: GridOptions
  docSchColumnDef: any
  docSchRow: any

  public frameworkComponents

  //#endregion grid variables

  templateId: string = null
  docSchedule: DoctorSchedule
  schForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactivrForm: NgForm

  doctor: Doctor
  docSch: DoctorSchedule
  docSchedules: DoctorSchedule[] = []
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
      checkBox: CheckboxRenderer
    }

    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        if (this.docService._doctor != undefined) {
          this.doctor = this.docService._doctor
          this.initializeFormData(this.doctor)
          this.getDoctorSchedule(this.doctor.doctorId)
        }
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()
    this.getScheduleTemplateData()
    this.getDoctorScheduleTemplateData()
    this.initializeGrid()
    this.getWeekDay()
  }

  ngOnDestroy(): void {

  }

  initializeForm() {
    this.schForm = this.fb.group({
      day: [null],
      doctor: [''],
      fromTime: [this.todayTime, Validators.required],
      toTime: [this.todayTime, Validators.required],
      limitCount: [0],
      status: [true]
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
<<<<<<< HEAD
          data.fromTimeString = moment(this.todayDate + " " + data.fromTime).format('hh:mm A')
          data.toTimeString = moment(this.todayDate + " " + data.toTime).format('hh:mm A')
=======
          data.fromTimeString = moment(this.todayDate+" "+data.fromTime).format('hh:mm A')
          data.toTimeString = moment(this.todayDate+" "+data.toTime).format('hh:mm A')
>>>>>>> df8cfe2 (aaa)
          return data;
        })
      })
    ).subscribe({
      next: schedules => {
        this.docSchedules = schedules
        this.schRow = this.docSchedules
        this.schApi.setRowData(this.schRow)
      },
      error: err => {
        console.trace(err)
      }
    })
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

  initializeGrid() {
    this.schGridOption = {
      columnDefs: this.schColumnDef,
      rowData: this.schRow,
      suppressScrollOnNewData: false,
      defaultColDef: {
        resizable: true
      }
    }

    this.docSchGridOption = {
      columnDefs: this.docSchColumnDef,
      rowData: this.docSchRow,
      suppressScrollOnNewData: false,
      defaultColDef: {
        resizable: true
      }
    }
  }

  //column and row defination for opd
  getScheduleTemplateData() {
    this.schColumnDef = [
      {
        headerName: "Days",
        field: "dayName",
        width: 25,
      },
      {
        headerName: "From",
        field: "fromTimeString",
        width: 25,
      },
      {
        headerName: "To",
        field: "toTimeString",
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
        field: "actStatus",
        width: 25,
        cellRenderer: "checkBox"
      },
    ]
    this.schRow = [
      { dayName: 'Monday', fromTimeString: '09:00 AM', toTimeString: '03:00 PM', limitCount: '5', actStatus: true },
    ]
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
      { day: 'Monday', fromTime: '09:00 AM', toTime: '03:00 PM', limitCount: '5', status: true },
      { day: 'TuesDay', fromTime: '09:00 AM', toTime: '03:00 PM', limitCount: '5', status: true },
      { day: 'Wednesday', fromTime: '09:00 AM', toTime: '03:00 PM', limitCount: '5', status: true },
      { day: 'Thursday', fromTime: '09:00 AM', toTime: '03:00 PM', limitCount: '5', status: true },
      { day: 'Friday', fromTime: '09:00 AM', toTime: '03:00 PM', limitCount: '5', status: true },
      { day: 'Saturday', fromTime: '09:00 AM', toTime: '03:00 PM', limitCount: '5', status: true },
      { day: 'Sunday', fromTime: '09:00 AM', toTime: '03:00 PM', limitCount: '5', status: true }
    ]
  }

  onSaveSchedule(data) {
    this.docSch = data
    this.docSch.templateId = this.templateId
    this.docSch.dayId = data.day.dayId
    this.docSch.doctorId = this.doctor.doctorId
<<<<<<< HEAD
    this.docSch.fromTime = data.fromTime + ":00"
    this.docSch.toTime = data.toTime + ":00"
=======
    this.docSch.fromTime =  data.fromTime + ":00"
    this.docSch.toTime =  data.toTime + ":00"
>>>>>>> df8cfe2 (aaa)
    this.docSch.actStatus = data.status
    console.log(this.docSch)

    this.scheduleService.saveDoctorSchedule(this.docSch).subscribe({
      next: schedule => {
        console.log(schedule)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  onNew() {

  }

  onClear() {

  }

  clearForm() {
    this.schForm.reset()
    this.reactivrForm.resetForm()
  }

  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.schForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.schForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
  }

  //handle event from submitting
  handleEnter(event: any) {
    let tagname = event.srcElement.id
    if (tagname !== 'btnSave') {
      return false
    }
    return true
  }

} 
