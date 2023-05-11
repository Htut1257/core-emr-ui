import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';
import { ApiSetting } from 'src/app/api/api-setting';
var uri=`${ApiSetting.EmrEndPoint}`

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private _zone: NgZone,private sseService:SseService) { }

  getServerSource(url: string) {
    uri=`${ApiSetting.EmrEndPoint}${url}`;
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
