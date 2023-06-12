import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Grid, ColDef, GridOptions, GridApi, ColumnApi, Column } from "ag-grid-community";
import { DrExamination, DrNote, DrTreatment } from 'src/app/core/model/autocomplete-item.model';

import { User } from 'src/app/core/model/user.model';
import { VitalSign } from 'src/app/core/model/vital-sign.model';
import { DoctorExamination, DoctorMedicalHistory, DoctorTreatment } from 'src/app/core/model/doctor-entry.model';
import { OpdVisitDate } from 'src/app/core/model/opd-visit-day.model';
import { OpdCfFee } from 'src/app/core/model/cf-fee.model';
import { Booking } from 'src/app/core/model/booking.model';

import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { AutocompleteService } from 'src/app/core/services/autocomplete-service/autocomplete.service';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { VitalSignService } from 'src/app/core/services/vital-sign-service/vital-sign.service';
import { DoctorEntryService } from 'src/app/core/services/doctor-entry-service/doctor-entry.service';
import { ServerService } from 'src/app/core/services/server-service/server.service';
import { UserService } from 'src/app/core/services/user-service/user-service.service';
import { CfFeeService } from 'src/app/core/services/cf-fee-service/cf-fee.service';
import { OpdVisitDateService } from 'src/app/core/services/opd-visit-date-service/opd-visit-date.service';

import { AutocompleteCell } from 'src/app/shared/cell-renderer/autocomplete-cell';
import { CheckboxRenderer } from 'src/app/shared/cell-renderer/checkbox-cell';
import { AppointmentPatientDialogComponent } from '../appointment/appointment-patient-dialog/appointment-patient-dialog.component';

import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';



const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-doc-entry',
  templateUrl: './doc-entry.component.html',
  styleUrls: ['./doc-entry.component.css'],
  providers:
    [
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
    ],
    encapsulation:ViewEncapsulation.None
})
export class DocEntryComponent implements OnInit {
  //#region table grid variables

  examinationApi: GridApi
  treatmentApi: GridApi
  noteApi: GridApi

  examinationColumn: ColumnApi
  treatmentColumn: ColumnApi
  noteColumn: ColumnApi

  examinationGridOption: GridOptions
  treatmentGridOption: GridOptions
  noteGridOption: GridOptions

  examinationColumnDef: any
  treatmentColumnDef: any
  noteColumnDef: any

  examinationRow: any
  treatmentRow: any
  noteRow: any

  public frameworkComponents;
  //table grid navigation for cell
  loop: boolean = false

  //#endregion table grid variables

  user: User
  examObj: DrExamination
  treatObj: DrTreatment
  vitalSign: any
  docMedical: DoctorMedicalHistory

  drExamination: DrExamination[] = []
  drTreatment: DrTreatment[] = []
  drNote: DrNote[] = []

  cfFees: OpdCfFee[] = []
  cfFeeobj: OpdCfFee
  opdVisitDate: OpdVisitDate[] = []

  medicalHisId: string
  doctorId: string
  bookingId: string
  bookingDate: string
  regNo: string
  patientName: string
  cfFee: number
  foc: boolean=false
  pharmacyDays: number = 1
  reVisitDate: string
  doctorNote: string
  temp: number
  bp: string

  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  booking: any
  constructor(
    private route: Router, private docService: DoctorService,
    private vitalService: VitalSignService, private entryService: DoctorEntryService,
    private autoService: AutocompleteService, private appointService: AppointmentService,
    private userService: UserService, private cfFeeService: CfFeeService,
    private visitDateService: OpdVisitDateService,
    private serverService: ServerService, public dialog: MatDialog
  ) {
    this.frameworkComponents = {
      autoComplete: AutocompleteCell,
      checkboxRenderer: CheckboxRenderer
    };
    this.examObj = {} as DrExamination
   // this.vitalSign = {} as VitalSign
    this.user = this.userService.getUserValue()
    if (this.user) {
      this.doctorId = this.user.doctorId
      this.getDoctorCfFee(this.doctorId)
    }
  }

  ngOnInit(): void {
    this.reVisitDate = this.todayDate
    this.getExaminationData();
    this.getTreatmentData();
    this.getNoteData();
    this.InitializeGridTable();
    this.getServerSideData();
    // this.getVisitDate()
  }

  onInitData(booking: Booking) {
    this.booking = booking
    this.bookingId = booking.bookingId.toString()
    this.bookingDate = booking.bkDate.toString()
    this.regNo = booking.regNo
    this.patientName = booking.patientName
    this.getVitalSign(booking.bookingId.toString());
  }

  getServerSideData() {
    let uri = '/opdBooking/getMessage'
    this.serverService.getServerSource(uri).subscribe(data => {
      let serverData = JSON.parse(data.data)
      this.booking = serverData
      if (serverData.bstatus == "Doctor Room") {
        if (this.doctorId == serverData.doctorId) {//
          console.log(this.booking)
          this.onInitData(this.booking)
        }
      }
    })
  }

  getDocMedicalHistory(visitId: string) {
    this.entryService.getDoctorMedicalByVisitId(visitId).subscribe({
      next: entry => {
        console.log(entry)
        if (entry!=null) {

          let data: any = entry
          this.medicalHisId = data.id
          this.cfFee = data.cfFees
          this.pharmacyDays = data.treatments[0].days
          this.reVisitDate = moment(data.reVisitDate, 'YYYY-MM-DD').format('YYYY-MM-DD')
          this.renderExaminationData(data.examinations)
          this.renderTreatmetData(data.treatments)
          this.renderDocNote(data.kvDrNotes)
        }
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  renderExaminationData(data: DrExamination[]) {
    this.examinationRow = data.reduce(function (filtered: any, option: any) {
      var someNewValue = {
        examinationObj: {
          desc: option.desc
        }
      }
      filtered.push(someNewValue);
      return filtered
    }, [])
    for (let item of this.examinationRow) {
      this.drExamination.push(item)
    }
    this.examinationRow.push(this.emptyExamination())
    this.examinationGridOption.api.setRowData(this.examinationRow)


  }

  renderTreatmetData(data: DrTreatment[]) {
    this.treatmentRow = data.reduce(function (filtered: any, option: any) {
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
        },
        patternObj: {
          patternCode: option.pattern.patternCode,
          despEng: option.pattern.despEng
        },
        day: option.days,
        qty: option.qty,
        remark: option.remark,
      }
      filtered.push(someValue)
      return filtered
    }, [])
    for (let item of this.treatmentRow) {
      this.drTreatment.push(item)
    }
    let treatRow: any = this.emptydrTreat()
    treatRow.day = this.pharmacyDays
    this.treatmentRow.push(treatRow)
    this.treatmentGridOption.api.setRowData(this.treatmentRow)
  }

  renderDocNote(data: DrNote[]) {
    this.noteRow = data
    this.noteRow.push(this.emptyNote)
    for (let item of this.noteRow) {
      this.drNote.push(item)
    }
    this.noteGridOption.api.setRowData(this.noteRow)
  }

  getVitalSign(bookingId: string) {
    this.vitalService.getVitalSignByPatient(bookingId).subscribe({
      next: vitalSign => {
        console.log(vitalSign)
        if (vitalSign!=null) {
          this.vitalSign = vitalSign
          this.temp = this.vitalSign.temperature?this.vitalSign.bpLower:'0'
          this.bp = this.vitalSign.bpUpper?this.vitalSign.bpUpper:'0' + "/" + this.vitalSign.bpLower?this.vitalSign.bpLower:'0'
        }
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getDoctorCfFee(id: string) {
    this.cfFeeService.getOpdCfFeeByDoctor(id).subscribe({
      next: fees => {
        console.log(fees)
        this.cfFees = fees
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getDoctorFeeData(fees: OpdCfFee) {
    this.cfFeeobj = fees
    this.cfFee = fees.fees
  }

  getVisitDate() {
    this.visitDateService.getReVisitDate().subscribe({
      next: visitDate => {
        this.opdVisitDate = visitDate
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getReVisitData(row: OpdVisitDate) {

  }

  InitializeGridTable() {
    this.examinationGridOption = {
      columnDefs: this.examinationColumnDef,
      rowData: this.examinationRow,
      suppressScrollOnNewData: false,
    }

    this.treatmentGridOption = {
      columnDefs: this.treatmentColumnDef,
      rowData: this.treatmentRow,
      suppressScrollOnNewData: false,
      defaultColDef: {
        resizable: true
      }
    }

    this.noteGridOption = {
      columnDefs: this.noteColumnDef,
      rowData: this.noteRow,
      suppressScrollOnNewData: false
    }
  }

  //table for diagnosis 
  onGriReadyExamination(params) {
    this.examinationApi = params.api
    this.examinationColumn = params.columnApi
    this.examinationApi.sizeColumnsToFit()

  }

  //table for treatment
  onGridReadyTreatment(params) {
    this.treatmentApi = params.api
    this.treatmentColumn = params.columnApi
    this.treatmentApi.sizeColumnsToFit()

  }

  //table for note
  onGridReadyNote(params) {
    this.noteApi = params.api
    this.noteColumn = params.columnApi
    this.noteApi.sizeColumnsToFit()
  }

  getExaminationData() {
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
        valueFormatter: params => {
          if (params.value) return params.value.desc;
          return params.value;
        },
      }
    ]

    this.examinationRow = [
      this.emptyExamination()
    ]
  }

  getTreatmentData() {
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
            { headerName: 'Name', field: 'itemName' },
            { headerName: 'Option', field: 'itemOption' },
            { headerName: 'Type', field: 'itemType' }
          ]
        },
        valueFormatter: params => {
          if (params.value) {
            return params.value.itemName;
          }
          return "";
        },
      },
      {
        headerName: "Pattern",
        field: "patternObj",
        width: 30,
        editable: params => params.data.cityObject.itemOption == "Pharmacy",
        cellEditor: 'autoComplete',
        cellEditorParams: {
          'propertyRendered': 'patternCode',
          'returnObject': true,
          'columnDefs': [
            { headerName: 'Code', field: 'patternCode' },
            { headerName: 'Description', field: 'despEng' },
          ]
        },
        valueFormatter: params => {
          if (params.value) return params.value.patternCode;
          return "";
        },
      },
      {
        headerName: "Days",
        field: "day",
        width: 25,
        editable: params => params.data.cityObject.itemOption == "Pharmacy",
        type: 'rightAligned'
      },
      {
        headerName: "Qty",
        field: "qty",
        width: 30,
        editable: params => params.data.cityObject.itemOption == "Pharmacy",
        type: 'rightAligned'
      },
      {
        headerName: "Remark",
        field: "remark",
        width: 100,
        editable: true,
      },
      {
        headerName: "Option",
        field: "cityObject.itemOption",
        width: 50,
        editable: false,

      },
    ]
    this.treatmentRow = [
      this.emptydrTreat()
    ]
  }

  getNoteData() {
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
    ]
    this.noteRow = [
      this.emptyNote()
    ]
  }

  emptyExamination(): DrExamination {
    return {
      examinationObj: {
        desc: ''
      }
    }
  }

  emptydrTreat(): any {
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
      remark: '',
    }
  }

  emptyNote(): DrNote {
    return {
      key: '',
      value: ''
    }
  }

  //grid navigation
  @HostListener('keydown', ['$event'])
  onKeydown(event) {
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
      this.navigateTreatmentGrid()
      this.navigateNoteGrid()
      return false;
    }
    if (event.key == "ArrowRight") {
      this.navigateExaminationGrid()
      this.navigateTreatmentGrid()
      return false
    }
    return true
  }

  //navigate grid func
  navigateExaminationGrid() {
    let cell: any = this.examinationApi.getFocusedCell()
    if (cell != undefined) {
      if (cell.column.colId == "examinationObj") {
        document.querySelector<HTMLElement>(`#treatmentGrid`).focus()
        this.treatmentApi.setFocusedCell(0, 'cityObject');
        this.examinationApi.clearFocusedCell()
      }
    }
  }

  //navigate each cell in table
  navigateTreatmentGrid() {
    let cell: any = this.treatmentApi.getFocusedCell()
    if (cell != undefined) {
      let colName = cell.column.colId
      switch (colName) {
        case "cityObject": {
          this.cellNavigation(`#examinationGrid`, 'examinationObj', this.examinationApi, this.treatmentApi)
          break;
        }
        case "cityObject.itemOption": {
          this.cellNavigation(`#noteGrid`, 'key', this.noteApi, this.treatmentApi)
          break;
        }
        default: {
          this.loop = false
          break;
        }
      }
    }
  }

  //navigate each cell in table
  navigateNoteGrid() {
    let cell: any = this.noteApi.getFocusedCell()
    if (cell != undefined) {
      let colName = cell.column.colId
      if (colName == "key") {
        this.cellNavigation(`#treatmentGrid`, 'cityObject', this.treatmentApi, this.noteApi)
      }
    }
  }

  //cell navigaton for jumping to another cell
  cellNavigation(tableId: string, tableCell: string, currGridApi: GridApi, nextGridApi: GridApi) {
    if (this.loop == false) {
      this.loop = true
    } else {
      document.querySelector<HTMLElement>(tableId).focus()
      currGridApi.setFocusedCell(0, tableCell);
      nextGridApi.clearFocusedCell()
      this.loop = false
    }
  }

  //table cell editing
  cellEditingStopped(event) {
    let columnField = event.colDef.field
    let rowData = event.data
    let row = event.rowIndex
    var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
    if (this.examinationApi.getFocusedCell()) {
      if (rowData.examinationObj.desc == "") {
        this.examinationApi.setFocusedCell(row, columnField);
        return
      }

      this.addNewRowtoTable(row, firstEditCol, this.examinationApi, rowData, this.drExamination, this.emptyExamination())
      this.focusTableCell(row + 1, firstEditCol, this.examinationApi)
    }

    if (this.treatmentApi.getFocusedCell()) {
      if (columnField == "cityObject") {
        let itemType = rowData.cityObject.itemOption
        if (rowData.cityObject.itemId == '') {
          this.treatmentApi.setFocusedCell(row, columnField);
          return
        }
        if (itemType == "Pharmacy") {
          let treatRow: any = this.emptydrTreat()
          treatRow.day = this.pharmacyDays
          this.addNewRowtoTable(row, firstEditCol, this.treatmentApi, rowData, this.drTreatment, treatRow)
          this.treatmentApi.setFocusedCell(row, "patternObj");
          return
        }
        rowData.qty = 1
        rowData.day = ''
        this.treatmentRow[row] = rowData;
        this.treatmentGridOption.api.setRowData(this.treatmentRow);
        let treatRow: any = this.emptydrTreat()
        treatRow.day = this.pharmacyDays
        this.addNewRowtoTable(row, firstEditCol, this.treatmentApi, rowData, this.drTreatment, treatRow)
        this.focusTableCell(row + 1, firstEditCol, this.treatmentApi)
      }
      if (columnField == "patternObj") {
        this.treatmentApi.setFocusedCell(row, columnField);
        rowData.qty = rowData.patternObj.factor * rowData.day
        this.treatmentRow[row] = rowData;
        this.treatmentGridOption.api.setRowData(this.treatmentRow);
        let treatRow: any = this.emptydrTreat()
        treatRow.day = this.pharmacyDays
        this.treatmentApi.applyTransaction({
          add: [treatRow]
        })
        this.focusTableCell(row + 1, firstEditCol, this.treatmentApi)
      }
      if (columnField == "day") {
        this.treatmentApi.setFocusedCell(row, columnField);
        rowData.qty = rowData.patternObj.factor * rowData.day
        let rowIndex = this.treatmentGridOption.api.getRowNode(event.node.id).rowIndex;
        this.treatmentRow[rowIndex] = rowData;
        this.treatmentGridOption.api.setRowData(this.treatmentRow);
        this.reVisitDate = moment(this.reVisitDate, "YYYY-MM-DD").add(rowData.day, 'day').format('YYYY-MM-DD')
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
        this.addNewRowtoTable(row, firstEditCol, this.noteApi, rowData, this.drNote, this.emptyNote())
        this.focusTableCell(row + 1, firstEditCol, this.noteApi)
      }
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
      // gridApi.ensureIndexVisible(0)
      // gridApi.ensureColumnVisible(firstColumn);
      // gridApi.setFocusedCell(rowIndex + 1, firstColumn);
    }
  }

  //focusing table cell
  focusTableCell(rowIndex: any, column: any, gridApi: GridApi) {
    gridApi.ensureIndexVisible(0)
    gridApi.ensureColumnVisible(column);
    gridApi.setFocusedCell(rowIndex, column);
  }

  //set date and pharmancy day
  confirmPharmacyDate() {
    this.reVisitDate = this.todayDate
    for (let item of this.treatmentRow) {
      if (item.cityObject.itemOption == "Pharmacy") {
        item.day = this.pharmacyDays
        item.qty = this.pharmacyDays * item.patternObj.factor
      }
    }
    this.treatmentGridOption.api.setRowData(this.treatmentRow);
    let treatRow: any = this.emptydrTreat()
    treatRow.day = this.pharmacyDays
    this.treatmentApi.applyTransaction({
      add: [treatRow]
    })
    this.reVisitDate = moment(this.reVisitDate, "YYYY-MM-DD").add(this.pharmacyDays, 'day').format('YYYY-MM-DD')
  }

  //search the patient of current doctor session 
  searchPatient() {
    this.dialog.open(AppointmentPatientDialogComponent, {
      disableClose: false,
      width: '100%',
      data: { 'data key': 'data value' }
    }).afterClosed().subscribe({
      next: booking => {
        if (booking) {
          this.booking = booking
          this.onInitData(this.booking)
          this.getDocMedicalHistory(this.booking.bookingId)
        }
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //save list to mappable obj
  savetoDrExam(): DoctorExamination[] {
    return this.drExamination.reduce(function (filtered: any, option: any) {
      var someNewValue = {
        desc: option.examinationObj.desc
      }
      filtered.push(someNewValue);
      return filtered
    }, [])
  }

  //save list to mappable obj
  savetoDrTreatment(): DoctorTreatment[] {
    return this.drTreatment.reduce(function (filtered: any, option: any) {
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
      }
      filtered.push(someNewValue);
      return filtered
    }, [])
  }

  //save list to mappable obj
  savetoDrNote() {

  }

  //save all data
  saveMedHistory() {
    let docMedic = {
      id: this.medicalHisId,
      visitId: this.booking.bookingId,
      visitDate: this.booking.bkDate,
      regNo: this.booking.regNo,
      admissionNo: '',
      patientName: this.booking.patientName,
      drId: this.booking.doctorId,
      drName: this.booking.doctorName,
      cfType: this.cfFeeobj,//this.cfFees,
      cfFees: this.cfFee,
      reVisitDate: this.reVisitDate,
      drNotes: this.doctorNote,
      isFoc: this.foc,
      examinations: this.savetoDrExam(),
      treatments: this.savetoDrTreatment(),
      kvDrNotes: this.drNote
    }
    console.log(docMedic)
    let booking: any = this.booking
    booking.bStatus = booking.bstatus
    this.entryService.saveDoctorMedical(docMedic).subscribe({
      next: data => {
        this.appointService.updateAppointmentStatus(booking).subscribe({
          next: booking => {
            console.log("status changed")
            console.log(booking)
            this.onClear()
          }, error: err => {
            console.trace(err)
          }
        })
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  onClear() {
    this.examinationRow = [this.emptyExamination()]
    this.treatmentRow = [this.emptydrTreat()]
    this.noteRow = [this.emptyNote()]

    this.examinationGridOption.api.setRowData(this.examinationRow)
    this.treatmentGridOption.api.setRowData(this.treatmentRow)
    this.noteGridOption.api.setRowData(this.noteRow)

    this.bookingId = ''
    this.bookingDate = ''
    this.regNo = ''
    this.patientName = ''
    this.cfFee = 0
    this.pharmacyDays = 0
    this.reVisitDate = this.todayDate
    this.doctorNote = ''
    this.temp = 0
    this.bp = ''
  }

}


