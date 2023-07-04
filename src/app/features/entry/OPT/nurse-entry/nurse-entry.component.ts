import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable, startWith, map, filter, switchMap } from 'rxjs'
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
import { ServerService } from 'src/app/core/services/server-service/server.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-nurse-entry',
  templateUrl: './nurse-entry.component.html',
  styleUrls: ['./nurse-entry.component.css']
})
export class NurseEntryComponent implements OnInit {
  doctors: Doctor[] = []
  filteredDoc: Observable<Doctor[]>;
  docControl = new FormControl()

  lstTotal: number = 0
  lstWaiting: number = 0
  lstClose: number = 0

  bookings: Booking[]
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  displayedColumns: string[] = ["position", "name", "status"]
  dataSource!: MatTableDataSource<Booking>

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  constructor(
    private route: Router, private nurseService: NurseService,
    private appointService: AppointmentService, private docService: DoctorService,
    private serverService: ServerService,
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
      toDate: '2024-01-01',
      doctorId: '-',
      regNo: '-',
      status: 'Doctor Waiting'
    }
    this.getBooking(filter);
   //s this.getServerSideData();

    this.filteredDoc = this.docControl.valueChanges.pipe(
      startWith(''),
      switchMap(name => {
        return name ? this._filterDoc(name) : []
      })
    );
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
          status: 'Doctor Waiting'
        }
        this.getBooking(filter);
        let targetIndex = this.bookings.findIndex(data => data.bookingId == serverData.bookingId)
        this.bookings[targetIndex] = serverData
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
    })
  }

  //get Booking status
  getDoctorBookingStatus(id: string, date: string) {
    this.appointService.getDoctorBookingStatus(id, date).subscribe({
      next: docBookings => {
        let data: any = docBookings[0]
        console.log(data)
        this.lstTotal = data.cntRegistered
        this.lstWaiting = data.cntDoctorWaiting
        this.lstClose = data.cntBilling
      }
    })
  }

  getDoctor(id: string) {
    return this.docService.getDoctor().pipe(
      filter(data => !!data),
      map(item => {
        return item.filter(option => option.doctorName.toLowerCase().includes(id))
      })
    )
  }

  DocDisplayFn(item: any) {
    return item ? item.doctorName : '';
  }

  //filter data for autocomplete
  private _filterDoc(value: any): Observable<Doctor[]> {
    let filterValue = value
    return this.getDoctor(filterValue)
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
      width: '50%',
      data: { 'status': 'Doctor Waiting' }
    })
      .afterClosed()
      .subscribe(result => {
        if (result.dialogStatus) {
          this.getBooking(result)
        }
      })
  }

  //on selectin change
  getDoctorData(event: any) {
    let doc = event.option.value
    let filter = {
      fromDate: this.todayDate,
      toDate: this.todayDate,
      doctorId: doc.doctorId,
      regNo: '-',
      status: 'Doctor Waiting'
    }
    this.getDoctorBookingStatus(doc.doctorId, this.todayDate)
    this.getBooking(filter);
  }

}
