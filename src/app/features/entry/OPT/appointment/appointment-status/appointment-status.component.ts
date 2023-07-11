import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorBooking } from 'src/app/core/model/booking.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { ServerService } from 'src/app/core/services/server-service/server.service';
import * as moment from 'moment';
@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrls: ['./appointment-status.component.css']
})
export class AppointmentStatusComponent implements OnInit {

  docBooking: DoctorBooking
  docBookings: DoctorBooking[] = []

  displayedColumn: string[] = ["position", "doctor", "schedule", "status1", "status2", "status3", "status4",
    "status5", "status6", "status7", "status8", "status9", "status10"]
  dataSource: MatTableDataSource<DoctorBooking>

  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')

  constructor(
    private appointService: AppointmentService,
    private serverService: ServerService,
  ) {

  }

  ngOnInit(): void {
    this.getDoctorBookingStatus('-', '2023-07-03')
    //this.getServerSideData()
  }

  getServerSideData() {
    let uri = '/opdBooking/getMessage'
    // this.serverService.getServerSource(uri).subscribe(data => {
    //   let serverData = JSON.parse(data.data)
    //   console.log(serverData)
    //   this.getDoctorBookingStatus('-', '2023-07-03')
    // })
  }

  getDoctorBookingStatus(id: string, date: string) {
    this.dataSource = new MatTableDataSource<DoctorBooking>(this.docBookings)
    this.appointService.getDoctorBookingStatus(id, date).subscribe({
      next: docBookings => {
        console.log(docBookings)
        this.docBookings = docBookings
        this.dataSource.data = this.docBookings
      }
    })
  }

}
