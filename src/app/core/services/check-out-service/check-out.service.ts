import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs"
import { AbstractService } from '../abstract-service/abstract.service';

import { ApiSetting } from 'src/app/api/api-setting';
var uri: any = `${ApiSetting.PayRollApiEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class CheckOutService extends AbstractService<any>{
  checkOut: any
  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getCheckup(): Observable<any[]> {
    this.baseURL =`${uri}/setup/get-Bonus`
    return this.getAll()
  }

  saveCheckup(checkOut: any) {
    this.baseURL =`${uri}/setup/save-Bonus`
    this.save(checkOut);
  }

  deleteCheckOut(id: string) {
    this.baseURL =`${uri}/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }


}
