import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from 'src/app/core/model/booking.model';
import { ServerService } from 'src/app/core/services/server-service/server.service';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { CheckOutService } from 'src/app/core/services/check-out-service/check-out.service';
import { AppointmentSearchDialogComponent } from '../../appointment/appointment-search-dialog/appointment-search-dialog.component';
import * as moment from 'moment';
@Component({
  selector: 'app-check-out-list',
  templateUrl: './check-out-list.component.html',
  styleUrls: ['./check-out-list.component.css']
})
export class CheckOutListComponent implements OnInit {
  bookings: Booking[] = []
  todayDate = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')

  dataSource: MatTableDataSource<Booking>
  displayedColumns: string[] = ["reg", "adm", "name"]

  constructor(
    private route: Router, private serverService: ServerService,
    private appointService: AppointmentService, private checkService: CheckOutService,
    public dialog:MatDialog,
  ) {

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
      console.log(this.bookings)
      this.dataSource = new MatTableDataSource(this.bookings)
    })
  }

  //get all checkout
  getCheckOut() {
    this.checkService.getCheckup().subscribe(data => {
      console.log(data)
    })
  }

  getRowData(data: any) {
    this.checkService.checkOut = data
    this.route.navigate(['/main/opd/check-out/voucher'])
  }

  searchBooking() {
    this.dialog.open(AppointmentSearchDialogComponent, {
      disableClose: true,
      width: '50%',
      data:{'status':'Billing'}
    })
      .afterClosed()
      .subscribe(result => {
        if (result.dialogStatus) {
          this.getBooking(result)
        }
      })
  }


}
