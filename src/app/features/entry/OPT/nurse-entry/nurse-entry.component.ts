import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable,startWith,map } from 'rxjs'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentSearchDialogComponent } from '../appointment/appointment-search-dialog/appointment-search-dialog.component';
import { NurseService } from 'src/app/core/services/nurse-service/nurse.service';
import { Booking } from 'src/app/core/model/booking.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { Doctor } from 'src/app/core/model/doctor.model';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-nurse-entry',
  templateUrl: './nurse-entry.component.html',
  styleUrls: ['./nurse-entry.component.css']
})
export class NurseEntryComponent implements OnInit {
  doctors: Doctor[] = []
  filteredDoc: Observable<any[]>;
  docControl = new FormControl()
  bookings: Booking[]
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  displayedColumns: string[] = ["position", "name", "status"]
  dataSource!: MatTableDataSource<Booking>

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private route: Router, private nurseService: NurseService,
    private appointService: AppointmentService, private docService: DoctorService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Booking>(this.bookings)
    this.appointService.bookings.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    let filter = {
      fromDate: this.todayDate,
      toDate: this.todayDate,
      doctorId: '-',
      regNo: '-',
      status: 'Doctor Waiting'
    }
    this.getBooking(filter);

    this.filteredDoc = this.docControl.valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filterDoc(name) : this.doctors.slice()))
    );

  }

  //get Appointment
  getBooking(filter: any) {
    this.appointService.getAppointment(filter).subscribe(appoint => {
      this.bookings = appoint
      this.dataSource = new MatTableDataSource(this.bookings)
    })
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

  getNurse() {
    this.nurseService.getNurse().subscribe(data => {
      console.log(data)
    })
  }

  consultPatient(model) {
    let booking: any = model
    booking.bStatus = booking.bstatus
    this.appointService.updateAppointmentStatus(booking).subscribe({
      next: booking => {
        console.log("status changed")
      }, error: err => {
        console.trace(err)
      }
    })
  }

  searchBooking() {
    this.dialog.open(AppointmentSearchDialogComponent, {
      disableClose: true,
      width: '50%'
    })
      .afterClosed()
      .subscribe(result => {
        if (result.dialogStatus) {
          result.status = "Doctor Waiting"
          this.getBooking(result)
        }
      })
  }

  getDoctorData(event:any){
    let doc = event.option.value
    let filter = {
      fromDate: this.todayDate,
      toDate: this.todayDate,
      doctorId: doc.doctorId,
      regNo: '-',
      status: 'Doctor Waiting'
    }
    this.getBooking(filter);
  }

}
