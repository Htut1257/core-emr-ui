import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getGender():Observable<Gender[]>{
    this.baseURL = this.baseURL + `/setup/get-gender`
    return this.getAll()
  }

}
