import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VitalSign } from '../../model/vital-sign.model';
import { ApiSetting } from 'src/app/api/api-setting';
import { AbstractService } from '../abstract-service/abstract.service';
import { Observable } from 'rxjs';
var uri: any = ApiSetting.EmrMongoEndPoint
@Injectable({
  providedIn: 'root'
})
export class VitalSignService extends AbstractService<VitalSign>{
  _vitalSign: VitalSign
  _vitalSigns: VitalSign[]


  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
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
    console.log(this.baseURL)
    // return this.http.post<VitalSign>(uri, data)
    return this.save(data)
  }


}
