import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
var uri: any = `${ApiSetting.PayRollApiEndPoint}`
interface Regis {

}
@Injectable({
  providedIn: 'root'
})
export class RegistrationService extends AbstractService<Regis>{

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getRegis(): Observable<Regis[]> {
    this.baseURL = this.baseURL + `/setup/get-Bonus`
    return this.getAll()
  }

  saveRegis(regis: Regis): Observable<Regis> {
    this.baseURL = this.baseURL + `/setup/save-Bonus`
    return this.save(regis);
  }

  deleteRegis(id: string) {
    this.baseURL = this.baseURL + `/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
