import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { XRayService } from 'src/app/core/services/x-ray-service/x-ray.service';


export interface XRay {
  regNo: string;
  admNo: string;
  Name: string;

}

const table_data: XRay[] = [
  { regNo: '20231511', admNo: '20231511', Name: 'Nay Myo Htut', },
  { regNo: '20231512', admNo: '20231512', Name: 'Aung Bone Khant', },
  { regNo: '20231513', admNo: '20231513', Name: 'Wai Yan Hein', },
  { regNo: '20231514', admNo: '20231514', Name: 'Myo Thi Ha Zaw', },
  { regNo: '20231515', admNo: '20231515', Name: 'U Win Swe', },
  { regNo: '20231516', admNo: '20231516', Name: 'U Min Zaw', },
  { regNo: '20231517', admNo: '20231517', Name: 'Kyaw Thu Ya ung', },
  { regNo: '20231518', admNo: '20231518', Name: 'Myo Thu Win', },
  { regNo: '20231519', admNo: '20231519', Name: 'Aung Naing Oo', },
  { regNo: '202315110', admNo: '202315110', Name: 'Thet Win Naung' },
];


@Component({
  selector: 'app-x-ray-list',
  templateUrl: './x-ray-list.component.html',
  styleUrls: ['./x-ray-list.component.css']
})
export class XRayListComponent {
  dataSource: MatTableDataSource<XRay>
  displayedColumns: string[] = ["reg", "adm", "name"]
  constructor(private route: Router,private xrayService:XRayService) {
    this.dataSource = new MatTableDataSource(table_data)
  }


   getXRay(){
    this.xrayService.getXRay().subscribe(data=>{
      console.log(data)
    })
   }

  getRowData(data: any) {
    this.xrayService.xray=data
    this.route.navigate(['/main/opd/x-ray/x-ray-detail'])
  }

}
