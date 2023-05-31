import { Injectable,Inject } from '@angular/core';
import{Observable} from 'rxjs'
import { HttpClient ,HttpHeaders,HttpParams} from '@angular/common/http';
import { ApiSetting } from 'src/app/api/api-setting';
import { DoctorMedicalHistory } from '../../model/doctor-entry.model';
import { AbstractService } from '../abstract-service/abstract.service';
var uri: any = `${ApiSetting.EmrMongoEndPoint}`

@Injectable({
  providedIn: 'root'
})
export class DoctorEntryService extends AbstractService<DoctorMedicalHistory>{

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getDoctorMedical():Observable<DoctorMedicalHistory[]>{
    this.baseURL = `${uri}/opdMedical/get-opdMedicalHis`
    console.log(this.baseURL)
    // return this.http.post<VitalSign>(uri, data)
    return this.getAll()
  }//getOPDMedicalHisCashier

  getDoctorMedicalByVisitId(visitId:string):Observable<DoctorMedicalHistory[]>{
    this.baseURL = `${uri}/opdMedical/find-opdMedicalHis`
    console.log(this.baseURL)
    // return this.http.post<VitalSign>(uri, data)
    let httpParams=new HttpParams()
    .set('visitId',visitId)
    return this.getByParams(httpParams)
  }//

  saveDoctorMedical(data: DoctorMedicalHistory): Observable<DoctorMedicalHistory> {
    this.baseURL = `${uri}/opdMedical/save-opdMedicalHis`
    console.log(this.baseURL)
    // return this.http.post<VitalSign>(uri, data)
    return this.save(data)
  }

}
