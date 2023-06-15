import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiEndPoint } from '../../model/api-endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  config: any
  loaded = false
  constructor(private http: HttpClient) {
    this.loadConfig()

  }

  loadConfig() {
    this.http.get('assets/appConfig.json').subscribe(data => {
      this.config = data;
      console.log(data)
      this.loaded = true;
    })

  }

  getConfig(): any {
    return this.config;
  }

}
