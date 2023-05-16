import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,HostListener ,ChangeDetectorRef} from '@angular/core';
import{Subscription} from 'rxjs'
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DoctorStatusModalComponent } from 'src/app/features/entry/OPT/doctor-status-modal/doctor-status-modal.component';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
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
  subscription:Subscription
  constructor(
    private route: Router, private commonService: CommonServiceService,
    public dialog: MatDialog,private cdr:ChangeDetectorRef
  ) {
   
  }

  ngOnInit(): void {
    console.log(window.location.hostname)
    this.items = navItems;
    this.subscription=this.commonService.isProgress$.subscribe(data=>{
      this.loading=data
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
