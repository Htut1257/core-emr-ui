import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Speciality } from 'src/app/core/model/doctor.model';
import { SpecialityService } from 'src/app/core/services/speciality-service/speciality.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.css']
})
export class SpecialityListComponent implements OnInit {

  special: Speciality
  specials: Speciality[] = []

  dataSource: MatTableDataSource<Speciality>
  displayedColumn: string[] = ["position", "desc"]

  isMobile: boolean = false

  constructor(
    private specialService: SpecialityService,
    private commonService: CommonServiceService,
  ) {
    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })
    this.dataSource = new MatTableDataSource<Speciality>
    this.specialService.special$.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getSpeciality()
  }

  getSpeciality() {
    this.specialService.getAllSpeciality().subscribe({
      next: specials => {
        this.specials = specials
        this.dataSource=new MatTableDataSource<Speciality>(this.specials)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getRowData(data: Speciality) {
    this.specialService._special = data
    if (this.isMobile) {
      this.commonService.getCurrentObject(true)
    } else {
      this.commonService.getCurrentObject(false)
    }
  }

}
