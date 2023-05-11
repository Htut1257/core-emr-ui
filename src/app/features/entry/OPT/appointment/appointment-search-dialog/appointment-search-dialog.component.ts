import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs'
import { Doctor } from 'src/app/core/model/doctor.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
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
  selector: 'app-appointment-search-dialog',
  templateUrl: './appointment-search-dialog.component.html',
  styleUrls: ['./appointment-search-dialog.component.css'],
  providers:
    [
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
    ]
})
export class AppointmentSearchDialogComponent implements OnInit {

  doctors: Doctor[]
  bookingStatus:string='-'
  filteredDoc: Observable<any[]>;

  appointForm
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')

  constructor(
    private appointService: AppointmentService, private doctorService: DoctorService,
    private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>,
    public dialogRef: MatDialogRef<AppointmentSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dateAdapter.setLocale('en-GB');
    this.doctors = []
  }

  ngOnInit(): void {
    this.initializeForm();
    this.bookingStatus=this.data.status
    console.log(this.data.status)
    this.filteredDoc = this.appointForm.controls['doctor'].valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filterDoc(name) : this.doctors.slice()))
    );
  }

  initializeForm() {
    this.appointForm = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
      doctor: ['-'],
      regNo: ['-']
    })
    this.appointForm.get('fromDate').patchValue(this.todayDate)
    this.appointForm.get('toDate').patchValue(this.todayDate)
  }

  getDoctor(name: string) {
    this.doctorService.getDoctor(name).subscribe({
      next: doctors => {
        this.doctors = doctors
      },
      error: err => {
        console.trace(err)
      }
    })
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

  DocDisplayFn(item: any) {
    return item ? item.doctorName : '';
  }


  searchAppointment(data:any) {
    let filter=data
    filter.fromDate=moment(data.fromDate).format("yyyy-MM-DD")
    filter.toDate=moment(data.toDate).format("yyyy-MM-DD")
    filter.doctorId=filter.doctor!='-'?filter.doctor.doctorId:'-'
    filter.status=this.bookingStatus
    filter.dialogStatus=true
    this.dialogRef.close(filter)
  }
}
