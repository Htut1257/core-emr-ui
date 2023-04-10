import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs"
import { AbstractService } from '../abstract-service/abstract.service';
import { XRay } from '../../model/x-ray.model';
import { ApiSetting } from 'src/app/api/api-setting';
var uri: any = `${ApiSetting.PayRollApiEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class XRayService extends AbstractService<XRay>{
  xray: any
  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri);
  }

  getXRay(): Observable<XRay[]> {
    this.baseURL = `${uri}/setup/get-Bonus`
    return this.getAll()
  }

  saveXRay(xRay: XRay): Observable<XRay> {
    this.baseURL = `${uri}/setup/save-Bonus`
    return this.save(xRay);
  }

  deleteXRay(id: string) {
    this.baseURL = `${uri}/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
