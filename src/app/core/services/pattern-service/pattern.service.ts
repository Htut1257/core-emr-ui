import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs'
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
import { Pattern } from '../../model/pattern.model';
var uri: any = `${ApiSetting.EmrMongoEndPoint}`

@Injectable({
  providedIn: 'root'
})
export class PatternService extends AbstractService<Pattern>{

  _pattern: Pattern
  _patterns: Pattern[] = []

  patterns:BehaviorSubject<Pattern[]>=new BehaviorSubject<Pattern[]>([]);
  patern$:Observable<Pattern[]>=this.patterns.asObservable()

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getPattern(): Observable<Pattern[]> {
    this.baseURL = `${uri}/pharmacy/get-pharmacy-pattern`
    return new Observable(observable => {
      this.getAll().subscribe(pattern => {
        this._patterns = pattern
        this.patterns.next(pattern)
        observable.next(pattern)
        observable.complete()
      })
    })
  }

  savePattern(data: Pattern): Observable<Pattern> {
    this.baseURL = `${uri}/pharmacy/save-pharmacy-pattern`
    return this.save(data)
  }

  deletePattern(id: string): Observable<string> {
    this.baseURL = `${uri}/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    return this.delete(httpParams);
  }

}
