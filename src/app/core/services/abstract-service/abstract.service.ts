import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, observable, Observable, of } from 'rxjs';
const httpHeader = new HttpHeaders({
  'Content-Type': 'text/event-stream',// text/event-stream application/stream+json application/json
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,ORIGINS',
});
export abstract class AbstractService<T>{
  protected baseURL: string;
  constructor(protected http: HttpClient, baseURL: string) {
    this.baseURL = baseURL
  }

  getById(params: HttpParams): Observable<T> {
    return new Observable(observable => {
      let uri = this.baseURL
      let httpParams = params;
      let httpOption = { headers: httpHeader, params: httpParams }

      this.http.get<T>(uri, httpOption).subscribe(data => {
        observable.next(data)
        observable.complete()
      });
    })
  }

  //get all obj list
  getAll(): Observable<T[]> {
    return new Observable(observable => {
      let uri = this.baseURL
      let httpOption = { headers: httpHeader }
      this.http.get<T[]>(uri, httpOption).subscribe(data => {
        observable.next(data)
        observable.complete()
      });
    })
  }

  getByParams(params: HttpParams): Observable<T[]> {
    let uri = this.baseURL
    let httpParams = params;
    let httpOption = { headers: httpHeader, params: httpParams }
    return this.http.get<any>(uri, httpOption)
  }

  //save obj
  save(obj: T): Observable<T> {
    let uri = this.baseURL
    let httpOption = { headers: httpHeader }
    return this.http.post<T>(uri, obj, httpOption)
  }

  //delete obj
  delete(params: HttpParams) {
    let uri = this.baseURL
    let httpParams = params;
    let httpOption = { headers: httpHeader, params: httpParams }
    return this.http.delete<any>(uri, httpOption)
  }

}
