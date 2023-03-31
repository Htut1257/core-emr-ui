import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs"
import { AbstractService } from '../abstract-service/abstract.service';
import { Lab } from '../../model/lab.model';
import { ApiSetting } from 'src/app/api/api-setting';
var uri: any = `${ApiSetting.PayRollApiEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class LabService extends AbstractService<Lab> {

  lab: any

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri);
  }

  getLab():Observable<Lab[]> {
    this.baseURL = `${uri}/setup/get-Bonus`
    return this.getAll()
  }

  saveLab(lab: Lab) :Observable<Lab>{
    this.baseURL =  `${uri}/setup/save-Bonus`
    return this.save(lab);
  }

  deleteLab(id: string) {
    this.baseURL = `${uri}/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
