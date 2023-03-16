import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { IPatientFormGroup, Patient } from 'src/app/core/model/patient.model';
import { PatientService } from 'src/app/core/services/patient-service/patient.service';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { TownshipService } from 'src/app/core/services/township-service/township.service';
import { Observable, map, startWith } from 'rxjs';
import { Doctor } from 'src/app/core/model/doctor.model';
import { Township } from 'src/app/core/model/township.model';
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

  patient: Patient
  registrationForm: IPatientFormGroup

  doctors: Doctor[] = []
  towns: Township[] = []

  filteredDoc: Observable<any[]>;
  filteredTown: Observable<any[]>;

  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  constructor(private route: Router, private patientService: PatientService,
    private docService: DoctorService, private townService: TownshipService,
    private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.getTownship();

    this.initializeForm();

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
      regNo: ['22832023'],
      regDate: [],
      dob: [null],
      sex: [''],
      fatherName: [''],
      nirc: [''],
      nationality: [''],
      religion: [''],
      doctor: [''],
      patientName: [''],
      address: [''],
      contactNo: [''],
      createdBy: [''],
      admissionNo: [''],
      age: [0],
      year: [0],
      month: [0],
      day: [0],
      township: [0],
      ptType: [''],
      otId: ['']
    }) as IPatientFormGroup;


    // fill the form with this data
    this.registrationForm.get('regDate').patchValue(this.todayDate)
    this.registrationForm.get('dob').patchValue(this.todayDate)
    //this.form.patchValue(this.myData);
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

    let patient = data
    patient.doctor = data.doctor.doctorId
    patient.township = data.township.townshipId
    patient.regDate = moment(data.regDate).format("yyyy-MM-DDTHH:mm:ss");
    patient.dob = moment(data.dob).format("yyyy-MM-DDTHH:mm:ss");
    console.log(patient)
  
    console.log("Before save :" + JSON.stringify(data))
    this.patientService.savePatient(patient).subscribe(data => {
      console.log("After Save" + JSON.stringify(data))
    })
  }
}
