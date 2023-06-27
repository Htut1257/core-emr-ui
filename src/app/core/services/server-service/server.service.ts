import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
var uri = ``

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  apiConfig: apiEndPoint
  constructor(private _zone: NgZone, private sseService: SseService, private apiService: ApiConfigService) {
    this.apiConfig = this.apiService.getConfig()
  }

  getServerSource(url: string) {
    uri = `${this.apiConfig.EmrEndPoint}${url}`;
    return Observable.create(observer => {
      let eventsource = this.sseService.getEventSource(uri)
      eventsource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event);
        })
      }

      eventsource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        })
      }

    })
  }

}
