import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Grid, ColDef, GridOptions, GridApi, ColumnApi } from "ag-grid-community";
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/services/user-service/user-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  user: User
  userList: User[]

  displayedColumn: string[] = ["position", "name", "short"]
  dataSource: MatTableDataSource<User>

  rowData: any[]
  columnDefs: ColDef[] = []
  api: GridApi
  columnApi: ColumnApi
  defaultColDef: any
  domLayout: string = 'autoHeight'


  isMobile = false
  scrHeight: any;
  scrWidth: any;

  // @HostListener('window:resize', ['$event'])
  // getScreenSize() {
  //   this.scrHeight = window.innerHeight;
  //   this.scrWidth = window.innerWidth;
  //   console.log(this.scrWidth)
  //   if (parseInt(window.innerWidth.toString()) <= 400) {
  //     this.isMobile = true
  //   } else {
  //     this.isMobile = false
  //   }
  // }
  //@ViewChild(UserSetupComponent) userSetupComponent;
  constructor(
    private route: Router, public dialog: MatDialog,
    private userService: UserService,
    private toastService: ToastService, private commonService: CommonServiceService,
  ) {
    this.user = {} as User
    // this.getScreenSize();
    this.dataSource = new MatTableDataSource<User>(this.userList)
    this.userService.users.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getUser();
  }

  //get data ready for grid data
  onGridReady(params): void {
    this.api = params.api
    this.columnApi = params.columnApi
    this.api.sizeColumnsToFit()
    params.api.resetRowHeights();
  }

  onRowClicked(params) {
    console.log('click')
    this.userService.user = params.data
    if (this.isMobile) {
      this.route.navigate(['/main/user/user-setup'])
    }
  }

  onRowdblClicked(params) {
    this.userService.user = params.data
    if (this.isMobile) {
      this.route.navigate(['/main/user/user-setup'])
      return
    }
    // this.userSetupComponent.InitialObject();
  }

  //get userList
  getUser() {
    this.userService.getUser().subscribe(userData => {
      {
        this.userList = userData
        this.dataSource = new MatTableDataSource<User>(this.userList)
        // let colData = []
        // let objKey = Object.keys(this.userList[0])
        // objKey.forEach(key => colData.push({ field: key }))
        // //this.columnDefs = colData
        // this.rowData = this.userList
        // this.defaultColDef = {
        //   enableValue: true,
        //   sortable: true,
        //   enableRowGroup: true,
        //   enablePivot: true,
        //   rowSelection: 'multiple',
        //   groupSelectsChildren: true,
        //}
      }
    })
  }


}
