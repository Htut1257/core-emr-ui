import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { Gender } from '../../model/gender.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiConfigService } from '../api-config-service/api-config.service';
var uri: any = ``
@Injectable({
  providedIn: 'root'
})
export class GenderService extends AbstractService<Gender>{

  _gender: Gender
  _genders: Gender[] = []

  genderSubject: BehaviorSubject<Gender[]> = new BehaviorSubject<Gender[]>([])
  gender$: Observable<Gender[]> = this.genderSubject.asObservable()

  apiConfig: apiEndPoint

  constructor(@Inject(HttpClient) http: HttpClient, private apIService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apIService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getGender(): Observable<Gender[]> {
    this.baseURL = `${uri}/opdSetup/getAllGender`
    return new Observable(observable => {
      return this.getAll().subscribe(genders => {
        this._genders = genders
        observable.next(genders)
        this.genderSubject.next(genders)
        observable.complete()
      })
    })
  }

  saveGender(model: Gender): Observable<Gender> {
    this.baseURL = `${uri}/opdSetup/saveGender`
    return this.save(model)
  }

  deleteGender(id: string): Observable<Gender> {
    this.baseURL = `${uri}/opdSetup/deleteGender`
    let httpParmas = new HttpParams()
      .set('id', id)
    return this.delete(httpParmas)
  }

}
