import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { LabService } from 'src/app/core/services/lab-service/lab.service';

export interface Lab {
  code:string
  test:string
  remark:string
  status:boolean

}

const ELEMENT_DATA: Lab[] = [
 {code:'20231510001',test:'lab test 1',remark:'remark 1',status:false},
 {code:'20231510002',test:'lab test 2',remark:'remark 2',status:false},
 {code:'20231510003',test:'lab test 3',remark:'remark 3',status:false},
];

@Component({
  selector: 'app-lab-detail',
  templateUrl: './lab-detail.component.html',
  styleUrls: ['./lab-detail.component.css']
})
export class LabDetailComponent implements OnInit {
  
  lab:any
  
  dataSource: MatTableDataSource<Lab>
  displayedColumns: string[] = ["code", "test", "remark","status"]

  constructor(private route:Router,private labService:LabService) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA)
  }

  ngOnInit(): void {
      if(this.labService.lab!=undefined){
        this.lab=this.labService.lab
      }
  }

  //save lab
  saveLab(lab:Lab){
    this.labService.saveLab(lab).subscribe(data=>{

    })
  }


}
