import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentSearchDialogComponent } from '../appointment/appointment-search-dialog/appointment-search-dialog.component';
import { NurseService } from 'src/app/core/services/nurse-service/nurse.service';
import { Booking } from 'src/app/core/model/booking.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import * as moment from 'moment';

export interface PeriodicElement {
  no: number;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { no: 1, name: 'Mg Aung Khant' },
  { no: 2, name: 'Mg Aung Myo Min' },
  { no: 3, name: 'Mg Kang Naing' },
];


@Component({
  selector: 'app-nurse-entry',
  templateUrl: './nurse-entry.component.html',
  styleUrls: ['./nurse-entry.component.css']
})
export class NurseEntryComponent implements OnInit {
  bookings: Booking[]
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  displayedColumns: string[] = ["position", "name", "status"]
  dataSource!: MatTableDataSource<Booking>

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private route: Router, private nurseService: NurseService,
    private appointService: AppointmentService,
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
  }

  //get Appointment
  getBooking(filter: any) {
    console.log(filter)
    this.appointService.getAppointment(filter).subscribe(appoint => {
      console.log(appoint)
      this.bookings = appoint
      this.dataSource = new MatTableDataSource(this.bookings)
    })
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
        console.log(booking)
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
          result.status="Doctor Waiting"
          this.getBooking(result)
        }
      })
  }

}
