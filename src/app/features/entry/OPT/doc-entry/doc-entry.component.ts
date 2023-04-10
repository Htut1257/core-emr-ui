import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AutocompleteSelectCellEditor } from "ag-grid-autocomplete-editor";
import { Grid, ColDef, GridOptions, GridApi, ColumnApi, Column } from "ag-grid-community";
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { AutocompleteService } from 'src/app/core/services/autocomplete-service/autocomplete.service';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { ServerService } from 'src/app/core/services/server-service/server.service';
import { AutocompleteCell } from 'src/app/shared/cell-renderer/autocomplete-cell';
@Component({
  selector: 'app-doc-entry',
  templateUrl: './doc-entry.component.html',
  styleUrls: ['./doc-entry.component.css'],

})
export class DocEntryComponent implements OnInit {
  api: GridApi
  api1: GridApi

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

  columnApi: ColumnApi

  animationState = "in";
  isHide: boolean = false

  booking:any
  bookingId:any
  bookingDate:any
  regNo:any
  patientName:any

  doctorId:any="211"
  constructor(
    private route: Router, private docService: DoctorService,
    private autoService: AutocompleteService, private appointService: AppointmentService,
    private serverService: ServerService,
  ) {
    this.frameworkComponents = {
      autoComplete: AutocompleteCell,
    };
  }

  ngOnInit(): void {
    this.getExaminationData();
    this.getTreatmentData();
    this.getNoteData();
    this.InitializeGridTable();
    this.getServerSideData();
    // this.getDrTreatmentData("a")
  }

  getServerSideData() {
    let uri = '/opdBooking/getMessage'
    this.serverService.getServerSource(uri).subscribe(data => {
      let serverData = JSON.parse(data.data)
      console.log(serverData)
      console.log(this.doctorId==serverData.doctorId)
      if(this.doctorId==serverData.doctorId){
        this.booking=serverData
        this.bookingId=serverData.bookingId
        this.bookingDate=serverData.bkDate
        this.regNo=serverData.regNo
        this.patientName=serverData.patientName
      } 
    })
  }


  toggleShowDiv(divName: string) {
    if (divName === "divA") {
      console.log(this.animationState);
      this.animationState = this.animationState === "out" ? "in" : "out";
      console.log(this.animationState);
    }
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
    //  params.examinationApi.resetRowHeights();
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
        headerName: "Examination/Diagnosis",
        field: "examination",
        cellEditor: AutocompleteSelectCellEditor,
        valueFormatter: params => {
          if (params.value) {
            return params.value.label || params.value.value || params.value;
          }
          return "";
        },
        editable: true
      }
    ]

    this.examinationRow = [
      { examination: "testing 1" },
      { examination: "testing 2" },
      { examination: "testing 3" },
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
          if (params.value) return params.value.itemName;
          return "";
        },
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
        valueFormatter: params => {
          if (params.value) return params.value.patternName;
          return "";
        },

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
        cellEditor: AutocompleteSelectCellEditor,
        valueFormatter: params => {
          if (params.value) {
            return params.value.label || params.value.value || params.value;
          }
          return "";
        },
        editable: true
      },
    ]
    this.treatmentRow = [
      {
        'cityObject': { 'itemName': '', 'itemOption': '', 'itemType': '', },
        'patternObj': { 'patternName': '', 'itemOption': '' },
        'accommodation': ''
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
    let booking: any=this.booking
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

  getDrTreatmentData(params: string) {
    this.autoService.getTreatmentData(params).subscribe(data => {
      let items = data.map(d => ({
        value: d,
        label: d.itemName,
        group: "-"
      }));
      this.examinationAutoData = items
    });
  }

  treatCellEditingStopped(event) {
    this.treatmentApi.setFocusedCell(event.rowIndex, event.colDef.field);
    let columnField = event.colDef.field
    console.log(event)
  }


  // isEditing = false;
  // @HostListener('keydown', ['$event'])
  // onKeydown(event) {
  //   event.stopPropagation();
  //   if (event.key == "Escape") {
  //     console.log('esc')
  //     return false;
  //   }
  //   if (event.key == "Enter" || event.key == "Tab") {
  //     console.log("enter")
  //     this.isEditing = false;
  //     return false;
  //   }
  //   if (event.key == "ArrowUp" || event.key == "ArrowDown") {
  //     console.log('up or down')
  //     return false;
  //   }
  //   if (this.isEditing == false) {
  //     console.log(event)
  //     if (event.key == "ArrowRight" || event.key == "ArrowLeft") {
  //       console.log(this.treatmentApi.getFocusedCell())
  //       let treatTableColumn: any = this.treatmentApi.getFocusedCell()
  //       if (treatTableColumn.column.colDef.field == "remark") {
  //         document.querySelector<HTMLElement>(`#noteGrid`).focus()
  //         this.noteApi.setFocusedCell(0, 'key');
  //       }
  //       return false;
  //     }
  //   }

  //   return true
  // }

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
