import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeekDay } from '../../model/week-day.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiConfigService } from '../api-config-service/api-config.service';

var uri = ``
@Injectable({
  providedIn: 'root'
})
export class WeekDayService extends AbstractService<WeekDay>{
  apiConfig: apiEndPoint
  constructor(
    @Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService
  ) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getWeekDay(): Observable<WeekDay[]> {
    let url = `${this.apiService.getConfig().EmrEndPoint}`
    this.baseURL = `${url}/common/getAllDayOfWeek`
    return this.getAll()
  }

}

