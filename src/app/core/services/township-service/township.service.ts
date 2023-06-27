import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Township } from '../../model/township.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';

var uri = ``
const httpHeader = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,ORIGINS',
});

@Injectable({
  providedIn: 'root'
})
export class TownshipService extends AbstractService<Township>{

  _town: Township
  _towns: Township[] = []

  townSubject: BehaviorSubject<Township[]> = new BehaviorSubject<Township[]>([])
  town$: Observable<Township[]> = this.townSubject.asObservable()
  apiConfig: apiEndPoint
  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getTown(): Observable<any[]> {
    this.baseURL = `${uri}/township/getAll`
    let httpOption = { headers: httpHeader }
    return this.http.get<any[]>(uri, httpOption)
  }

  getAllTownship(): Observable<any[]> {
    this.baseURL = `${uri}/township/getAll`
    return new Observable(observable => {
      this.getAll().subscribe(towns => {
        this._towns = towns
        observable.next(towns)
        this.townSubject.next(towns)
        observable.complete()
      })
    })
  }

  getTownshipByName(name: string): Observable<Township[]> {
    this.baseURL = `${uri}/township/getByName`
    let httpParams = new HttpParams().set('name', name);
    return this.getByParams(httpParams);
  }

  getTownshipByParent(id: string): Observable<Township[]> {
    this.baseURL = `${uri}/township/getByParent`
    let httpParams = new HttpParams().set('parentId', id);
    return this.getByParams(httpParams);
  }

  saveTownShip(data: Township): Observable<Township> {
    this.baseURL = `${uri}/township/save`
    return this.save(data)
  }

  removeTownship(id: string) {
    this.baseURL = `${uri}/township/delete`
    let httpParams = new HttpParams().set('id', id);
    return this.getByParams(httpParams);
  }

}
