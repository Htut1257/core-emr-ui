import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
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
  @ViewChild(MatSort,{static:true})sort:MatSort


  isMobile: boolean = false
  isSelected: boolean = false
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
        this.filterDctor()
        this.sortDctor()
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  filterDctor() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return   data.doctorName.toLowerCase().includes(filter) 
      //data.bookingId.toString().toLowerCase().includes(filter) ||
        // data.regNo.toLowerCase().includes(filter) ||
      
        //data.patientName.toLowerCase().includes(filter);
    }
  }

  sortDctor() {
    this.dataSource.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'name': return item.doctorName
      }
    }
    this.dataSource.sort = this.sort
  }

  applyFilter(event: any) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getselectedRowData(data: any) {
    this.dataSource.data = this.dataSource.data.map((item: any) => {
      item.isSelected = false
      return item;
    })
    this.doctorService._doctor = data
    data.isSelected = !data.isSelected
    if (this.isMobile) {
      this.commonService.getCurrentObject(true)
    } else {
      this.commonService.getCurrentObject(false)
    }
  }

  getRowData(data: Doctor) {
    this.doctorService._doctor = data
    if (this.isMobile) {
      this.commonService.getCurrentObject(true)
    } else {
      this.commonService.getCurrentObject(false)
    }
  }

}
