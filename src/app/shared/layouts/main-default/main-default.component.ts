import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DoctorStatusModalComponent } from 'src/app/features/entry/OPT/doctor-status-modal/doctor-status-modal.component';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ServerService } from 'src/app/core/services/server-service/server.service';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { NavItem, navItems } from 'src/app/core/model/nav-item.model';
@Component({
  selector: 'app-main-default',
  templateUrl: './main-default.component.html',
  styleUrls: ['./main-default.component.css']
})

export class MainDefaultComponent implements OnInit, AfterViewInit {

  items: NavItem[] = []
  loading: boolean = false;
  dialogRef: MatDialogRef<any>;
  @ViewChild('appDrawer') appDrawer: ElementRef;
  subscription: Subscription
  constructor(
    private route: Router, private commonService: CommonServiceService,
    private serverService: ServerService, private appointService: AppointmentService,
    public dialog: MatDialog, private cdr: ChangeDetectorRef
  ) {
    this.getServerSideData()
  }

  ngOnInit(): void {
    this.items = navItems;
    this.subscription = this.commonService.isProgress$.subscribe(data => {
      this.loading = data
      this.cdr.detectChanges()
    })
  }

  ngAfterViewInit(): void {
    this.commonService.appDrawer = this.appDrawer
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    let screenSize = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.commonService.getSize(screenSize)
  }

  getServerSideData() {
    let uri = '/opdBooking/getMessage'
    this.serverService.getServerSource(uri).subscribe(data => {
      let serverData = JSON.parse(data.data)
      //let bookings = 
      //  this.serverService.serverData = serverData
      //  console.log(this.serverService.serverData)
      if (serverData.actionStatus == "ADD") {
        console.log("add")
        this.appointService._bookings.push(serverData.tranObject);
        this.appointService.bookings.next(this.appointService._bookings)
      }
      if (serverData.actionStatus == "UPDATE") {
        console.log("update")
       let targetIndex = this.appointService._bookings.findIndex(data => data.bookingId == serverData.tranObject.bookingId)
       console.log(targetIndex)
       console.log( this.appointService._bookings[targetIndex])
       this.appointService._bookings[targetIndex] = serverData.tranObject
       this.appointService.bookings.next(this.appointService._bookings)
      }
    })
  }



  openDialog() {
    this.dialogRef = this.dialog.open(DoctorStatusModalComponent, {
      position: { right: "0", top: "0" },
      height: "100%",
      width: "200px",
      hasBackdrop: false,
      panelClass: ["animate__animated", "animate__bounceInRight"],
      data: { onClose: () => this.close() }
    });

    this.dialogRef.afterOpened().subscribe(result => {
      //this.dialogRef.removePanelClass("animate__bounceInRight");
      console.log("after openeed");
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  close() {
    console.log("test 2 close");
    this.dialogRef.addPanelClass("animate__bounceOutRight");
  }

}
