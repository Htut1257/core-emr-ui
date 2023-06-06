import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Township } from 'src/app/core/model/township.model';
import { TownshipService } from 'src/app/core/services/township-service/township.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-township-list',
  templateUrl: './township-list.component.html',
  styleUrls: ['./township-list.component.css']
})
export class TownshipListComponent implements OnInit {

  displayedColumn: string[] = ['position', 'name']
  dataSource: MatTableDataSource<Township>

  townShip: Township[] = []

  isMobile: boolean = false
  constructor(
    private townService: TownshipService,
    private route:Router,
    private commonService: CommonServiceService, private toastService: ToastService,
  ) {
    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })
    this.dataSource = new MatTableDataSource<Township>
    this.townService.town$.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getTownShip()
  }

  //get all township
  getTownShip() {
    this.townService.getAllTownship().subscribe({
      next: towns => {
        this.townShip = towns
        this.dataSource = new MatTableDataSource<Township>(this.townShip)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  ongetRowData(data:Township) {
    this.townService._town=data
    if(this.isMobile){
      this.commonService.getCurrentObject(true)
      // this.route.navigate[('/')]
    }else{
      this.commonService.getCurrentObject(false)
    }
  } 


}
