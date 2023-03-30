import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Booking } from 'src/app/core/model/booking.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentSearchDialogComponent } from '../../OPT/appointment/appointment-search-dialog/appointment-search-dialog.component';
import * as moment from 'moment';
@Component({
  selector: 'app-vital-sign',
  templateUrl: './vital-sign.component.html',
  styleUrls: ['./vital-sign.component.css']
})
export class VitalSignComponent implements OnInit {

  bookings: Booking[]

  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')

  displayedColumn: string[] = ["no", "date", "visitno", "regno", "patient", "doctor", "phone", "serialno", "wl","reg"]
  dataSource!: MatTableDataSource<Booking>
  isMobile: boolean = false
  constructor(
    private route: Router, private appointService: AppointmentService,
    public dialog: MatDialog,
  ) {
    this.bookings = []
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
      status:'CONFIRM'
    }
    this.getBooking(filter);
  }

  getBooking(filter: any) {
    this.appointService.getAppointment(filter).subscribe(appoint => {
      console.log(appoint)
      this.bookings = appoint
      this.dataSource = new MatTableDataSource(this.bookings)
    })
  }

  vitalBooking(model) {
    this.appointService._booking = model
  }

  searchBooking(){
    this.dialog.open(AppointmentSearchDialogComponent, {
      disableClose: true,
      width: '50%'
    })
      .afterClosed()
      .subscribe(result => {
        if (result.dialogStatus) {
          this.getBooking(result)
        }
      })
  }

}
