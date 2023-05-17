import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { OpdVisitDate } from '../../model/opd-visit-day.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
var uri = `${ApiSetting.EmrMongoEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class OpdVisitDateService extends AbstractService<OpdVisitDate>{

  _opdVisitDate: OpdVisitDate
  _opdVisits: OpdVisitDate[] = []
  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getReVisitDate(): Observable<OpdVisitDate[]> {
    this.baseURL=`${uri}/opdMedical/get-opdReVisitDate`
    return new Observable(observable => {
      return this.getAll().subscribe(visitDate => {
        this._opdVisits = visitDate
        observable.next(visitDate)
        observable.complete()
      })
    })
  }

  getReVisitDateByParams(id: string) {
    this.baseURL=`${uri}/opdMedical/get-opdReVisitDate`
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
    this.baseURL=`${uri}/opdMedical/get-opdReVisitDate`
    return this.save(data)
  }

  deleteReVisitDate(id: string): Observable<OpdVisitDate> {
    this.baseURL=`${uri}/opdMedical/get-opdReVisitDate`
    let httpParamms = new HttpParams()
      .set('id', id)
    return this.delete(httpParamms)
  }


}
