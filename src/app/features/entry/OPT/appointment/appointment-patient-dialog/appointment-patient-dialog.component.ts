import { Component, Inject, OnInit } from '@angular/core';
import { map, pipe } from 'rxjs'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/core/model/booking.model';
import { User } from 'src/app/core/model/user.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { UserService } from 'src/app/core/services/user-service/user-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-appointment-patient-dialog',
  templateUrl: './appointment-patient-dialog.component.html',
  styleUrls: ['./appointment-patient-dialog.component.css']
})
export class AppointmentPatientDialogComponent implements OnInit {
  user: User
  bookings: Booking[]

  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')

  displayedColumn: string[] = ["no", "date", "regno", "patient", "doctor", "phone", "serialno", "wl"]
  dataSource!: MatTableDataSource<Booking>


  constructor(
    private appointService: AppointmentService, private userService: UserService,
    public dialogRef: MatDialogRef<AppointmentPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.user = this.userService.getUserValue()
    this.bookings = []
    this.dataSource = new MatTableDataSource<Booking>(this.bookings)
    // this.appointService.bookings.subscribe(data => {
    //   this.dataSource.data = data
    // })
  }

  ngOnInit(): void {
    let filter = {
      fromDate: this.todayDate,
      toDate:'2024-01-01',
      doctorId: "047",
      regNo: '-',
      //tatus: '-'
      status: '-'
    }
    console.log(filter)
    this.getBooking(filter);
  }

  //get Appointment
  getBooking(filter: any) {
    this.appointService.getAppointment(filter).pipe(
      map((data: any) => {
        return data.filter(appoint => {
          return appoint.bkPatientStatus
        })
      })
    ).subscribe(data => {
      this.bookings = data
      console.log(data)
      this.dataSource = new MatTableDataSource<Booking>(this.bookings)
      this.dataSource.data = data
    })

    // this.appointService.getAppointment(filter)
    //   .subscribe(appoint => {
    //     this.bookings = appoint.filter(item => parseInt(item.bkPatientStatus) > 5)
    //     this.dataSource = new MatTableDataSource(this.bookings)
    //   })
  }

  getBookingRowData(data: Booking) {
    this.dialogRef.close(data);
  }


}
