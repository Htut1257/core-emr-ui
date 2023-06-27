import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomerGroup } from '../../model/customer-group.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiConfigService } from '../api-config-service/api-config.service';
var uri = ``

@Injectable({
  providedIn: 'root'
})
export class CustomerGroupService extends AbstractService<CustomerGroup>{
  cusGroup: CustomerGroup
  cusGroups: CustomerGroup[] = []

  apiConfig: apiEndPoint

  cusGroupSubject: BehaviorSubject<CustomerGroup[]> = new BehaviorSubject([])
  cusGroup$: Observable<CustomerGroup[]> = this.cusGroupSubject.asObservable()

  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getAllCustomerGroup(): Observable<CustomerGroup[]> {
    this.baseURL = `${uri}/pharmacySetup/findAllCustomerGroup`
    return new Observable(observable => {
      return this.getAll().subscribe(data => {
        this.cusGroups = data
        observable.next(data)
        this.cusGroupSubject.next(data)
        observable.complete()
      })
    })
  }

  saveCustoemrGroup(data: CustomerGroup): Observable<CustomerGroup> {
    this.baseURL = `${uri}/pharmacySetup/saveCustomerGroup`
    return this.save(data)
  }

}
