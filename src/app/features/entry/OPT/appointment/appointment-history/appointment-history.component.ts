import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/core/model/booking.model';

import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { ServerService } from 'src/app/core/services/server-service/server.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';

import { MatDialog } from '@angular/material/dialog';
import { AppointmentSearchDialogComponent } from '../appointment-search-dialog/appointment-search-dialog.component';
import * as moment from 'moment';
@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentHistoryComponent implements OnInit, OnDestroy {
  bookings: Booking[]

  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')

  displayedColumn: string[] = ["no", "date", "regno", "patient", "doctor", "phone", "serialno", "wl", "reg"]
  dataSource!: MatTableDataSource<Booking>
  serverSubscription: Subscription
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private route: Router,
    private appointService: AppointmentService, private toastService: ToastService,
    private commonService: CommonServiceService, private serverService: ServerService,
    public dialog: MatDialog
  ) {
    this.bookings = []
    this.dataSource = new MatTableDataSource<Booking>(this.bookings)
    this.appointService.bookings$.subscribe(data => {
      this.dataSource.data = data
    })
    //this.getServer()
  }

  ngOnInit(): void {
    let filter = {
      fromDate: this.todayDate,
      toDate: this.todayDate,
      doctorId: '-',
      regNo: '-',
      status: '-'
    }
    this.getBooking(filter);

    this.getServerSideData();
  }

  ngOnDestroy(): void {
    if (this.serverSubscription) {
      this.serverSubscription.unsubscribe()
    }
  }

  getServer() {
    let uri = '/opdBooking/getSSEMessage'
    this.serverSubscription = this.serverService.getServerSource(uri).subscribe(data => {
      console.log(data.data)
    })
  }

  // getServer(){
  //   this.serverService.serverData
  //   console.log( this.serverService.serverData)
  //   // if (this.serverService.serverData.actionStatus == "ADD") {
  //   //   // console.log("add")
  //   //   // this.bookings.push(serverData);
  //   //   // this.appointService.bookings.next(this.bookings)
  //   // }
  //   // if (this.serverService.serverData.actionStatus == "UPDATE") {
  //   //   console.log("update")
  //   //   // let targetIndex = this.bookings.findIndex(data => data.bookingId == serverData.bookingId)
  //   //   // this.bookings[targetIndex] = serverData
  //   //   // this.appointService.bookings.next(this.bookings)
  //   //   //this.bookings[this.bookings.indexOf(serverData.bookingId)] = serverData

  //   // }
  // }

  getServerSideData() {
    let uri = '/opdBooking/getMessage'
    this.serverSubscription = this.serverService.getServerSource(uri).subscribe(data => {
      let serverData = JSON.parse(data.data)
      console.log(serverData)
      if (serverData.actionStatus == "ADD") {
        console.log("add")
        this.bookings.push(serverData.tranObject
        );
        this.appointService.bookings.next(this.bookings)
      }
      if (serverData.actionStatus == "UPDATE") {
        console.log("update")
        let targetIndex = this.bookings.findIndex(data => data.bookingId == serverData.tranObject.bookingId)
        this.bookings[targetIndex] = serverData.tranObject

        this.appointService.bookings.next(this.bookings)
        //this.bookings[this.bookings.indexOf(serverData.bookingId)] = serverData

      }
    })
  }

  //get Appointment
  getBooking(filter: any) {
    this.appointService.getAppointment(filter).subscribe(appoint => {
      this.bookings = appoint
      this.dataSource = new MatTableDataSource(this.bookings)
      this.sortBooking()
      this.filterBooking();
    })
  }

  sortBooking() {
    this.dataSource.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'patient': return item.patientName
        case 'doctor': return item.doctorName
      }
    }
    this.dataSource.sort = this.sort
  }

  //filter table data
  filterBooking() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.bookingId.toString().toLowerCase().includes(filter) ||
        // data.regNo.toLowerCase().includes(filter) ||
        data.doctorName.toLowerCase().includes(filter) ||
        data.patientName.toLowerCase().includes(filter);
    }
  }

  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchBooking() {
    this.dialog.open(AppointmentSearchDialogComponent, {
      disableClose: true,
      width: '40%',
      data: {
        'title': 'Appointment Search',
        'status': '-'
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result.dialogStatus) {
          this.getBooking(result)
        }
      })
  }

  registerBooking(model) {
    this.route.navigate(['/main/registration/registration-setup'])
    this.appointService._booking = model
    this.commonService.getTitle("Registration")
  }

  //confirm patient booking 
  confirmBooking(model) {
    model.bStatus = model.bstatus
    this.appointService.updateAppointmentStatus(model).subscribe({
      next: appoint => {

      },
      error: err => {
        console.trace(err)
      }
    })
  }

  SSETest() {
    this.appointService.SSETest().subscribe(data => {
      console.log(data)
    })
  }

}
