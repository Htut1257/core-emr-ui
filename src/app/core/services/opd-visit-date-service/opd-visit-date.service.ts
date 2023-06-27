import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { OpdVisitDate } from '../../model/opd-visit-day.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { AbstractService } from '../abstract-service/abstract.service';
var uri = ``
@Injectable({
  providedIn: 'root'
})
export class OpdVisitDateService extends AbstractService<OpdVisitDate>{

  _opdVisitDate: OpdVisitDate
  _opdVisits: OpdVisitDate[] = []
  apiConfig: apiEndPoint
  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrMongoEndPoint}`
  }

  getReVisitDate(): Observable<OpdVisitDate[]> {
    this.baseURL = `${uri}/opdMedical/get-opdReVisitDate`
    return new Observable(observable => {
      return this.getAll().subscribe(visitDate => {
        this._opdVisits = visitDate
        observable.next(visitDate)
        observable.complete()
      })
    })
  }

  getReVisitDateByParams(id: string) {
    this.baseURL = `${uri}/opdMedical/get-opdReVisitDate`
    let httpParamms = new HttpParams()
      .set('id', id)
    return new Observable(observable => {
      return this.getByParams(httpParamms).subscribe(visitDate => {
        this._opdVisits = visitDate
        observable.next(visitDate)
        observable.complete()
      })
    })
  }

  saveReVisitDate(data: OpdVisitDate): Observable<OpdVisitDate> {
    this.baseURL = `${uri}/opdMedical/get-opdReVisitDate`
    return this.save(data)
  }

  deleteReVisitDate(id: string): Observable<OpdVisitDate> {
    this.baseURL = `${uri}/opdMedical/get-opdReVisitDate`
    let httpParamms = new HttpParams()
      .set('id', id)
    return this.delete(httpParamms)
  }


}
