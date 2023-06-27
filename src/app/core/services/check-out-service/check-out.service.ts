import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, observable } from "rxjs"

import { Cashier, CashierHis } from '../../model/checkout.model';
import { apiEndPoint } from '../../model/api-endpoint.model';

import { ApiConfigService } from '../api-config-service/api-config.service';

const httpHeader = new HttpHeaders({
  'ContentType': 'applicaton/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
})
@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  _checkOut: Cashier
  _checkOuts: Cashier[] = []
  apiConfig: apiEndPoint
  constructor(private http: HttpClient, private apiService: ApiConfigService) {
    this.apiConfig = this.apiService.getConfig()
  }

  getCheckoutByVisitId(id: string): Observable<Cashier> {
    let uri = `${this.apiConfig.EmrMongoEndPoint}/opdMedical/getOPDMedicalHisCashier`
    let httpParams = new HttpParams()
      .set('visitId', id)
    let httpOption = { headers: httpHeader, params: httpParams }
    return new Observable(observable => {
      this.http.get<Cashier>(uri, httpOption).subscribe(cashier => {
        this._checkOut = cashier
        observable.next(cashier)
        observable.complete()
      })
    })
  }

  saveCheckOut(data: Cashier): Observable<Cashier> {
    let uri = `${this.apiConfig.EmrMongoEndPoint}/opdMedical/save-opdMedicalHisCashier`
    let httpOption = { headers: httpHeader }
    return this.http.post<Cashier>(uri, data, httpOption)
  }

  saveCheckoutHistory(data: CashierHis): Observable<CashierHis> {
    let uri = `${this.apiConfig.EmrEndPoint}/emr-med/saveEMRData`
    let httpOption = { headers: httpHeader }
    return this.http.post<Cashier>(uri, data, httpOption)
  }

}
