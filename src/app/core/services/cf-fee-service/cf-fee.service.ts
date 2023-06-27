import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { OpdCfFee } from '../../model/cf-fee.model';

import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
})

@Injectable({
  providedIn: 'root'
})
export class CfFeeService {

  _opdFee: OpdCfFee
  _opdFees: OpdCfFee[] = []

  apiConfig: apiEndPoint

  constructor(private http: HttpClient, private apiService: ApiConfigService) {
    this.apiConfig = this.apiService.getConfig()

  }

  getOpdCfFee(): Observable<OpdCfFee[]> {
    let uri = `${this.apiConfig.EmrEndPoint}/opdSetup/getOPDDoctorCFFees`
    let httpOption = { headers: httpHeader }
    return new Observable(obervable => {
      return this.http.get<OpdCfFee[]>(uri, httpOption).subscribe(cfFee => {
        this._opdFees = cfFee
        obervable.next(cfFee)
        obervable.complete()
      })
    })
  }

  getOpdCfFeeByDoctor(id: string): Observable<OpdCfFee[]> {
    let uri = `${this.apiConfig.EmrEndPoint}/opdSetup/getOPDDoctorCFFees`
    let httpParams = new HttpParams()
      .set('drId', id)
    let httpOption = { headers: httpHeader, params: httpParams }
    return new Observable(obervable => {
      return this.http.get<OpdCfFee[]>(uri, httpOption).subscribe(cfFee => {
        this._opdFees = cfFee
        obervable.next(cfFee)
        obervable.complete()
      })
    })
  }

  saveOpdCfFee(data: OpdCfFee): Observable<OpdCfFee> {
    let uri = `${this.apiConfig.EmrEndPoint}/opdSetup/getOPDDoctorCFFees`
    let httpOption = { headers: httpHeader }
    return this.http.post<OpdCfFee>(uri, data, httpOption)
  }

  deleteOpdCfFee(): Observable<OpdCfFee> {
    let uri = `${this.apiConfig.EmrEndPoint}/opdSetup/getOPDDoctorCFFees`
    let httpOption = { headers: httpHeader }
    return this.http.delete<OpdCfFee>(uri, httpOption)
  }

}
