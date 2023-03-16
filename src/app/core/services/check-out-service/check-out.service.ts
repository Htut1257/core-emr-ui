import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs"
import { AbstractService } from '../abstract-service/abstract.service';
import { CheckOut } from 'src/app/features/entry/OPT/check-out/check-out-list/check-out-list.component';
import { ApiSetting } from 'src/app/api/api-setting';
var uri: any = `${ApiSetting.PayRollApiEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class CheckOutService extends AbstractService<CheckOut>{
  checkOut: any
  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getCheckup(): Observable<CheckOut[]> {
    this.baseURL = this.baseURL + `/setup/get-Bonus`
    return this.getAll()
  }

  saveCheckup(checkOut: CheckOut) {
    this.baseURL = this.baseURL + `/setup/save-Bonus`
    this.save(checkOut);
  }

  deleteCheckOut(id: string) {
    this.baseURL = this.baseURL + `/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }


}
