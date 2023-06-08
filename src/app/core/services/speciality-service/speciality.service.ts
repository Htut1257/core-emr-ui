import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Speciality } from '../../model/doctor.model';
import { ApiSetting } from 'src/app/api/api-setting';
import { AbstractService } from '../abstract-service/abstract.service';
const uri = `${ApiSetting.EmrEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class SpecialityService extends AbstractService<Speciality>{

  _special: Speciality
  _specials: Speciality[] = []

  specialSubject: BehaviorSubject<Speciality[]> = new BehaviorSubject<Speciality[]>([])
  special$: Observable<Speciality[]> = this.specialSubject.asObservable()

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getAllSpeciality(): Observable<Speciality[]> {
    this.baseURL = `${uri}/opdSetup/getAllSpeciality`
    return new Observable(observable => {
      return this.getAll().subscribe(specials => {
        this._specials = specials
        observable.next(specials)
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
