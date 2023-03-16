import { AbstractControl, FormGroup } from "@angular/forms";

export interface Role {
    roleCode: string,
    roleName: string,
}

export interface RoleMenu {
    menuCode: string,
    menuName: string,
    menuUrl: string,
    menuType: string,
    menuClass: string,
    parentMenuCode: string,
    orderBy?:number,
    roleCode: string,
    account:string,
    allow: boolean,
    child?: RoleMenu[]

}

export interface IMenuFormGroup extends FormGroup{
    value:RoleMenu;
    controls:{
        menuCode:AbstractControl
        menuName: AbstractControl
        menuUrl:AbstractControl
        menuType: AbstractControl
        menuClass:AbstractControl
        parentMenuCode:AbstractControl
        orderBy?:AbstractControl
        roleCode: AbstractControl
        account:AbstractControl
    }
}