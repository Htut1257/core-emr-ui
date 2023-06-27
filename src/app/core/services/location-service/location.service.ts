import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Location } from '../../model/location.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';

var url = ``
const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Contnet-Type',
})
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  _location: Location
  _locations: Location[] = []

  locations: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([])
  locations$: Observable<Location[]> = this.locations.asObservable()

  apiConfig: apiEndPoint
  constructor(private http: HttpClient, private apiService: ApiConfigService) {
    this.apiConfig = this.apiService.getConfig()
    url = `${this.apiConfig.EmrEndPoint}`
  }

  getLocation(): Observable<Location[]> {
    let uri = `${url}/pharmacySetup/getAllLocation`
    let httpOption = { headers: httpHeaders }
    return new Observable(observable => {
      return this.http.get<Location[]>(uri, httpOption).subscribe(locations => {
        observable.next(locations)
        this.locations.next(locations)
        observable.complete()
      })
    })
  }

  saveLocation(data: Location): Observable<Location> {
    let uri = `${url}/`
    let httpOption = { headers: httpHeaders }
    return this.http.post<Location>(uri, data, httpOption)
  }

  deleteLocation(id: string): Observable<string> {
    let uri = `${url}/`
    let httpParams = new HttpParams()
      .set('', id)
    let httpOption = { headers: httpHeaders, params: httpParams }
    return this.http.delete<string>(uri, httpOption)
  }

}
