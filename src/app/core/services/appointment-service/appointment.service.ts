import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Booking } from '../../model/booking.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
var uri: any = `${ApiSetting.EmrEndPoint}`

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends AbstractService<Booking>{

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getAppointment(): Observable<Booking[]> {
    this.baseURL = this.baseURL + `/patient/searchBooking`
    let httpparams = new HttpParams()
      .set("fromDate", "2020-01-01 ")
      .set("toDate", "2023-03-17")
      .set("drId", "-")
      .set("regNo", "-")
    return this.getByParams(httpparams)
  }

  saveAppointment(appoint: Booking): Observable<Booking> {
    this.baseURL = this.baseURL + `/setup/save-Bonus`
    return this.save(appoint);
  }

  deleteAppointment(id: string) {
    this.baseURL = this.baseURL + `/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
