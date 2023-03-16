import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { RegistrationService } from 'src/app/core/services/registration-service/registration.service';
@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {

  rowData: any[]
  columnDefs: ColDef[] = []
  api: GridApi
  columnApi: ColumnApi
  defaultColDef: any
  domLayout: string = 'autoHeight'
  constructor(private route:Router,private regisService:RegistrationService) {

  }

  ngOnInit(): void {

  }

  getRegistration(){
    this.regisService.getRegis().subscribe(data=>{
      console.log(data)
    })
  }


}
