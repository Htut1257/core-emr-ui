import { Component, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import * as moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { Doctor } from 'src/app/core/model/doctor.model';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { Gender } from 'src/app/core/model/gender.model';
import { GenderService } from 'src/app/core/services/gender-service/gender.service';
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
  doctors: Doctor[] = []
  filteredDoc: Observable<any[]>;

  gender: Gender[]

  appointForm: any
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')

  constructor(
    private docService: DoctorService, private genderService: GenderService,
    private dateAdapter: DateAdapter<Date>,
    private appointService: AppointmentService, private fb: FormBuilder
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
  }


  initializeForm() {
    this.appointForm = this.fb.group({
      regisNo: [''],
      regisDate: [''],
      name: [''],
      doctor: [''],
      ph: [''],
      gender: [''],
    });

    this.appointForm.get('regisDate').patchValue(this.todayDate)
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
    let booking=data
    booking.bookingId=null
    booking.regNo=null
    booking.patientName="TEsting 455"
    booking.doctorId="042"
    booking.bkDate=moment(data.regisDate).format("yyyy-MM-DDTHH:mm:ss")
    booking.bkPhone=""
    booking.bkActive=true
    booking.bkSerialNo=""
    booking.actionStatus=""
    booking.bStatus=""

    this.appointService.saveAppointment(booking).subscribe(data => {
      console.log(data)
    })
  }

}
