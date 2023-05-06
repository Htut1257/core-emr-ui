import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Booking } from 'src/app/core/model/booking.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ServerService } from 'src/app/core/services/server-service/server.service';
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

  displayedColumn: string[] = ["no", "date", "regno", "patient", "doctor", "wl", "reg"]
  dataSource!: MatTableDataSource<Booking>
  isMobile: boolean = false
  constructor(
    private route: Router, private appointService: AppointmentService,
    private commonService: CommonServiceService, private serverService: ServerService,
    public dialog: MatDialog,
  ) {
    this.bookings = []
    this.dataSource = new MatTableDataSource<Booking>(this.bookings)
    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })
    this.appointService.bookings.subscribe(data => {
      this.dataSource.data = data
    })
    // this.appointService.bookings.pipe(
    //   map((data:any)=>{
    //     return data.filter(appoint=>{
    //       return appoint.bstatus=="Confirm"
    //     })
    //   })
    // ).subscribe(data=>{
    //   this.dataSource.data = data
    // })
  }

  ngOnInit(): void {
    let filter = {
      fromDate: this.todayDate,
      toDate: this.todayDate,
      doctorId: '-',
      regNo: '-',
      status: 'Vital Sign'
    }
    this.getBooking(filter);
    this.getServerSideData();
  }

  getServerSideData() {
    let uri = '/opdBooking/getMessage'
    this.serverService.getServerSource(uri).subscribe(data => {
      let serverData = JSON.parse(data.data)
      console.log(serverData)

      if (serverData.actionStatus == "UPDATE") {
        console.log("update")
        let filter = {
          fromDate: this.todayDate,
          toDate: this.todayDate,
          doctorId: '-',
          regNo: '-',
          status: 'Vital Sign'
        }
        this.getBooking(filter);
        let targetIndex = this.bookings.findIndex(data => data.bookingId == serverData.bookingId)
        this.bookings[targetIndex] = serverData
        this.appointService.bookings.next(this.bookings)
        //this.bookings[this.bookings.indexOf(serverData.bookingId)] = serverData

      }
    })
  }

  getBooking(filter: any) {
    this.appointService.getAppointment(filter).subscribe(appoint => {
      this.bookings = appoint.filter((data: any) => data.bstatus === "Confirm")
      this.dataSource = new MatTableDataSource(this.bookings)
    })

  }

  vitalBooking(model) {
    this.appointService._booking = model
    console.log(this.isMobile)
    if (this.isMobile) {
      this.commonService.getCurrentObject(true)
    } else {
      this.commonService.getCurrentObject(false)
    }
  }

  searchBooking() {
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
