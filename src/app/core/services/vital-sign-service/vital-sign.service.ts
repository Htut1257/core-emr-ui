import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VitalSign } from '../../model/vital-sign.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { AbstractService } from '../abstract-service/abstract.service';
import { Observable } from 'rxjs';
var uri: any = ``
@Injectable({
  providedIn: 'root'
})
export class VitalSignService extends AbstractService<VitalSign>{
  _vitalSign: VitalSign
  _vitalSigns: VitalSign[]

  apiConfig: apiEndPoint
  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrMongoEndPoint}`
  }

  getVitalSignByPatient(Id: string): Observable<VitalSign[]> {
    this.baseURL = `${uri}/patient/findByBookingId`
    let httpparams = new HttpParams()
      .set("bid", Id)
    return new Observable(observable => {
      this.getByParams(httpparams).subscribe(vitalSigns => {
        this._vitalSigns = vitalSigns
        observable.next(vitalSigns)
        observable.complete()
      })
    })
    // return this.getByParams(httpparams)
  }

  saveVitalSign(data: VitalSign): Observable<VitalSign> {
    this.baseURL = `${uri}/patient/saveVitalSign`
    return this.save(data)
  }


}
