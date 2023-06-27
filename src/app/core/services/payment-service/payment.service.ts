import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaymentType } from '../../model/payment.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { AbstractService } from '../abstract-service/abstract.service';

var uri = ``
@Injectable({
  providedIn: 'root'
})
export class PaymentService extends AbstractService<PaymentType>{
  _payment: PaymentType
  _payments: PaymentType[] = []

  payments: BehaviorSubject<PaymentType[]> = new BehaviorSubject<PaymentType[]>([])
  payments$: Observable<PaymentType[]> = this.payments.asObservable()

  apiConfig: apiEndPoint
  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getPayment(): Observable<PaymentType[]> {
    this.baseURL = `${uri}/common/getAllPaymentType`
    return new Observable(observable => {
      this.getAll().subscribe(payments => {
        observable.next(payments)
        this.payments.next(payments)
        observable.complete()
      })
    })
  }

  savePayment(data: PaymentType): Observable<PaymentType> {
    this.baseURL = `${uri}/common/savePaymentType`
    return this.save(data)
  }

  deletePayment(id: string) {
    this.baseURL = `${uri}/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
