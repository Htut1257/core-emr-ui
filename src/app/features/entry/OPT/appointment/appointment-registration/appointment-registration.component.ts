import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, filter, map, startWith, switchMap } from 'rxjs';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { bookingType } from 'src/app/core/model/booking.model';
import { Doctor } from 'src/app/core/model/doctor.model';
import { Gender } from 'src/app/core/model/gender.model';
import { Patient } from 'src/app/core/model/patient.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';

import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { GenderService } from 'src/app/core/services/gender-service/gender.service';
import { PatientService } from 'src/app/core/services/patient-service/patient.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

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
  selector: 'app-appointment-registration',
  templateUrl: './appointment-registration.component.html',
  styleUrls: ['./appointment-registration.component.css'],
  providers:
    [
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
    ]
})

export class AppointmentRegistrationComponent implements OnInit {

  appointForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm

  doctors: Doctor[] = []
  filteredDoc: Observable<Doctor[]>;
  patient: Patient[] = []
  filteredPatient: Observable<Patient[]>
  gender: Gender[]
  bookingTypes: any[] = bookingType
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  isLoading: boolean = false

  constructor(
    private appointService: AppointmentService, private patientService: PatientService,
    private docService: DoctorService, private genderService: GenderService,
    private toastService: ToastService,
    private dateAdapter: DateAdapter<Date>,
    private fb: FormBuilder
  ) {
    this.dateAdapter.setLocale('en-GB');
  }
  ngOnInit(): void {
    // this.getGender();
    this.initializeForm();

    this.filteredDoc = this.appointForm.controls['doctor'].valueChanges.pipe(
      startWith(''),
      switchMap(name => {
        return name ? this._filterDoc(name) : []
      })
    );

    this.filteredPatient = this.appointForm.controls['patient'].valueChanges.pipe(
      startWith(''),
      switchMap(name => {
        return name ? this._filterPatient(name) : []
      })
    )

  }

  initializeForm() {
    this.appointForm = this.fb.group({
      regNo: [null],
      bkDate: ['', Validators.required],
      patient: ['', Validators.required],
      doctor: [null, Validators.required],
      bkPhone: [''],
      bkType: [null],
    });
    console.log(this.bookingTypes[0])
    this.appointForm.get('bkDate').patchValue(this.todayDate)
    this.appointForm.get('bkType').patchValue(this.bookingTypes[0].description)
  }

  getDoctor(name: string) {
    return this.docService.getDoctorActiveByName(name).pipe(
      filter(data => !!data),
      map(item => {
        return item.filter(option => option.doctorName.toLowerCase().includes(name))
      })
    )
  }

  DocDisplayFn(item: any) {
    return item ? item.doctorName : '';
  }

  //filter data for autocomplete
  private _filterDoc(value: any): Observable<Doctor[]> {
    let filterValue = value
    return this.getDoctor(filterValue)
  }

  getPatient(name: string) {
    return this.patientService.getPatientByName(name).pipe(
      filter(data => !!data),
      map(item => {
        return item.filter(option => option.patientName.toLowerCase().includes(name))
      })
    )
  }

  patientDisplayFn(item: any) {
    return item ? item.patientName : ''
  }

  //filter data for autocomplete
  private _filterPatient(value: any): Observable<Patient[]> {
    let filteredValue = value
    return this.getPatient(filteredValue)
  }

  getGender() {
    this.genderService.getGender().subscribe({
      next: data => {
        this.gender = data;
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //compare bonus data with initial data
  compareGender(b1: Gender, b2: Gender) {
    return b1 && b2 ? b1.genderId === b2.genderId : b1 === b2
  }



  saveAppointment(data: any) {
    let booking = data
    booking.patientName = data.patient.patientName != undefined ? data.patient.patientName : data.patient
    booking.doctorId = data.doctor.doctorId
    booking.bkDate = moment(data.bkDate).format("yyyy-MM-DD")
    this.appointService.saveAppointment(booking).subscribe(data => {
      this.toastService.showSuccessToast("", "Success Adding new Appointment")
      this.onClear()
    })
  }

  onNew() {

  }

  //called on patient change autocomplete
  getpatientData(event) {
    let patient = event.option.value
    this.appointForm.get('regNo').patchValue(patient.regNo)
  }

  onBacktoList() {

  }

  onClear() {
    this.isLoading = false
    this.clearForm()
  }

  clearForm() {
    this.appointForm.reset()
    this.reactiveForm.resetForm()
    this.appointForm.get('bkDate').patchValue(this.todayDate)

  }

  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.appointForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.appointForm.controls['' + eleString + ''].value == null) {
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
