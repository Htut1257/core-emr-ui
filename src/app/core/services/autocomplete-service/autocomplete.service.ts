import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { ApiSetting } from 'src/app/api/api-setting';
import { relativeTimeThreshold } from 'moment';
const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});
@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  $tableSizeObserver!: Observable<any>
  tableSizeSubject$!: BehaviorSubject<any>

  constructor(private http: HttpClient) {
  }

  getAutoTableSize(width){
    this.tableSizeSubject$.next(width);
  }

  getExaminationData(params: string): Observable<any> {
    return new Observable(observable => {
      let uri = `${ApiSetting.EmrMongoEndPoint}/autoComplete/medTermsAutoComplete`
      let httpParams = new HttpParams()
        .set("medDesc", params)
      let httpOption = { headers: httpHeader, params: httpParams }
      this.http.get<any>(uri, httpOption).subscribe(data => {
        observable.next(data)
        observable.complete()
      })
    })
  }

  getTreatmentData(params: string): Observable<any> {
    return new Observable(observable => {
      let uri = `${ApiSetting.EmrEndPoint}/common/getDrAutoCompleteItem`
      let httpParams = new HttpParams()
        .set("desp", params)
      let httpOption = { headers: httpHeader,params:httpParams }
      this.http.get<any>(uri, httpOption).subscribe(data => {
        observable.next(data)
        observable.complete()
      })
    })
  }

}
