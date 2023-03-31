import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
var uri: any = `${ApiSetting.PayRollApiEndPoint}`
interface Nurse {

}
@Injectable({
  providedIn: 'root'
})
export class NurseService extends AbstractService<Nurse>{

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getNurse(): Observable<Nurse[]> {
    this.baseURL = `${uri}/setup/get-Bonus`
    return this.getAll()
  }

  saveNurse(nurse: Nurse): Observable<Nurse> {
    this.baseURL = `${uri}/setup/save-Bonus`
    return this.save(nurse);
  }

  deleteNurse(id: string) {
    this.baseURL = `${uri}/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
