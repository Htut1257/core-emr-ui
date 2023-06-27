import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'; 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MachineInfo } from '../../model/machine-info.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { AbstractService } from '../abstract-service/abstract.service';

var uri = ``
@Injectable({
  providedIn: 'root'
})
export class MachineService extends AbstractService<MachineInfo>{

  machine: BehaviorSubject<MachineInfo> = new BehaviorSubject<MachineInfo>({} as MachineInfo)
  machine$: Observable<MachineInfo> = this.machine.asObservable()

  apiConfig: apiEndPoint

  constructor(@Inject(HttpClient) http: HttpClient, private apiService: ApiConfigService) {
    super(http, uri)
    this.machine = new BehaviorSubject<MachineInfo>(JSON.parse(localStorage.getItem('machine')))
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.EmrEndPoint}`
  }

  getMachineValue(): MachineInfo {
    return this.machine.value
  }

  setMachineValue(model: MachineInfo) {
    localStorage.setItem('machine', JSON.stringify(model))
    this.machine.next(model)
  }

  getIpAddress() {
    this.baseURL = `${uri}/machine/get-machineIp`
    return this.getAll();
  }

  getMachine(model: MachineInfo) {
    this.baseURL = `${uri}/machine/get-machine`
    let httpParams = new HttpParams()
      .set('machineIp', model.machineIp)
      .set('machineName', model.machineName)
    return this.getById(httpParams)
  }


  //save machine
  saveMachine(data: MachineInfo): Observable<MachineInfo> {
    this.baseURL = `${uri}/`
    return this.save(data)
  }


}
