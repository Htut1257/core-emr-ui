import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
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
  filteredDoc: Observable<any[]>;
  patient: Patient[] = []
  filteredPatient: Observable<any[]>
  gender: Gender[]
  bookingTypes:any[]=bookingType
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
      map(name => (name ? this._filterDoc(name) : this.doctors.slice()))
    );

    this.filteredPatient = this.appointForm.controls['patient'].valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filterPatient(name) : this.patient.slice()))
    )

  }

  initializeForm() {
    this.appointForm = this.fb.group({
      regNo: [null],
      bkDate: ['', Validators.required],
      patient: ['', Validators.required],
      doctor: [null, Validators.required],
      bkPhone: [''],
      bkType:[null],
    });
    this.appointForm.get('bkDate').patchValue(this.todayDate)
  }

  getDoctor(id: string) {
    this.docService.getDoctor(id).subscribe({
      next: doctors => {
        this.doctors = doctors;
        console.log(doctors)
        console.log(this.doctors)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  DocDisplayFn(item: any) {
    return item ? item.doctorName : '';
  }

  //filter data for autocomplete
  private _filterDoc(value: any): any {
    let filterValue = value
    this.getDoctor(value)
    if (value.doctorName != null) {
      filterValue = value.doctorName.toLowerCase()
    } else {
      filterValue = value.toLowerCase()
    }
    return this.doctors.filter(data => data.doctorName.toLowerCase().includes(filterValue));
  }

  getPatient(name: string) {
    this.patientService.getPatientByName(name).subscribe({
      next: data => {
        this.patient = data
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  patientDisplayFn(item: any) {
    return item ? item.patientName : ''
  }

  //filter data for autocomplete
  private _filterPatient(value: any) {
    let filterValue = value
    this.getPatient(value)
    if (value.patientName != null) {
      filterValue = value.patientName.toLowerCase()
    } else {
      filterValue = value.toLowerCase()
    }
    return this.patient.filter(data => data.patientName.toLowerCase().includes(filterValue));
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
      // this.appointService._bookings.push(data)   
      // this.appointService.bookings.next(this.appointService._bookings)
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
