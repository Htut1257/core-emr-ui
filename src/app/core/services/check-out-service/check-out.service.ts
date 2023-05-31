import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, observable } from "rxjs"
import { ApiSetting } from 'src/app/api/api-setting';
import { Cashier, CashierHis } from '../../model/checkout.model';

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
  constructor(private http: HttpClient) {

  }

  getCheckoutByVisitId(id: string): Observable<Cashier> {
    let uri = `${ApiSetting.EmrMongoEndPoint}/opdMedical/getOPDMedicalHisCashier`
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
    let uri = `${ApiSetting.EmrMongoEndPoint}/opdMedical/save-opdMedicalHisCashier`
    let httpOption = { headers: httpHeader }
    return this.http.post<Cashier>(uri, data, httpOption)
  }

  saveCheckoutHistory(data:CashierHis):Observable<CashierHis>{
    let uri = `${ApiSetting.EmrMongoEndPoint}/opdMedical/save-opdMedicalHisCashier`
    let httpOption = { headers: httpHeader }
    return this.http.post<Cashier>(uri, data, httpOption)
  }

}
