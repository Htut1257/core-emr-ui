import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Booking } from '../../model/booking.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
var uri: any = `${ApiSetting.EmrEndPoint}`
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});
const httpHeaderparams = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
});
@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends AbstractService<Booking>{

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }
  _booking: Booking
  _bookings: Booking[] = []

  public bookings: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([])
  public bookings$: Observable<Booking[]> = this.bookings.asObservable()

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
      let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.post<Booking>(this.baseURL,appoint,httpOption)
  }


  deleteAppointment(id: string) {
    this.baseURL = `${uri}/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
