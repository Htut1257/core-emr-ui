import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
var uri: any = `${ApiSetting.PayRollApiEndPoint}`
interface Appointment {

}
@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends AbstractService<Appointment>{

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getAppointment(): Observable<Appointment[]> {
    this.baseURL = this.baseURL + `/setup/get-Bonus`
    return this.getAll()
  }

  saveAppointment(appoint: Appointment): Observable<Appointment> {
    this.baseURL = this.baseURL + `/setup/save-Bonus`
    return this.save(appoint);
  }

  deleteAppointment(id: string) {
    this.baseURL = this.baseURL + `/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
