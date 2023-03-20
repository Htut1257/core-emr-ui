import { Injectable, Inject } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
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
@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends AbstractService<Booking>{

  constructor(@Inject(HttpClient) http: HttpClient) {

    super(http, uri)
    console.log(uri)
  }

  _bookings:Booking[]=[]

  public bookings: BehaviorSubject<Booking[]> = new BehaviorSubject<Booking[]>([])
  public bookings$: Observable<Booking[]> = this.bookings.asObservable()

  getAppointment(): Observable<Booking[]> {
    this.baseURL = this.baseURL + `/patient/searchBooking`
    let httpparams = new HttpParams()
      .set("fromDate", "2020-01-01")
      .set("toDate", "2023-03-17")
      .set("drId", "-")
      .set("regNo", "-")
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
    console.log( this.baseURL)
    this.baseURL =`${uri}/patient/saveBooking`
    console.log( this.baseURL)
    return this.save(appoint);
  }

  deleteAppointment(id: string) {
    this.baseURL = `${uri}/setup/delete-Bonus`

    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
