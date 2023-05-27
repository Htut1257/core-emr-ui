import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaymentType } from '../../model/payment.model';
import { ApiSetting } from 'src/app/api/api-setting';
import { AbstractService } from '../abstract-service/abstract.service';
var uri = `${ApiSetting.EmrEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class PaymentService extends AbstractService<PaymentType>{
  _payment: PaymentType
  _payments: PaymentType[] = []
  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getPayment(): Observable<PaymentType[]> {
    this.baseURL = `${uri}/`
    return new Observable(observable => {
      this.getAll().subscribe(payments => {
        observable.next(payments)
        observable.complete()
      })
    })
  }

  savePayment(data: PaymentType): Observable<PaymentType> {
    this.baseURL = `${uri}/`
    return this.save(data)
  }

  deletePayment(id: string) {
    this.baseURL = `${uri}/setup/delete-Bonus`
    let httpParams = new HttpParams().set('id', id);
    this.delete(httpParams);
  }

}
