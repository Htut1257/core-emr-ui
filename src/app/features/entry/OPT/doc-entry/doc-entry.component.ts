import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Grid, ColDef, GridOptions, GridApi, ColumnApi, Column } from "ag-grid-community";
import { DrExamination, DrNote, DrTreatment } from 'src/app/core/model/autocomplete-item.model';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { AutocompleteService } from 'src/app/core/services/autocomplete-service/autocomplete.service';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { VitalSign } from 'src/app/core/model/vital-sign.model';
import { VitalSignService } from 'src/app/core/services/vital-sign-service/vital-sign.service';
import { DoctorEntryService } from 'src/app/core/services/doctor-entry-service/doctor-entry.service';
import { ServerService } from 'src/app/core/services/server-service/server.service';
import { AutocompleteCell } from 'src/app/shared/cell-renderer/autocomplete-cell';
import { AppointmentPatientDialogComponent } from '../appointment/appointment-patient-dialog/appointment-patient-dialog.component';
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { DoctorMedicalHistory } from 'src/app/core/model/doctor-entry.model';
import { CheckboxRenderer } from 'src/app/shared/cell-renderer/checkbox-cell';
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

  examinationAutoData: any
  treatmentAutoDaata: any
  noteAutoData: any

  public frameworkComponents;
  loop: boolean = false
  //#endregion table grid variables

  examObj: DrExamination
  treatObj: DrTreatment

  drExamination: DrExamination[] = []
  drTreatment: DrTreatment[] = []
  drNote: DrNote[] = []

  bookingData: any
  vitalSign: any

  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')

  reVisitDate: string = ''

  docMedical: DoctorMedicalHistory

  booking: any
  bookingId: any
  bookingDate: any
  regNo: any
  patientName: any

  temp: any
  bp: any

  doctorId: any = "122"

  constructor(
    private route: Router, private docService: DoctorService,
    private vitalService: VitalSignService, private entryService: DoctorEntryService,
    private autoService: AutocompleteService, private appointService: AppointmentService,
    private serverService: ServerService, public dialog: MatDialog
  ) {
    this.frameworkComponents = {
      autoComplete: AutocompleteCell,
      checkboxRenderer:CheckboxRenderer
    };
    this.examObj = {} as DrExamination

  }

  ngOnInit(): void {
    this.reVisitDate = this.todayDate

    this.getExaminationData();
    this.getTreatmentData();
    this.getNoteData();
    this.InitializeGridTable();
    this.getServerSideData();
  }

  getVitalSign(bookingId: string) {
    this.vitalService.getVitalSignByPatient(bookingId).subscribe({
      next: vitalSign => {
        console.log(vitalSign)
        this.vitalSign = vitalSign
        this.temp = this.vitalSign.temperature
        this.bp = this.vitalSign.bpUpper + "/" + this.vitalSign.bpLower
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getServerSideData() {
    let uri = '/opdBooking/getMessage'
    this.serverService.getServerSource(uri).subscribe(data => {
      let serverData = JSON.parse(data)
      this.bookingData = serverData
      if (serverData.bstatus == "Doctor Room") {
        if (this.doctorId == serverData.doctorId) {
          this.booking = serverData
          this.bookingId = serverData.bookingId
          this.bookingDate = serverData.bkDate
          this.regNo = serverData.regNo
          this.patientName = serverData.patientName
          this.getVitalSign(serverData.bookingId);
        }
      }
    })
  }

  InitializeGridTable() {
    this.examinationGridOption = {
      columnDefs: this.examinationColumnDef,
      rowData: this.examinationRow,
      suppressScrollOnNewData: false
    }

    this.treatmentGridOption = {
      columnDefs: this.treatmentColumnDef,
      rowData: this.treatmentRow,
      suppressScrollOnNewData: false
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
    //  params.treatmentApi.resetRowHeights();
  }

  onGridReadyNote(params) {
    this.noteApi = params.api
    this.noteColumn = params.columnApi
    this.noteApi.sizeColumnsToFit()
    // params.noteApi.resetRowHeights();
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
          console.log(params)
          if (params.value) return params.value.desc;
          return params.value;
        },
      }
    ]

    this.examinationRow = [
      { 'examinationObj': { 'desc': '', } },

    ]
  }

  getTreatmentData() {
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
        valueFormatter: params => {
          if (params.value) {
            return params.value.itemName;
          }
          return "";
        },
      },
      {
        headerName: "Pattern",
        field: "pattern",
        width: 100,
        editable: true
      },
      // {
      //   headerName: "Pattern",
      //   field: "patternObj",
      //   editable: true,
      //   cellEditor: 'autoComplete',
      //   cellEditorParams: {
      //     'propertyRendered': 'patternName',
      //     'returnObject': true,
      //     'columnDefs': [
      //       { headerName: 'Name', field: 'patternName' },
      //       { headerName: 'Option', field: 'itemOption' },
      //     ]
      //   },
      //   valueFormatter: params => {
      //     if (params.value) return params.value.patternName;
      //     return "";
      //   },
      // },
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
    ]
    this.treatmentRow = [
      {
        'cityObject': { 'itemName': '', 'itemOption': '', 'itemType': '', },
        'patternObj': { 'patternName': '', 'itemOption': '' },
        'day': '',
        'qty': '',
        'remark': ''
      },
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
      { key: 'key remark1', value: 'value remark1' }
    ]
  }

  setBookingStatus() {
    console.log(this.drExamination)
    console.log(this.drTreatment)
    console.log(this.drNote)

    let examination = this.drExamination.reduce(function (filtered: any, option: any) {
      var someNewValue = {
        desc: option.examinationObj.desc
      }
      filtered.push(someNewValue);
      return filtered
    }, [])

    let treatment = this.drTreatment.reduce(function (filtered: any, option: any) {
      var someNewValue = {
        group: option.cityObject.itemOption,
        subGroup: option.cityObject.itemType,
        code: option.cityObject.itemId,
        desc: option.cityObject.itemName,
        pattern: option.pattern,
        days: option.day,
        qty: option.aty,
        price: 0,
        discount: 0,
        amount: 0,
        remark: option.remark
      }
      filtered.push(someNewValue);
      return filtered
    }, [])
    let docMedic = {
      visitId: this.bookingData.bookingId,
      visitDate: this.bookingData.bkDate,
      regNo: this.bookingData.regNo,
      admissionNo: ' ',
      patientName: this.bookingData.patientName,
      drId: this.bookingData.doctorId,
      drName: this.bookingData.doctorName,
      reVisitDate: '2023-04-27',
      drNotes: 'testing',
      examinations: examination,
      treatments: treatment,
      kvDrNotes: this.drNote
    }
    console.log(docMedic)
   
    return 
    this.entryService.saveDoctorMedical(docMedic).subscribe({
      next: data => {
        console.log(data)
      },
      error: err => {
        console.trace(err)
      }
    })

    return
    let booking: any = this.booking
    booking.bStatus = booking.bstatus
    this.appointService.updateAppointmentStatus(booking).subscribe({
      next: booking => {
        console.log("status changed")
        console.log(booking)
      }, error: err => {
        console.trace(err)
      }
    })
  }

  treatCellEditingStopped(event) {
    this.treatmentApi.setFocusedCell(event.rowIndex, event.colDef.field);
    let columnField = event.colDef.field
    console.log(event)
  }

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

  navigateTreatmentGrid() {
    let cell: any = this.treatmentApi.getFocusedCell()
    if (cell != undefined) {
      let colName = cell.column.colId
      switch (colName) {
        case "cityObject": {
          this.cellNavigation(`#examinationGrid`, 'examinationObj', this.examinationApi, this.treatmentApi)
          break;
        }
        case "remark": {
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
      this.examinationApi.setFocusedCell(event.rowIndex, event.colDef.field);
      this.addNewRowtoTable(row, firstEditCol, this.examinationApi, rowData, this.drExamination, this.emptyExamination())
    }
    if (this.treatmentApi.getFocusedCell()) {
      if (columnField == "cityObject") {
        this.treatmentApi.setFocusedCell(event.rowIndex, event.colDef.field);
      }
      if (columnField == "remark") {
        this.addNewRowtoTable(row, firstEditCol, this.treatmentApi, rowData, this.drTreatment, this.emptydrTreat())
      }
    }
    if (this.noteApi.getFocusedCell()) {
      if (columnField == "value") {
        this.addNewRowtoTable(row, firstEditCol, this.noteApi, rowData, this.drNote, this.emptyNote())
      }
    }
  }

  emptyExamination(): DrExamination {
    return {
      examinationObj: {
        desc: ''
      }
    }
  }

  emptydrTreat(): DrTreatment {
    return {
      cityObject: {
        itemOption: '',
        itemType: '',
        itemId: '',
        itemName: ''
      },
      pattern: '',
      day: '',
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
      gridApi.ensureIndexVisible(0)
      gridApi.ensureColumnVisible(firstColumn);
      gridApi.setFocusedCell(rowIndex + 1, firstColumn);
    }
  }

  searchPatient() {
    this.dialog.open(AppointmentPatientDialogComponent, {
      disableClose: false,
      width: '100%',
      data: { 'data key': 'data value' }
    }).afterClosed().subscribe({
      next:booking=>{
        if(booking){
          this.booking = booking
          this.bookingId = booking.bookingId
          this.bookingDate = booking.bkDate
          this.regNo = booking.regNo
          this.patientName = booking.patientName
          this.getVitalSign(booking.bookingId);
        }
       

      },
      error:err=>{
        console.trace(err)
      }
    })
  }


    onClear(){
      //this.examinationRow=this.emptyExamination()
      this.treatmentRow=[this.emptydrTreat()]
      this.treatmentGridOption.api.setRowData(this.treatmentRow)
      
    }
  // isEditing = false;

  // cellEditingStarted(event) {
  //   this.isEditing = true
  //   console.log("is editing")
  //   //  this.api.setFocusedCell(event.rowIndex, event.colDef.field);
  // }

  // currIndex = 0
  // cellEditingStopped(event) {
  //   console.log(event)
  //   this.currIndex = event.node.childIndex
  //   this.isEditing = false
  //   console.log("stop editing")
  //   this.api.setFocusedCell(event.rowIndex, event.colDef.field);
  // }

}


