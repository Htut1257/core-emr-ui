import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/core/model/booking.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { ServerService } from 'src/app/core/services/server-service/server.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {
  bookings: Booking[]

  displayedColumn: string[] = ["no", "date", "visitno", "regno", "patient", "doctor", "phone", "serialno", "wl"]
  dataSource!: MatTableDataSource<Booking>
  @ViewChild(MatSort, { static: true }) sort!: MatSort;



  constructor(
    private appointService: AppointmentService, private toastService: ToastService,
    private commonService: CommonServiceService, private serverService: ServerService
  ) {
    this.bookings = []
    this.dataSource = new MatTableDataSource<Booking>(this.bookings)
    this.appointService.bookings.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getBooking();
    this.getServerSideData();
  }

  getServerSideData() {
    let uri = 'http://192.168.100.48:8080/opdBooking/getMessage'
    this.serverService.getServerSource(uri).subscribe(data => {
      console.log(JSON.parse(data.data))
      let serverData = JSON.parse(data.data)
      if (serverData.actionStatus = "ADD") {
        this.bookings.push(serverData);
        this.appointService.bookings.next(this.bookings)
      }
      if (serverData.actionStatus = "UPDATE") {
        this.bookings[this.bookings.indexOf(serverData.bookingSerialNo)] = serverData
      }
    })
  }

  //get Appointment
  getBooking() {
    console.log("called")
    this.appointService.getAppointment().subscribe(appoint => {
      console.log(appoint)
      this.bookings = appoint
      this.dataSource = new MatTableDataSource(this.bookings)
      this.filterBooking();

    })
  }

  //filter table data
  filterBooking() {
    this.dataSource.filterPredicate = (data: Booking, filter: string) => {
      return data.bookingId.toString().toLowerCase().includes(filter) ||
        data.regNo.toLowerCase().includes(filter) ||
        data.patientName.toLowerCase().includes(filter)
        ;
    }
  }

}
