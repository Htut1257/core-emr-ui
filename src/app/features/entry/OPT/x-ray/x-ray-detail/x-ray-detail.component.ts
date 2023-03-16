import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { XRayService } from 'src/app/core/services/x-ray-service/x-ray.service';

export interface PeriodicElement {
  xray: string
  name: string
  remark: string
  f1: string
  f2: string
  f3: string
  status: boolean
}

const ELEMENT_DATA: PeriodicElement[] = [
  { xray: 'X-Ray1', name: 'x-ray result1', remark: 'remark 1', f1: '', f2: '', f3: '', status: true },
  { xray: 'X-Ray2', name: 'x-ray result2', remark: 'remark 2', f1: '', f2: '', f3: '', status: true },
  { xray: 'X-Ray3', name: 'x-ray result3', remark: 'remark 3', f1: '', f2: '', f3: '', status: true },
  { xray: 'X-Ray4', name: 'x-ray result4', remark: 'remnark 4', f1: '', f2: '', f3: '', status: false },
];



@Component({
  selector: 'app-x-ray-detail',
  templateUrl: './x-ray-detail.component.html',
  styleUrls: ['./x-ray-detail.component.css']
})
export class XRayDetailComponent implements OnInit {
  xRay: any


  dataSource: MatTableDataSource<PeriodicElement>
  displayedColumns: string[] = ["xray", "name", "remark", "film", "status"]

  constructor(private route: Router, private xrayService: XRayService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA)
  }

  ngOnInit(): void {
    if (this.xrayService.xray != undefined) {
      this.xRay = this.xrayService.xray
    }
  }

  saveXRay(data: any) {
    this.xrayService.saveXRay(data).subscribe(data => {
      console.log(data)
    })
  }

}
