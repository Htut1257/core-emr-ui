import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Patient } from 'src/app/core/model/patient.model';
import { PatientService } from 'src/app/core/services/patient-service/patient.service';
import { Doctor } from 'src/app/core/model/doctor.model';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { Gender } from 'src/app/core/model/gender.model';
import { GenderService } from 'src/app/core/services/gender-service/gender.service';
import { Township } from 'src/app/core/model/township.model';
import { TownshipService } from 'src/app/core/services/township-service/township.service';
import { Booking } from 'src/app/core/model/booking.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
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
  selector: 'app-registration-setup',
  templateUrl: './registration-setup.component.html',
  styleUrls: ['./registration-setup.component.css'],
  providers:
    [
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
    ]
})
export class RegistrationSetupComponent implements OnInit {

  registrationForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm

  patient: Patient 
  booking: Booking

  doctors: Doctor[] = []
  towns: Township[] = []
  gender: Gender[] = []
  filteredDoc: Observable<any[]>;
  filteredTown: Observable<any[]>;

  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  todayYear = moment(new Date(), 'MM/DD/YYYY').format('YYYY')
  isLoading: boolean = false
  regNo:any=null
  constructor(private route: Router, private patientService: PatientService,
    private docService: DoctorService, private townService: TownshipService,
    private appintService: AppointmentService, private commonService: CommonServiceService,
    private toastService: ToastService, private genderService: GenderService,
    private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>,
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getTownship();
    this.getGender();
    if (this.appintService._booking != undefined) {
      this.booking = this.appintService._booking
      this.initializeFormData(this.booking)
    }

    this.filteredDoc = this.registrationForm.controls['doctor'].valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filterDoc(name) : this.doctors.slice()))
    );

    this.filteredTown = this.registrationForm.controls['township'].valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filterTown(name) : this.towns.slice()))
    );
  }

  //initialize form with interface model
  initializeForm() {
    this.registrationForm = this.formBuilder.group({
      regNo: [{ value: null ,disabled:true}],
      regDate: [null, Validators.required],
      dob: [null],
      sex: [null,Validators.required],
      fatherName: [''],
      nirc: [''],
      nationality: [''],
      religion: [''],
      doctor: [null,Validators.required],
      patientName: ['',Validators.required],
      address: [''],
      contactNo: [''],
      createdBy: [''],
      admissionNo: [''],
      age: [0],
      year: [0],
      month: [0],
      day: [0],
      township: [null,Validators.required],
      ptType: [''],
      otId: ['']
    })
    // fill the form with this data
    this.registrationForm.get('regDate').patchValue(this.todayDate)
    this.registrationForm.get('dob').patchValue(this.todayDate)
  }

  initializeFormData(data) {
    this.regNo=data.regNo
    this.registrationForm.get('regNo').patchValue(data.regNo)
    this.registrationForm.get('regDate').patchValue(data.bkDate)
    this.registrationForm.get('patientName').patchValue(data.patientName)
    this.registrationForm.get('contactNo').patchValue(data.bkPhone)
    let doc = {
      doctorId: data.doctorId,
      doctorName: data.doctorName
    }
    this.registrationForm.get('doctor').patchValue(doc)

  }

  getDoctor(id: string) {
    this.docService.getDoctor(id).subscribe({
      next: doctors => {
        this.doctors = doctors;

      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getTownship() {
    this.townService.getAllTownship().subscribe({
      next: towns => {
        this.towns = towns
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getGender() {
    this.genderService.getGender().subscribe({
      next: data => {
        this.gender = data
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  DocDisplayFn(item: any) {
    return item ? item.doctorName : '';
  }

  TownDisplayFn(item: any) {
    return item ? item.townshipName : '';
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

  changed() {
    console.log("changed")
  }

  //filter data for autocomplete
  private _filterTown(value: any): any {
    let filterValue = value

    this.getDoctor(value)
    if (value.townshipName != null) {
      filterValue = value.townshipName.toLowerCase()
    } else {
      filterValue = value.toLowerCase()
    }
    return this.towns.filter(data => data.townshipName.toLowerCase().includes(filterValue));
  }

  //save regis
  saveRegis(data: any) {
    console.log(data)
    let patient = data
    patient.regNo=this.regNo
    patient.sex=data.sex.genderId
    patient.doctor = data.doctor.doctorId
    patient.township = data.township.townshipId
    patient.regDate = moment(data.regDate).format("yyyy-MM-DDTHH:mm:ss");
    patient.dob = moment(data.dob).format("yyyy-MM-DDTHH:mm:ss");
    patient.bookingId = this.booking != undefined ? this.booking.bookingId : null
    console.log(patient)
    this.patientService.savePatient(patient).subscribe({
      next: registration => {
        this.toastService.showSuccessToast("Registrations", "Success adding new Registration")
        this.appintService._booking = undefined
        this.onClear();
      },
      error: err => {
        console.trace(err);
      }
    })
  }

  onNew() {

  }

  onBacktoList() {
    this.appintService._booking = undefined
    this.route.navigate(['/main/opd/appointment'])
    this.commonService.getTitle("Appiontment");
  }

  onClear() {
    this.isLoading = false
    this.clearForm()
  }

  clearForm() {
    this.registrationForm.reset()
    this.reactiveForm.resetForm()
    this.registrationForm.get('regDate').patchValue(this.todayDate)
    this.registrationForm.get('dob').patchValue(this.todayDate)
  }

  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.registrationForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.registrationForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (eleString == "year") {
      let patientYear = this.registrationForm.controls['' + eleString + ''].value
      patientYear = parseInt(this.todayYear) - patientYear
      patientYear = moment('01/01/' + patientYear, 'MM/DD/YYYY').format('YYYY-MM-DD')
      this.registrationForm.get('dob').patchValue(patientYear)
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
