import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/core/model/role.model';
import { RoleService } from 'src/app/core/services/role-service/role-service.service';
import { RoleMenuTreeComponent } from '../role-menu-tree/role-menu-tree.component';
@Component({
  selector: 'app-role-setting',
  templateUrl: './role-setting.component.html',
  styleUrls: ['./role-setting.component.css']
})
export class RoleSettingComponent implements OnInit {

  roleList: Role[] = []
  displayedColumn: string[] = ['name']
  dataSource: MatTableDataSource<Role>
  @ViewChild(RoleMenuTreeComponent) roleMenuComponent
  constructor(private route: Router, private roleService: RoleService) {

  }

  ngOnInit(): void {
    this.getAllRole();
  }

  //get all role list
  getAllRole() {
    this.roleService.getRole().subscribe({
      next: roleData => {
        this.roleList = roleData
        this.dataSource = new MatTableDataSource(this.roleList)
      },
      error: err => {

      }
    })
  }

  //get data for specific tab
  getPropertyData() {
    this.roleMenuComponent.initialLoad()
  }

  //table row clicked
  onRowClicked(role: Role) {
    this.roleService.role = role
    this.getPropertyData();
  }
}
