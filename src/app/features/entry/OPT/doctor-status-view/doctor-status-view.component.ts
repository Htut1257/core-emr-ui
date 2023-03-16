import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
export interface DocStatus {
  regNo: number;
  WL: number;
  CL: number
  Session: string;
  Name: string;

}

const table_data: DocStatus[] = [
  { Session: '20231511', Name: 'Dr. Myo Kyaw Naing', regNo: 5, WL: 3, CL: 8 },
  { Session: '20231512', Name: 'Dr Myat Moe Thu', regNo: 3, WL: 5, CL: 4 },
  { Session: '20231513', Name: 'Dr Soe Moe Kyaw', regNo: 10, WL: 6, CL: 2 },

];

@Component({
  selector: 'app-doctor-status-view',
  templateUrl: './doctor-status-view.component.html',
  styleUrls: ['./doctor-status-view.component.css']
})
export class DoctorStatusViewComponent {
  dataSource: MatTableDataSource<DocStatus>
  displayedColumns: string[] = ["name", "session", "regNo", "wl", "cl"]
  constructor(private route: Router, private docService: DoctorService) {
    this.dataSource = new MatTableDataSource<DocStatus>(table_data)
  }

  getDoctor() {
    // this.docService.getDoctor().subscribe(data => {

    // })
  }

}
