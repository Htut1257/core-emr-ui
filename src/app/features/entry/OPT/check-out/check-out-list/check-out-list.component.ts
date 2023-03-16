import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CheckOutService } from 'src/app/core/services/check-out-service/check-out.service';

export interface CheckOut {
  regNo: string;
  admNo: string;
  Name: string;

}

const table_data: CheckOut[] = [
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
  selector: 'app-check-out-list',
  templateUrl: './check-out-list.component.html',
  styleUrls: ['./check-out-list.component.css']
})
export class CheckOutListComponent {
  dataSource: MatTableDataSource<CheckOut>
  displayedColumns: string[] = ["reg", "adm", "name"]
  constructor(private route: Router, private checkService: CheckOutService) {
    this.dataSource = new MatTableDataSource<CheckOut>(table_data)
  }

  //get all checkout
  getCheckOut() {
    this.checkService.getCheckup().subscribe(data => {
      console.log(data)
    })
  }

  getRowData(data: any) {
    this.checkService.checkOut = data
    this.route.navigate(['/main/opd/check-out/voucher'])
  }

}
