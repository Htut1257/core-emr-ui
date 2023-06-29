import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DoctorSchedule } from '../../model/schedule.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { ApiSetting } from 'src/app/api/api-setting';
var uri = `${ApiSetting.EmrEndPoint}`
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
})
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  _docSchedule: DoctorSchedule
  _docSchedules: DoctorSchedule[] = []

  docScheduleSubject: BehaviorSubject<DoctorSchedule[]> = new BehaviorSubject<DoctorSchedule[]>([])
  docSchedule$: Observable<DoctorSchedule[]> = this.docScheduleSubject.asObservable()
  apiConfig: apiEndPoint
  constructor(
    private http: HttpClient, private apiService: ApiConfigService
  ) {
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getDoctorSchedule(doctorId: string): Observable<DoctorSchedule[]> {
    return new Observable(observable => {
      let url = `${uri}/doctor/getDRScheduleTemplate`
      let httpParams = new HttpParams()
        .set("drId", doctorId)
      let httpOption = { headers: httpHeaders, params: httpParams }
      return this.http.get<DoctorSchedule[]>(url, httpOption).subscribe(schedules => {
        this._docSchedules = schedules
        this.docScheduleSubject.next(schedules)
        observable.next(this._docSchedules)
        observable.complete()
      })
    })
  }

  searchDoctorSchedule(date: string, doctorId: string): Observable<DoctorSchedule[]> {
    let url = `${uri}/doctor/searchDoctorSchedule`
    let httpParams = new HttpParams()
      .set("tranDate", date)
      .set("drId", doctorId)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.get<DoctorSchedule[]>(url, httpOption);
  }

  saveDoctorSchedule(data: DoctorSchedule): Observable<DoctorSchedule> {
    let url = `${uri}/doctor/saveDoctorScheduleTemplate`
    let httpOption = { headers: httpHeaders }
    return this.http.post<DoctorSchedule>(url, data, httpOption)
  }

  generateDoctorSchedule(fromDate: string, toDate: string, doctorId: string): Observable<DoctorSchedule[]> {
    let url = `${uri}/doctor/generateDoctorSchedule`
    let httpParams = new HttpParams()
      .set("from", fromDate)
      .set("to", toDate)
      .set("doctorId", doctorId)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.get<DoctorSchedule[]>(url, httpOption);
  }

}
