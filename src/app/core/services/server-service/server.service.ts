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
  serverData: any
  eventsource: EventSource
  constructor(private _zone: NgZone, private sseService: SseService, private apiService: ApiConfigService) {
    this.apiConfig = this.apiService.getConfig()
  }

  getServerSource(url: string): Observable<any> {
    uri = `${this.apiConfig.EmrEndPoint}${url}`;
    return new Observable(observer => {
      if(this.eventsource){
        this.eventsource.close()
      }
      this.eventsource = this.sseService.getEventSource(uri)
      console.log(this.eventsource)
      this.eventsource.onmessage = event => {
        console.log("subscribe id :" + event.lastEventId)
        this._zone.run(() => {
          observer.next(event);
        })
      }

      this.eventsource.onerror = error => {
        this._zone.run(() => {
          console.log('connection lost :attempt to reconnect ')
          observer.error(error);
          this.reconnectToSSE(url)
        })
      }
      return () => {
        this.eventsource.close();
      };
    })
  }


  reconnectToSSE(url) {
    if (this.eventsource.readyState === EventSource.CLOSED) {
      this.getServerSource(url);
    }
  }

}
