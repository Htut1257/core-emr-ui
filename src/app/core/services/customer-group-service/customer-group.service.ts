import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CustomerGroup } from '../../model/customer-group.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';
const uri = `${ApiSetting.EmrEndPoint}`

@Injectable({
  providedIn: 'root'
})
export class CustomerGroupService extends AbstractService<CustomerGroup>{
  cusGroup: CustomerGroup
  cusGroups: CustomerGroup[] = []

  cusGroupSubject: BehaviorSubject<CustomerGroup[]> = new BehaviorSubject([])
  cusGroup$: Observable<CustomerGroup[]> = this.cusGroupSubject.asObservable()

  constructor(@Inject(HttpClient) http: HttpClient) {
    super(http, uri)
  }

  getAllCustomerGroup():Observable<CustomerGroup[]>{
    this.baseURL=`${uri}/pharmacySetup/findAllCustomerGroup`
    return new Observable(observable=>{
      return this.getAll().subscribe(data=>{
        this.cusGroups=data
        observable.next(data)
        this.cusGroupSubject.next(data)
        observable.complete()
      })
    })
  }



  saveCustoemrGroup(data:CustomerGroup):Observable<CustomerGroup>{
    this.baseURL=`${uri}/pharmacySetup/saveCustomerGroup`
    return this.save(data)
  }


}
