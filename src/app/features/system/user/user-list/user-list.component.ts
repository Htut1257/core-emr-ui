import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
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

  isMobile = false


  constructor(
    private route: Router, public dialog: MatDialog,
    private userService: UserService,
    private toastService: ToastService, private commonService: CommonServiceService,
  ) {
    this.user = {} as User
    this.dataSource = new MatTableDataSource<User>(this.userList)
    this.userService.users.subscribe(data => {
      this.dataSource.data = data
    })

    this.commonService.isMobile$.subscribe(data=>{
      this.isMobile=data
    })
  }

  ngOnInit(): void {
    this.getUser();
  }

  onRowdblClicked(params) {
    this.userService.user = params
    if (this.isMobile) {
     // this.route.navigate(['/main/user/user-setup'])
      this.commonService.getCurrentObject(true)
    }else{
      this.commonService.getCurrentObject(false)
    }
  }

  //get userList
  getUser() {
    this.userService.getUser().subscribe(userData => {
      {
        this.userList = userData
        this.dataSource = new MatTableDataSource<User>(this.userList)

      }
    })
  }


}
