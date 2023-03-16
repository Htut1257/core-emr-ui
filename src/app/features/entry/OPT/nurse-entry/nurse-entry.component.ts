import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { NurseService } from 'src/app/core/services/nurse-service/nurse.service';
export interface PeriodicElement {
  no: number;
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { no: 1, name: 'Mg Aung Khant' },
  { no: 2, name: 'Mg Aung Myo Min' },
  { no: 3, name: 'Mg Kang Naing' },
];


@Component({
  selector: 'app-nurse-entry',
  templateUrl: './nurse-entry.component.html',
  styleUrls: ['./nurse-entry.component.css']
})
export class NurseEntryComponent {

  dataSource: MatTableDataSource<PeriodicElement>
  displayedColumns: string[] = ["position", "name", "status"]
  constructor(private route:Router,private nurseService:NurseService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA)
  }

  getNurse(){
    this.nurseService.getNurse().subscribe(data=>{
      console.log(data)
    })
  }

}
