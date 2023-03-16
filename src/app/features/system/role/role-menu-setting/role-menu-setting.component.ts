import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Role, RoleMenu } from 'src/app/core/model/role.model';
import { RoleService } from 'src/app/core/services/role-service/role-service.service';

interface FoodNode {
  name: string;
  count?: number;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  parent:String;
  name: string;
  type: string;
  active: boolean;
  level: number;
}


@Component({
  selector: 'app-role-menu-setting',
  templateUrl: './role-menu-setting.component.html',
  styleUrls: ['./role-menu-setting.component.css']
})
export class RoleMenuSettingComponent implements OnInit {
  roleMenu: RoleMenu[] = []
  displayedColumns: string[] = ['name', 'type'];
  private transformer = (node: RoleMenu, level: number) => {
    return {
      expandable: !!node.child && node.child.length > 0,
      parent:node.parentMenuCode,
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

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private roleService:RoleService) {

  }

  ngOnInit(): void {
    this.initialLoad();
  }
  //initialize Data 
  initialLoad() {
    this.getRoleMenu();
  }

  //get role menu by specific role code
  getRoleMenu() {
    this.roleService.getMenuTree().subscribe(roleData => {
      console.log(roleData)
      this.dataSource.data = roleData
      this.roleMenu = roleData
    })
  }

  addNewItem(data:any){
    console.log(data)
  }

  //add or edit role menu
  saveRoleMenu(data: any) {
    data.active = !data.active
    var employeeRosterData = this.roleMenu.reduce(function (filtered: any, option: any) {
      if (option.menuName == data.name) {
        filtered.push(option);
      }
      else {
        for (let item of option.child) {
          if (item.menuName == data.name) {
            item.allow = data.active
            filtered.push(item);
          }
        }
      }

      return filtered;
    }, []);
    console.log(employeeRosterData)
    //this.roleService.saveRoleMenu(data).subscribe();
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
