import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { apiEndPoint } from '../../model/api-endpoint.model';


@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  config: apiEndPoint

  constructor(private http: HttpClient) {

  }

  loadConfig(): Observable<apiEndPoint> {
    return new Observable(observable => {
      return this.http.get<apiEndPoint>('assets/appConfig.json').subscribe(data => {
        this.config = data;
        observable.next(data)
        observable.complete()
      })
    })

  }

  getConfig(): any {
    return this.config;
  }

}
