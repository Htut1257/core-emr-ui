import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VitalSign } from '../../model/vital-sign.model';
import { ApiSetting } from 'src/app/api/api-setting';
import { AbstractService } from '../abstract-service/abstract.service';
import { Observable } from 'rxjs';
var uri:any = ApiSetting.EmrMongoEndPoint
@Injectable({
  providedIn: 'root'
})
export class VitalSignService extends AbstractService<VitalSign>{
  _vitalSign: VitalSign

  

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  saveVitalSign(data: VitalSign): Observable<VitalSign> {
    this.baseURL=`${uri}/patient/saveVitalSign`
    return this.http.post<VitalSign>(uri, data)
  }


}
