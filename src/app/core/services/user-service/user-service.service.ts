import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, observable, Observable, of } from 'rxjs';
import { User } from '../../model/user.model';
import { apiEndPoint } from '../../model/api-endpoint.model';
import { ApiConfigService } from '../api-config-service/api-config.service';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';

var uri: any = ``
@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User>{
  user: User
  userList: User[] = []

  $user: Observable<User>
  userSubject$!: BehaviorSubject<User>

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  users$: Observable<User[]> = this.users.asObservable();
  apiConfig: apiEndPoint
  constructor(
    @Inject(HttpClient) http: HttpClient, private route: Router,
    private apiService: ApiConfigService
  ) {
    super(http, uri)
    this.userSubject$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')))
    this.$user = this.userSubject$.asObservable()
    this.apiConfig = this.apiService.getConfig()
    uri = `${this.apiConfig.UserApiEndPoint}`
  }

  //get current User
  getUserValue(): User {
    return this.userSubject$.value
  }

  setUserValue(model: User) {
    localStorage.setItem('user', JSON.stringify(model))
    this.userSubject$.next(model)
  }

  //User Login
  loginUser(name: string, password: string): Observable<User[]> {
    this.baseURL = `${uri}/user/login`;
    let httpParams = new HttpParams()
      .set('userName', name)
      .set('password', password)
    return this.getByParams(httpParams);
  }

  //get user list
  getUser(): Observable<User[]> {
    this.baseURL = `${uri}/user/get-appuser`;
    return new Observable(observable => {
      this.getAll().subscribe(users => {
        this.userList = users
        this.users.next(users)
        observable.next(users)
        observable.complete()
      })
    })
  }

  //add or save user
  saveUser(user: User): Observable<User> {
    this.baseURL = `${uri}/user/save-user`;
    return this.save(user)
  }

  //logOut current user and remove it
  logOutUser() {
    localStorage.removeItem('user')
    localStorage.removeItem('machine')
    this.userSubject$.next(null)
    this.route.navigate(['/login']);
  }

}
