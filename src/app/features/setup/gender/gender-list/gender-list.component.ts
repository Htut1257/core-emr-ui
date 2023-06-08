import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Gender } from 'src/app/core/model/gender.model';
import { GenderService } from 'src/app/core/services/gender-service/gender.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.css']
})
export class GenderListComponent implements OnInit {

  gender: Gender
  genders: Gender[] = []

  displayedColumn: string[] = ["position", "desc"]
  dataSource: MatTableDataSource<Gender>

  isMobile: boolean = false
  constructor(
    private genderService: GenderService,
    private commonService: CommonServiceService, private toastService: ToastService
  ) {
    this.dataSource = new MatTableDataSource<Gender>(this.genders)
    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })
    this.genderService.gender$.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getGender()
  }

  getGender() {
    this.genderService.getGender().subscribe({
      next: genders => {
        console.log(genders)
        this.genders = genders
        this.dataSource.data = this.genders
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getRowData(data: Gender) {
    this.genderService._gender = data
    if (this.isMobile) {
      this.commonService.getCurrentObject(true)
    } else {
      this.commonService.getCurrentObject(false)
    }
  }

}
