import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Session } from '../../model/session.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { ApiSetting } from 'src/assets/api/api-setting';
import { configApi } from 'src/assets/api/api-setting';
const uri = `${configApi.emrEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class SesionService extends AbstractService<Session>{
  appInsightsKey
  constructor(@Inject(HttpClient) http: HttpClient,private apiService:ApiConfigService) {
    super(http, uri)
    this.appInsightsKey = this.apiService.getConfig();
  }

  getAllSession() {
    console.log(this.appInsightsKey)
    console.log(uri)
    this.baseURL = `${uri}/common/getAllSession`
    return this.getAll()
  }

  saveSesion(data: Session): Observable<Session> {
    this.baseURL = `${uri}/common/saveSession`
    return this.save(data)
  }

}
