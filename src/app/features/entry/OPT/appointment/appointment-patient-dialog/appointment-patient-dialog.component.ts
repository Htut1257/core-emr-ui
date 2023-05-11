import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/core/model/booking.model';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import * as moment from 'moment';
@Component({
  selector: 'app-appointment-patient-dialog',
  templateUrl: './appointment-patient-dialog.component.html',
  styleUrls: ['./appointment-patient-dialog.component.css']
})
export class AppointmentPatientDialogComponent implements OnInit {

  bookings: Booking[]

  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')


  displayedColumn: string[] = ["no", "date", "regno", "patient", "doctor", "phone", "serialno", "wl"]
  dataSource!: MatTableDataSource<Booking>


  constructor(
    private appointService: AppointmentService,
    public dialogRef: MatDialogRef<AppointmentPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.bookings = []
    this.dataSource = new MatTableDataSource<Booking>(this.bookings)
    this.appointService.bookings.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    
    let filter = {
      fromDate:this.todayDate,
      toDate: this.todayDate,
      doctorId: '-',
      regNo: '-',
      status: 'Doctor Room'
    }
    this.getBooking(filter);
  }

  //get Appointment
  getBooking(filter: any) {
    this.appointService.getAppointment(filter).subscribe(appoint => {
      this.bookings = appoint
      console.log(appoint)
      this.dataSource = new MatTableDataSource(this.bookings)
    })
  }

  getBookingRowData(data:Booking){
    this.dialogRef.close(data);
  } 


}
