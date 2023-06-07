import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'
import { Initial } from '../../model/doctor.model';
import { ApiSetting } from 'src/app/api/api-setting';
import { AbstractService } from '../abstract-service/abstract.service';
const uri = `${ApiSetting.EmrEndPoint}/opdsetup`
@Injectable({
  providedIn: 'root'
})
export class InitialService extends AbstractService<Initial>{

  _initial: Initial
  _initials: Initial[] = []

  initialSubject: BehaviorSubject<Initial[]> = new BehaviorSubject<Initial[]>([])
  initial$: Observable<Initial[]> = this.initialSubject.asObservable()

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getInitial(): Observable<Initial[]> {
    this.baseURL = `${uri}/getAllInitial`
    return new Observable(observable => {
      return this.getAll().subscribe(data => {
        this._initials = data
        this.initialSubject.next(data)
        observable.next(data)
        observable.complete()
      })
    })
  }

  saveInitial(model: Initial): Observable<Initial> {
    this.baseURL = `${uri}/saveInitial`
    return this.save(model)
  }

  deleteInitial(id: string) {
    this.baseURL = `${uri}/deleteInitial`
    let httpParams = new HttpParams()
      .set('id', id)
    return this.delete(httpParams)
  }

}
