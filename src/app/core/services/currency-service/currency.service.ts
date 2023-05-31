import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Currency } from '../../model/currency.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
var uri = `${ApiSetting.EmrEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends AbstractService<Currency>{

  _currency: Currency
  _currencies: Currency[] = []
  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getCurrency(): Observable<Currency[]> {
    this.baseURL=`${uri}/common/getAllCurrency`
    return new Observable(observable => {
      return this.getAll().subscribe(currencies => {
        this._currencies = currencies
        observable.next(currencies)
        observable.complete()
      })
    })
  }

  saveCurrency(data: Currency): Observable<Currency> {
    this.baseURL=`${uri}/common/saveCurrency`
    return this.save(data)
  }

}
