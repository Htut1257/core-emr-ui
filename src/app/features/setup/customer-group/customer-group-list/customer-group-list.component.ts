import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { CustomerGroup } from 'src/app/core/model/customer-group.model';
import { CustomerGroupService } from 'src/app/core/services/customer-group-service/customer-group.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-customer-group-list',
  templateUrl: './customer-group-list.component.html',
  styleUrls: ['./customer-group-list.component.css']
})
export class CustomerGroupListComponent implements OnInit {

  cusGroup: CustomerGroup
  cusGroups: CustomerGroup[] = []

  displayedColumn: string[] = ["position", "name"]
  dataSource: MatTableDataSource<CustomerGroup>

  isMobile: boolean = false
  constructor(
    private customerService: CustomerGroupService,
    private commonService: CommonServiceService
  ) {
    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })

    this.dataSource = new MatTableDataSource<CustomerGroup>(this.cusGroups)
    this.customerService.cusGroup$.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getAllCustomerGroup()
  }

  getAllCustomerGroup() {
    this.customerService.getAllCustomerGroup().subscribe({
      next: cusGroups => {
        this.cusGroups = cusGroups
        this.dataSource.data = this.cusGroups
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getRoeData(data: CustomerGroup) {
    this.customerService.cusGroup = data
    if (this.isMobile) {
      this.commonService.getCurrentObject(true)
    } else {
      this.commonService.getCurrentObject(false)
    }
  }



}
