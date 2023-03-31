import { Injectable, Inject, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
import { Patient } from '../../model/patient.model';
var uri: any = `${ApiSetting.EmrEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class PatientService extends AbstractService<Patient>{

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getPatientByName(name: string) {
    this.baseURL = `${uri}/patient/getByName`
    let httpParams = new HttpParams().set('name', name);
    return this.getByParams(httpParams);
  }

  savePatient(data: Patient) {
    this.baseURL = `${uri}/patient/save`
    return this.save(data);
  }

  removePatient(id: string) {
    this.baseURL = `${uri}/patient/delete`
    let httpParams = new HttpParams().set('id', id);
    return this.getByParams(httpParams);
  }

  searchBooking(params: any) {
    this.baseURL = `${uri}/patient/searchBooking`
    let httpParams = new HttpParams()
      .set('name', params)
      .set('name', params)
    return this.getByParams(httpParams);
  }

  saveBooking(data: Patient) {
    this.baseURL = `${uri}/patient/saveBooking`
    return this.save(data);
  }

  deleteBooking(id: string) {
    this.baseURL = `${uri}/patient/deleteBooking`
    let httpParams = new HttpParams().set('id', id);
    return this.getByParams(httpParams);
  }

}
