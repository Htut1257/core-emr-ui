import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Role,RoleMenu } from '../../model/role.model';
import { ApiSetting } from 'src/app/api/api-setting';
const userApi = ApiSetting.UserApiEndPoint
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
})
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role: Role
  roleList: Role[]
  constructor(private http: HttpClient) {
    this.roleList = []
  }

  //get all role
  getRole(): Observable<Role[]> {
    return new Observable(observable => {
      if (this.roleList.length > 1) {
        observable.next(this.roleList)
        return observable.complete()
      }
      let uri = `${userApi}/user/get-role`
      let httpOption = { headers: httpHeaders }
      this.http.get<Role[]>(uri, httpOption).subscribe(roleData => {
        this.roleList = roleData
        observable.next(this.roleList)
        observable.complete()
      })
    })
  }

  //add or edit role
  saveRole(data: Role): Observable<Role> {
    let uri = `${userApi}/user/save-role`
    let httpOption = { headers: httpHeaders }
    return this.http.post<Role>(uri, data, httpOption)
  }

    //get role menu setting for specific role
    getMenuTree():Observable<RoleMenu[]>{
      let uri=`${userApi}/user/get-menu-tree`
      let httpOption={headers:httpHeaders}
      return this.http.get<RoleMenu[]>(uri,httpOption)
    }

  //get role menu setting for specific role
  getRoleMenu(roleCode:string):Observable<RoleMenu[]>{
    let uri=`${userApi}/user/get-role-menu-tree`
    let httpParams=new HttpParams().set('roleCode',roleCode)
    let httpOption={headers:httpHeaders,params:httpParams}
    return this.http.get<RoleMenu[]>(uri,httpOption)
  }

  //add or edit menu data with role 
  saveRoleMenu(data:any):Observable<RoleMenu>{
    let uri = `${userApi}/user/save-role-menu`
    let httpOption = { headers: httpHeaders }
    return this.http.post<RoleMenu>(uri, data, httpOption)
  }

}
