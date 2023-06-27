import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Doctor } from '../../model/doctor.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { AbstractService } from '../abstract-service/abstract.service';

var uri: any = ``
@Injectable({
  providedIn: 'root'
})
export class DoctorService extends AbstractService<Doctor>{

  _doctor: Doctor
  _doctors: Doctor[] = []

  doctorSubject: BehaviorSubject<Doctor[]> = new BehaviorSubject<Doctor[]>([])
  doctor$: Observable<Doctor[]> = this.doctorSubject.asObservable();

  apiConfig: apiEndPoint

  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getDoctorById(id: string): Observable<Doctor[]> {
    this.baseURL = `${uri}/doctor/getById`
    let httpParams = new HttpParams().set('id', id);
    return this.getByParams(httpParams);
  }

  getDoctor(): Observable<Doctor[]> {
    this.baseURL = `${uri}/doctor/getAllActive`
    return new Observable(observable => {
      return this.getAll().subscribe(doctors => {
        this._doctors = doctors
        observable.next(doctors)
        this.doctorSubject.next(doctors)
        observable.complete()
      })
    })
  }

  getInativeDoctor(): Observable<Doctor[]> {
    this.baseURL = `${uri}/doctor/getAllInActive`
    return this.getAll()
  }

  getDoctorActiveByName(name: string): Observable<Doctor[]> {
    this.baseURL = `${uri}/doctor/getByNameActive`
    let httpParams = new HttpParams().set('name', name);
    return this.getByParams(httpParams);
  }

  getDoctorInActiveByName(name: string): Observable<Doctor[]> {
    this.baseURL = `${uri}/doctor/getByNameInActive`
    let httpParams = new HttpParams().set('name', name);
    return this.getByParams(httpParams);
  }

  saveDoctor(doc: Doctor): Observable<Doctor> {
    this.baseURL = `${uri}/doctor/save`
    return this.save(doc);
  }

  deleteDoctor(id: string) {
    this.baseURL = `${uri}/doctor/delete`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
