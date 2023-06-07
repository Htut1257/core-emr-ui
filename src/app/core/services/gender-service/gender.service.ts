import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender } from '../../model/gender.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';

var uri: any = `${ApiSetting.EmrEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class GenderService extends AbstractService<Gender>{

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getGender(): Observable<Gender[]> {
    this.baseURL = `${uri}/opdSetup/getAllGender`
    return this.getAll()
  }

  saveGender(model: Gender): Observable<Gender> {
    this.baseURL = `${uri}/opdSetup/saveGender`
    return this.save(model)
  }

  deleteGender(id: string): Observable<Gender> {
    this.baseURL = `${uri}/opdSetup/saveGender`
    let httpParmas = new HttpParams()
      .set('id', id)
    return this.delete(httpParmas)
  }

}
