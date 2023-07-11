import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Booking, DoctorBooking } from '../../model/booking.model';
import { apiEndPoint } from '../../model/api-endpoint.model';

import { AbstractService } from '../abstract-service/abstract.service';
import { ApiConfigService } from '../api-config-service/api-config.service';

var uri: any = ``

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});
@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends AbstractService<Booking>{
  _booking: Booking
  _bookings: Booking[] = []

  public bookings: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([])
  public bookings$: Observable<Booking[]> = this.bookings.asObservable()

  apiConfig:apiEndPoint

  constructor(
    @Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService
  ) {
    super(http, uri)
    this.apiConfig=this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getAppointment(filter: any): Observable<Booking[]> {
    this.baseURL = `${uri}/patient/searchBooking`
    let httpparams = new HttpParams()
      .set("fromDate", filter.fromDate)
      .set("toDate", filter.toDate)
      .set("drId", filter.doctorId)
      .set("regNo", filter.regNo)
      .set("status", filter.status)
    return new Observable(observable => {
      this.getByParams(httpparams).subscribe(bookings => {
        this._bookings = bookings
        observable.next(bookings)
        this.bookings.next(this._bookings)
        observable.complete()
      })
    })
    // return this.getByParams(httpparams)
  }

  saveAppointment(appoint: Booking): Observable<Booking> {
    this.baseURL = `${uri}/patient/saveBooking`
    return this.save(appoint);
  }

  //set booking status across form
  updateAppointmentStatus(appoint: Booking) {
    this.baseURL = `${uri}/patient/updateBookingStatus`
    let httpParams = new HttpParams()
      .set("bkId", appoint.bookingId)
      .set("bkStatus", appoint.bStatus)
      .set("regNo", appoint.regNo)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.post<Booking>(this.baseURL, appoint, httpOption)
  }

  deleteAppointment(id: string) {
    this.baseURL = `${uri}/`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

  getDoctorBookingStatus(drId: string, tranDate: string): Observable<DoctorBooking[]> {
    let url = `${uri}/patient/getDoctorStatusColumn`
    let httpParams = new HttpParams()
      .set("drId", drId)
      .set("tranDate", tranDate)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.get<DoctorBooking[]>(url, httpOption)
  }

  SSETest():Observable<any[]>{
    let url = `${uri}/opdBooking/getPublishSSEMessage`
    let httpOption = { headers: httpHeaders}
    return this.http.get<any[]>(url, httpOption)
  }

}
