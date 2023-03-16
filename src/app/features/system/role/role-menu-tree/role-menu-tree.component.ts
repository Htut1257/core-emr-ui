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

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple', count: 10 },
      { name: 'Banana', count: 20 },
      { name: 'Fruit loops', count: 30 },
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli', count: 10 },
          { name: 'Brussel sprouts', count: 20 },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins', count: 30 },
          { name: 'Carrots', count: 40 },
        ]
      },
    ]
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  type: string;
  active: boolean;
  level: number;
}

@Component({
  selector: 'app-role-menu-tree',
  templateUrl: './role-menu-tree.component.html',
  styleUrls: ['./role-menu-tree.component.css']
})

export class RoleMenuTreeComponent implements OnInit {
  role: Role
  roleCode: string
  roleMenu: RoleMenu[] = []
  displayedColumns: string[] = ['name', 'type', 'count'];

  private transformer = (node: RoleMenu, level: number) => {
    return {
      expandable: !!node.child && node.child.length > 0,
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
  constructor(private roleService: RoleService) {
    //this.dataSource.data =TREE_DATA
  }

  ngOnInit(): void {
    this.initialLoad();
  }

  //initialize Data 
  initialLoad() {
    if (this.roleService.role != undefined) {
      this.role = this.roleService.role
      this.roleCode = this.role.roleCode
      this.getRoleMenu(this.roleCode);
    }
  }

  //get role menu by specific role code
  getRoleMenu(code: string) {
    console.log(code)
    this.roleService.getRoleMenu(code).subscribe(roleData => {
      console.log(roleData)
      this.dataSource.data = roleData
      this.roleMenu = roleData
    })
  }

 

  //add or edit role menu
  saveRoleMenu(data: any) {
    data.active=!data.active
    var employeeRosterData = this.roleMenu.reduce(function (filtered: any, option: any) {
      if (option.menuName == data.name) {
        filtered.push(option);
      }
      else {
        for (let item of option.child) {
          if (item.menuName == data.name) {
            item.allow=data.active
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
