import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Initial } from 'src/app/core/model/doctor.model';
import { InitialService } from 'src/app/core/services/initial-service/initial.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-initial-list',
  templateUrl: './initial-list.component.html',
  styleUrls: ['./initial-list.component.css']
})
export class InitialListComponent implements OnInit {

  initial: Initial
  initials: Initial[] = []

  displayedColumn: string[] = ["position", "description"]
  dataSource: MatTableDataSource<Initial>

  isMobile: boolean = false
  constructor(
    private initialService: InitialService,
    private commonService: CommonServiceService, private toastService: ToastService
  ) {
    this.dataSource = new MatTableDataSource<Initial>(this.initials)
    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })
    this.initialService.initial$.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getInitial()
  }

  getInitial() {
    this.initialService.getInitial().subscribe({
      next: initials => {
        console.log(initials)
        this.initials = initials
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  onRowData(data) {
    this.initialService._initial = data
    if (this.isMobile) {
      this.commonService.getCurrentObject(true)
    } else {
      this.commonService.getCurrentObject(false)
    }
  }

}
