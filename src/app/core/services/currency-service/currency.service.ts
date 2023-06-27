import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Currency } from '../../model/currency.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiConfigService } from '../api-config-service/api-config.service';
var uri = ``
@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends AbstractService<Currency>{

  _currency: Currency
  _currencies: Currency[] = []
  apiConfig: apiEndPoint
  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getCurrency(): Observable<Currency[]> {
    this.baseURL = `${uri}/common/getAllCurrency`
    return new Observable(observable => {
      return this.getAll().subscribe(currencies => {
        this._currencies = currencies
        observable.next(currencies)
        observable.complete()
      })
    })
  }

  saveCurrency(data: Currency): Observable<Currency> {
    this.baseURL = `${uri}/common/saveCurrency`
    return this.save(data)
  }

}
