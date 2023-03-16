import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { RoleMenu } from 'src/app/core/model/role.model';
import { MenuService } from 'src/app/core/services/menu-service/menu.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
interface FoodNode {
  name: string;
  count?: number;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  parent: String;
  name: string;
  type: string;
  active: boolean;
  level: number;
}
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  roleMenu: RoleMenu[] = []
  displayedColumns: string[] = ['name', 'type'];
  private transformer = (node: RoleMenu, level: number) => {
    return {
      expandable: !!node.child && node.child.length > 0,
      parent: node.parentMenuCode,
      name: node.menuName,
      type: node.menuType,
      active: node.allow,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level,
    node => node.expandable, node => node.child);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private menuService: MenuService,private commonService:CommonServiceService) {

  }

  ngOnInit(): void {
    this.getMenu();
  }

  //get role menu by specific role code
  getMenu() {
    this.menuService.getMenuTree().subscribe(roleData => {
      console.log(roleData)
      this.dataSource.data = roleData
      this.roleMenu = roleData
    })
  }


  addNewItem(data: any) {
    console.log(data)
    //set mobile object
    this.commonService.getCurrentObject(false)
    this.menuService.menu=data
  }

}
