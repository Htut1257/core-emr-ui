import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { DoctorMedicalHistory } from '../../model/doctor-entry.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { AbstractService } from '../abstract-service/abstract.service';
var uri: any = ``
@Injectable({
  providedIn: 'root'
})
export class DoctorEntryService extends AbstractService<DoctorMedicalHistory>{

  apiConfig: apiEndPoint

  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrMongoEndPoint}`
  }

  getDoctorMedical(): Observable<DoctorMedicalHistory[]> {
    this.baseURL = `${uri}/opdMedical/get-opdMedicalHis`
    console.log(this.baseURL)
    // return this.http.post<VitalSign>(uri, data)
    return this.getAll()
  }//getOPDMedicalHisCashier

  getDoctorMedicalByVisitId(visitId: string): Observable<DoctorMedicalHistory[]> {
    this.baseURL = `${uri}/opdMedical/find-opdMedicalHis`

    // return this.http.post<VitalSign>(uri, data)
    let httpParams = new HttpParams()
      .set('visitId', visitId)
    return this.getByParams(httpParams)
  }//

  saveDoctorMedical(data: DoctorMedicalHistory): Observable<DoctorMedicalHistory> {
    this.baseURL = `${uri}/opdMedical/save-opdMedicalHis`

    // return this.http.post<VitalSign>(uri, data)
    return this.save(data)
  }

}
