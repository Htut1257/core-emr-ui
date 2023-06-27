import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';

const httpHeader = new HttpHeaders({
  'Content-Type': 'text/event-stream',// text/event-stream application/stream+json application/json
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

  apiConfig: apiEndPoint

  constructor(private http: HttpClient, private apiService: ApiConfigService) {
    this.apiConfig = this.apiService.getConfig()
  }

  getAutoTableSize(width) {
    this.tableSizeSubject$.next(width);
  }

  //get med term for examination :database mongo
  getExaminationData(params: string): Observable<any> {
    return new Observable(observable => {
      let uri = `${this.apiConfig.EmrMongoEndPoint}/autoComplete/medTermsAutoComplete`
      let httpParams = new HttpParams()
        .set("medDesc", params)
      let httpOption = { headers: httpHeader, params: httpParams }
      this.http.get<any>(uri, httpOption).subscribe(data => {
        observable.next(data)
        observable.complete()
      })
    })
  }

  //get med item for pharmacy and OPD :database maria
  getTreatmentData(params: string): Observable<any> {
    return new Observable(observable => {
      let uri = `${this.apiConfig.EmrEndPoint}/common/getDrAutoCompleteItem`
      let httpParams = new HttpParams()
        .set("desp", params)
      let httpOption = { headers: httpHeader, params: httpParams }
      this.http.get<any>(uri, httpOption).subscribe(data => {
        console.log(data)
        observable.next(data)
        observable.complete()
      })
    })
  }

}
