import { Injectable, Inject, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Patient } from '../../model/patient.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { AbstractService } from '../abstract-service/abstract.service';

var uri: any = ``
@Injectable({
  providedIn: 'root'
})
export class PatientService extends AbstractService<Patient>{

  apiConfig:apiEndPoint
  constructor(@Inject(HttpClient) http: HttpClient,private apiService:ApiConfigService) {
    super(http, uri)
    this.apiConfig=this.apiService.getConfig()
    uri=`${this.apiConfig.EmrEndPoint}`
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
