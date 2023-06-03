import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
import { Township } from '../../model/township.model';
import { Observable } from 'rxjs';
const uri = `${ApiSetting.EmrEndPoint}`
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

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }


  getTown(): Observable<any[]> {
    this.baseURL = `${uri}/township/getAll`
    let httpOption = { headers: httpHeader }
    return this.http.get<any[]>(uri, httpOption)
  }

  getAllTownship(): Observable<any[]> {
    this.baseURL = `${uri}/township/getAll`
    return this.getAll()
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
    this.baseURL = `${uri}/township/getByParent`
    return this.save(data)
  }

  removeTownship(id: string) {
    this.baseURL = `${uri}/township/delete`
    let httpParams = new HttpParams().set('id', id);
    return this.getByParams(httpParams);
  }

}
