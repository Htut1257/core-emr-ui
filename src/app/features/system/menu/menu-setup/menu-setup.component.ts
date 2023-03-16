import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { RoleMenu } from 'src/app/core/model/role.model';
import { MenuService } from 'src/app/core/services/menu-service/menu.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-menu-setup',
  templateUrl: './menu-setup.component.html',
  styleUrls: ['./menu-setup.component.css']
})
export class MenuSetupComponent implements OnInit {

  menu: RoleMenu

  subscription: Subscription
  constructor(private menuService: MenuService, private commonService: CommonServiceService) {
    this.subscription = this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        if (this.menuService.menu != undefined) {
          this.menu = this.menuService.menu
          this.initializeForm(this.menu);
        }
      }
    })
  }

  menuForm = new FormGroup({
    menuCode: new FormControl(''),
    menuName: new FormControl(''),
    menuMM: new FormControl(''),
    menuUrl: new FormControl(''),
    menuType: new FormControl(''),
    menuClass: new FormControl(''),
    orderBy: new FormControl(''),
    account: new FormControl('')
  })

  ngOnInit(): void {

  }

  //initialize Form and value
  initializeForm(data: any) {
    this.menuForm.setValue({
      menuCode: data.menuCode,
      menuName: data.menuName,
      menuMM: data.menuMM,
      menuUrl: data.menuUrl,
      menuType: data.menuType,
      menuClass: data.menuClass,
      orderBy: data.orderBy,
      account: data.account
    })
  }

  //add or edit menu
  onSaveMenu(data: any) {

  }

  onClear() {

  }

  onBacktoList() {

  }

}
