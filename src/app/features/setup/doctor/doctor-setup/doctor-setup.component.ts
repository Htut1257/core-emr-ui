import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs'
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { GridApi, GridOptions, ColumnApi } from 'ag-grid-community';
import { MatDialog } from '@angular/material/dialog';
import { Doctor, Initial, Speciality, Type } from 'src/app/core/model/doctor.model';
import { Gender } from 'src/app/core/model/gender.model';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { GenderService } from 'src/app/core/services/gender-service/gender.service';
import { InitialService } from 'src/app/core/services/initial-service/initial.service';
import { SpecialityService } from 'src/app/core/services/speciality-service/speciality.service';

import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

import { InitialDialogComponent } from '../../initial/initial-dialog/initial-dialog.component';
import { GenderDialogComponent } from '../../gender/gender-dialog/gender-dialog.component';
import { SpecialityDialogComponent } from '../../speciality/speciality-dialog/speciality-dialog.component';

import { AutocompleteCell } from 'src/app/shared/cell-renderer/autocomplete-cell';

@Component({
  selector: 'app-doctor-setup',
  templateUrl: './doctor-setup.component.html',
  styleUrls: ['./doctor-setup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorSetupComponent implements OnInit, OnDestroy {

  //#region grid variable

  opdFeeGridOption: GridOptions
  otFeeGridOption: GridOptions
  dcFeeGridOption: GridOptions

  opdFeeApi: GridApi
  otFeeApi: GridApi
  dcFeeApi: GridApi

  opdFeeColumn: ColumnApi
  otFeeColumn: ColumnApi
  dcFeeColumn: ColumnApi

  opdFeeColumnDef: any
  otFeeColumnDef: any
  dcFeeColumnDef: any

  opdFeeRow: any
  otFeeRow: any
  dcFeeRow: any

  public frameworkComponents

  //#endregion grid variable
  gender: Gender
  genders: Gender[] = []

  initial: Initial
  initials: Initial[] = []

  special: Speciality
  specials: Speciality[] = []

  type: any[] = []

  doctor: Doctor
  doctorForm: FormGroup
  @ViewChild("reactiveForm", { static: true }) reactiveForm: NgForm
  subscribe: Subscription
  constructor(
    private doctorService: DoctorService, private genderService: GenderService,
    private initialService: InitialService, private specialService: SpecialityService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public formBuilder: FormBuilder, public dialog: MatDialog
  ) {
    this.type = Type
    this.frameworkComponents = {
      autoComplete: AutocompleteCell
    }

    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        this.doctor = this.doctorService._doctor
        if (this.doctor) {
          this.initializeFormData(this.doctor)
        }

      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()

    this.getOpdData()
    this.getOtData()
    this.getDcData()
    this.initializeGrid()

    this.getGender()
    this.getInitial()
    this.getSpeciality()

  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe()
    }
  }

  initializeForm() {
    this.doctorForm = this.formBuilder.group({
      doctorId: [{ value: null, disabled: true }],
      doctorName: ['', Validators.required],
      gender: [null, Validators.required],
      speciality: [null],
      initial: [null, Validators.required],
      licenseNo: [''],
      type: [null],
      active: [true],
    })
  }

  initializeFormData(data: Doctor) {
    console.log(data)
    this.doctorForm.patchValue({
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      gender: data.genderId,
      speciality: '',
      initial: data.initialID,
      licenseNo: data.licenseNo,
      //type: 
      active: data.active
    })
  }

  getGender() {
    this.genderService.getGender().subscribe({
      next: genders => {
        this.genders = genders
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getInitial() {
    this.initialService.getInitial().subscribe({
      next: initials => {
        this.initials = initials
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getSpeciality() {
    this.specialService.getAllSpeciality().subscribe({
      next: specials => {
        this.specials = specials
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  genderDisplayFn(item: Gender) {
    return item ? item.description : '';
  }

  initialDisplayFn(item: Initial) {
    return item ? item.initialName : '';
  }

  specialDisplayFn(item: Speciality) {
    return item ? item.desp : '';
  }

  initializeGrid() {
    this.opdFeeGridOption = {
      columnDefs: this.opdFeeColumnDef,
      rowData: this.opdFeeRow,
      suppressScrollOnNewData: false,
      rowHeight: 22
    }

    this.otFeeGridOption = {
      columnDefs: this.otFeeColumnDef,
      rowData: this.otFeeRow,
      suppressScrollOnNewData: false,
      rowHeight: 22
    }

    this.dcFeeGridOption = {
      columnDefs: this.dcFeeColumnDef,
      rowData: this.dcFeeRow,
      suppressScrollOnNewData: false,
      rowHeight: 22
    }
  }

  onGridOptionReadyOpdFee(param) {
    this.opdFeeApi = param.api
    this.opdFeeColumn = param.columnApi
    this.opdFeeApi.sizeColumnsToFit()
  }

  onGridOptionReadyOtFee(param) {
    this.otFeeApi = param.api
    this.otFeeColumn = param.columnApi
    this.otFeeApi.sizeColumnsToFit()
  }

  onGridOptionReadyDcFee(param) {
    this.dcFeeApi = param.api
    this.dcFeeColumn = param.columnApi
    this.dcFeeApi.sizeColumnsToFit()
  }

  //column and row defination for opd
  getOpdData() {
    this.opdFeeColumnDef = [
      {
        headerName: 'Opd Service',
        field: 'opdFeeObj',
        width: 100,
        editable: true,
        cellEditor: 'autoComplete',
        cellEditorParams: {
          'propertyRendered': 'serviceName',
          'returnObject': true,
          'columnDefs': [
            { headerName: 'Code', field: 'serviceId' },
            { headerName: 'Description', field: 'serviceName' },
            { headerName: 'Fee', field: 'fees' },
          ]
        },
        cellClass: "actions-button-cell"
      },
      {
        headerName: 'Opd Fee',
        field: 'fee',
        width: 100,
        editable: true,
      }
    ]
    this.opdFeeRow = [
      { opdFeeObj: { serviceId: '', servieName: '', fees: '' }, fee: '' },
      { opdFeeObj: { serviceId: '', servieName: '', fees: '' }, fee: '' },
      { opdFeeObj: { serviceId: '', servieName: '', fees: '' }, fee: '' },
    ]
  }

  //column and row defination for ot
  getOtData() {
    this.otFeeColumnDef = [
      {
        headerName: 'Ot Service',
        field: 'service',
        width: 100,
        editable: true,
      },
      {
        headerName: 'Ot Fee',
        field: 'fee',
        width: 100,
        editable: true,
      }
    ]
    this.otFeeRow = [
      { service: '', fee: '' }
    ]
  }

  //column and row defination for dc
  getDcData() {
    this.dcFeeColumnDef = [
      {
        headerName: 'DC Service',
        field: 'service',
        width: 100,
        editable: true,
      },
      {
        headerName: 'DC Fee',
        field: 'fee',
        width: 100,
        editable: true,
      }
    ]
    this.dcFeeRow = [
      { service: '', fee: '' }
    ]
  }

  onClick(event) {

  }

  openInitial(event) {
    event.stopPropagation()
    this.dialog.open(InitialDialogComponent, {
      disableClose: true,
      width: '40%',
      data: {
        'title': 'Appointment Search',
        'status': '-'
      }
    })
  }

  openGender(event) {
    event.stopPropagation()
    this.dialog.open(GenderDialogComponent, {
      disableClose: true,
      width: '40%',
      data: {
        'title': 'Appointment Search',
        'status': '-'
      }
    })
  }

  openSpeciality(event) {
    event.stopPropagation()
    this.dialog.open(SpecialityDialogComponent, {
      disableClose: true,
      width: '40%',
      data: {
        'title': 'Appointment Search',
        'status': '-'
      }
    })
  }

  onSaveDoctor(data: any) {

  }

  onNew() {

  }

  onClear() {

  }

  clearForm() {

  }

}
