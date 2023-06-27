import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Speciality } from '../../model/doctor.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiConfigService } from '../api-config-service/api-config.service';
var uri = ``
@Injectable({
  providedIn: 'root'
})
export class SpecialityService extends AbstractService<Speciality>{

  _special: Speciality
  _specials: Speciality[] = []

  specialSubject: BehaviorSubject<Speciality[]> = new BehaviorSubject<Speciality[]>([])
  special$: Observable<Speciality[]> = this.specialSubject.asObservable()
  apiConfig: apiEndPoint
  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getAllSpeciality(): Observable<Speciality[]> {
    this.baseURL = `${uri}/opdSetup/getAllSpeciality`
    return new Observable(observable => {
      return this.getAll().subscribe(specials => {
        this._specials = specials
        observable.next(specials)
        this.specialSubject.next(specials)
        observable.complete()
      })
    })
  }

  getSpecialityByDescription(desc: string): Observable<Speciality[]> {
    let httpParams = new HttpParams()
      .set('desp', desc)
    return this.getByParams(httpParams)
  }

  saveSpeciality(model: Speciality): Observable<Speciality> {
    this.baseURL = `${uri}/opdSetup/saveSpeciality`
    return this.save(model)
  }

  deleteSpeciality(id: string): Observable<Speciality> {
    let httpParams = new HttpParams()
      .set('id', id)
    return this.delete(httpParams)
  }

}
