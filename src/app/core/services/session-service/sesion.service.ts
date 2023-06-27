import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Session } from '../../model/session.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiConfigService } from '../api-config-service/api-config.service';

var uri = ``
@Injectable({
  providedIn: 'root'
})
export class SesionService extends AbstractService<Session>{
  apiConfig: apiEndPoint
  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig();
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getAllSession() {
    this.baseURL = `${uri}/common/getAllSession`
    return this.getAll()
  }

  saveSesion(data: Session): Observable<Session> {
    this.baseURL = `${uri}/common/saveSession`
    return this.save(data)
  }

}
