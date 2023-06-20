import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { ApiSetting } from 'src/app/api/api-setting';
import { WeekDay } from '../../model/week-day.model';
import { Observable } from 'rxjs';
var uri = `${ApiSetting.EmrEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class WeekDayService extends AbstractService<WeekDay>{

  constructor(
    @Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService
  ) {
    super(http, uri)

  }

  getWeekDay(): Observable<WeekDay[]> {
    let url = `${this.apiService.getConfig().EmrEndPoint}`
    this.baseURL = `${url}/common/getAllDayOfWeek`
    return this.getAll()
  }

}

