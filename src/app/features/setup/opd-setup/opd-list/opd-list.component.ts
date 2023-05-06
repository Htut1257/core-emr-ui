import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OpdGroup } from 'src/app/core/model/opd.model';
import { OpdService } from 'src/app/core/services/opd-service/opd.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-opd-list',
  templateUrl: './opd-list.component.html',
  styleUrls: ['./opd-list.component.css']
})
export class OpdListComponent implements OnInit {

  opdGroups: OpdGroup[] = []
  displayedColumn: string[] = ["group"]
  dataSource: MatTableDataSource<OpdGroup>
  constructor(
    private opdService: OpdService,private commonServie: CommonServiceService,
    public dialog: MatDialog,
  ) { 
    this.dataSource=new MatTableDataSource<OpdGroup>(this.opdGroups)
    this.opdService.opdGroups.subscribe(data=>{
      this.dataSource.data=data
    })
  }


  ngOnInit(): void {
    this.getOpdGroup();
  }

  getOpdGroup() {
    console.log("called")
    this.opdService.getOpdGroup().subscribe({
      next:opdGroup=>{
        this.opdGroups
        this.dataSource=new MatTableDataSource(this.opdGroups)
        console.log(opdGroup)
      },
      error:err=>{

      }
    })
  }


  getGroupRow(group:OpdGroup){
    this.opdService._opdGroup=group
    this.commonServie.getCurrentObject(false)
  }

}
