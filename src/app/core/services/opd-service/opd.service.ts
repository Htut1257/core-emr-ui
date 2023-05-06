import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,BehaviorSubject} from 'rxjs';
import { OpdGroup, OpdCategory, OpdServiceModel } from '../../model/opd.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
var EmrEndPoint=ApiSetting.EmrEndPoint
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
});
@Injectable({
  providedIn: 'root'
})
export class OpdService {

  _opdGroups:OpdGroup[]=[]
  _opdGroup:OpdGroup

  public opdGroups: BehaviorSubject<OpdGroup[]> = new BehaviorSubject<OpdGroup[]>([])
  public opdGroups$: Observable<OpdGroup[]> = this.opdGroups.asObservable()

  constructor(
    private http: HttpClient
  ) {

  }



  //#region  opd setup
  getOpdGroup(): Observable<OpdGroup[]> {
    let uri =`${EmrEndPoint}/opdSetup/getAllOPDGroup`
    let httpOption = { headers: httpHeaders }
    return new Observable(observable=>{
      if(this._opdGroups.length>1){
        observable.next(this._opdGroups)
        this.opdGroups.next(this._opdGroups)
        return observable.complete()
      }
      return this.http.get<OpdGroup[]>(uri, httpOption).subscribe(opdGroups=>{
          observable.next(opdGroups)
          this.opdGroups.next(opdGroups)  
        observable.complete()
      })
    });

  }

  saveOpdGroup(data: OpdGroup): Observable<OpdGroup> {
    let uri =`${EmrEndPoint}/opdSetup/saveOPDGroup`
    let httpOption = { headers: httpHeaders }
    return this.http.post<OpdGroup>(uri, data, httpOption)
  }

  deleteOpdGroup(id: string): Observable<string> {
    let uri =`${EmrEndPoint}/opdSetup/deleteOPDGroup`
    let httpParams = new HttpParams()
      .set('id', id)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.delete<string>(uri, httpOption)
  }

  //#endregion opd setup

  //#region  opd category
  getOpdCategory(): Observable<OpdGroup[]> {
    let uri = ''
    let httpOption = { headers: httpHeaders }
    return this.http.get<OpdGroup[]>(uri, httpOption);
  }

  saveOpdCategory(data: OpdGroup): Observable<OpdGroup> {
    let uri = '';
    let httpOption = { headers: httpHeaders }
    return this.http.post<OpdGroup>(uri, data, httpOption)
  }

  deleteOpdCategory(id: string): Observable<string> {
    let uri = ''
    let httpParams = new HttpParams()
      .set('id', id)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.delete<string>(uri, httpOption)
  }

  //#endregion opd Category


  //#region  opd service
  getOpdService(): Observable<OpdGroup[]> {
    let uri = ''
    let httpOption = { headers: httpHeaders }
    return this.http.get<OpdGroup[]>(uri, httpOption);
  }

  saveOpdService(data: OpdGroup): Observable<OpdGroup> {
    let uri = '';
    let httpOption = { headers: httpHeaders }
    return this.http.post<OpdGroup>(uri, data, httpOption)
  }

  deleteOpdService(id: string): Observable<string> {
    let uri = ''
    let httpParams = new HttpParams()
      .set('id', id)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.delete<string>(uri, httpOption)
  }

  //#endregion opd service



}
