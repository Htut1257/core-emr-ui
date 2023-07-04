import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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
  @ViewChild(MatSort, { static: true }) sort: MatSort
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
    this.appointService.bookings$.subscribe(data => {
      this.dataSource.data = data
    })

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
   // this.getServerSideData();
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
    console.log(filter)
    this.appointService.getAppointment(filter).subscribe(appoint => {
      this.bookings = appoint//.filter((data: any) => data.bstatus === "Confirm")
      this.dataSource = new MatTableDataSource(this.bookings)
      this.filterBooking()
      this.sortBooking()
    })
  }

  filterBooking() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.bookingId.toString().toLowerCase().includes(filter) ||
        // data.regNo.toLowerCase().includes(filter) ||
        data.doctorName.toLowerCase().includes(filter) ||
        data.patientName.toLowerCase().includes(filter);
    }
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

  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      width: '40%',
      data: {
        'title': 'Vital Sign Search',
        'status': 'Vital Sign'
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
