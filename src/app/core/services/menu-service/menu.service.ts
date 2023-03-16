import { Injectable } from '@angular/core';
import { Observable, of,BehaviorSubject } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RoleMenu } from '../../model/role.model';
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
export class MenuService {

  menu:RoleMenu
  

  constructor(private http: HttpClient) { }

  //get role menu setting for specific role
  getMenuTree(): Observable<RoleMenu[]> {
    let uri = `${userApi}/user/get-menu-tree`
    let httpOption = { headers: httpHeaders }
    return this.http.get<RoleMenu[]>(uri, httpOption)
  }

}
