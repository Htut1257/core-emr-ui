import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/core/model/doctor.model';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctor: Doctor
  doctors: Doctor[] = []

  displayedColumn: string[] = ["position", "name", "nrc", "gender"]
  dataSource: MatTableDataSource<Doctor>

  isMobile: boolean = false
  constructor(
    private route: Router,
    private doctorService: DoctorService,
    private commonService: CommonServiceService, private toastService: ToastService,
  ) {
    this.dataSource = new MatTableDataSource<Doctor>(this.doctors)
    this.doctorService.doctor$.subscribe(data => {
      this.dataSource.data = data
    })

    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })
  }

  ngOnInit(): void {
    this.getAllDoctor()
  }

  getAllDoctor() {
    this.doctorService.getDoctor().subscribe({
      next: doctors => {
        this.doctors = doctors
        this.dataSource.data = this.doctors
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getRowData(data: Doctor) {
    console.log(data)
  }

}
