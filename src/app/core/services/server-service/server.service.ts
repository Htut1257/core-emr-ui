import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private _zone: NgZone) { }

  getServerSource(url: string): EventSource {
    return Observable.create(observer => {
      let eventsource = new EventSource(url)
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
