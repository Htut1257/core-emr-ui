import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/core/model/booking.model';
import { Cashier } from 'src/app/core/model/checkout.model';
import { ServerService } from 'src/app/core/services/server-service/server.service';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { CheckOutService } from 'src/app/core/services/check-out-service/check-out.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { AppointmentSearchDialogComponent } from '../../appointment/appointment-search-dialog/appointment-search-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-check-out-list',
  templateUrl: './check-out-list.component.html',
  styleUrls: ['./check-out-list.component.css']
})
export class CheckOutListComponent implements OnInit {
  bookings: Booking[] = []
  booking: Booking
  checkOut: Cashier
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  isMobile: boolean = false
  dataSource: MatTableDataSource<Booking>
  displayedColumns: string[] = ["reg", "adm", "name","date"]

  constructor(
    private route: Router, private serverService: ServerService,
    private appointService: AppointmentService, private checkService: CheckOutService,
    private commonService: CommonServiceService,
    public dialog: MatDialog,
  ) {
    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })
  }
  ngOnInit(): void {
    let filter = {
      fromDate: this.todayDate,
      toDate: this.todayDate,
      doctorId: '-',
      regNo: '-',
      status: 'Billing'
    }
    this.getBooking(filter);
    this.getServerSideData();
  }

  getServerSideData() {
    let uri = '/opdBooking/getMessage'
    this.serverService.getServerSource(uri).subscribe(data => {
      let serverData = JSON.parse(data.data)
      console.log(serverData)
    })
  }

  //get Appointment
  getBooking(filter: any) {
    this.appointService.getAppointment(filter).subscribe(appoint => {
      this.bookings = appoint
      this.dataSource = new MatTableDataSource(this.bookings)
    })
  }

  //get all checkout
  getCheckOut(id: string) {
    return this.checkService.getCheckoutByVisitId(id).subscribe({
      next: checkOut => {
        this.checkService._checkOut = checkOut
        if (this.isMobile) {
          this.commonService.getCurrentObject(true)
          this.route.navigate(['/main/opd/check-out/voucher'])
        }else{
          this.commonService.getCurrentObject(false)
        }
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getRowData(data: Booking) {
    this.booking = data
    if (this.booking) {
      this.getCheckOut(this.booking.bookingId)
    }
    // if (this.isMobile) {
    //   this.commonService.getCurrentObject(true)
    //   this.route.navigate(['/main/opd/check-out/voucher'])
    // }else{
    //   this.commonService.getCurrentObject(false)
    // }
  } 

  searchBooking() {
    this.dialog.open(AppointmentSearchDialogComponent, {
      disableClose: true,
      width: '40%',
      data: { 
        'title': 'Check Out Search',
        'status': 'Billing'
       }
    })
      .afterClosed()
      .subscribe(result => {
        if (result.dialogStatus) {
          this.getBooking(result)
        }
      })
  }


}
