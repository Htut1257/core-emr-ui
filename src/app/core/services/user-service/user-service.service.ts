import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, observable, Observable, of } from 'rxjs';
import { User } from '../../model/user.model';
import { AbstractService } from '../abstract-service/abstract.service';
import { ApiSetting } from 'src/app/api/api-setting';

const userApi = ApiSetting.UserApiEndPoint;
var uri: any = `${ApiSetting.UserApiEndPoint}`
@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User>{
  user: User
  userList: User[] = []
  $user: Observable<User>
  userSubject$!: BehaviorSubject<User>
  constructor(@Inject(HttpClient) http: HttpClient, private route: Router) {
    super(http, uri)
    this.userSubject$ = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')))
    this.$user = this.userSubject$
    this.user = {} as User
  }

  //get current User
  getUserValue(): User {
    return this.userSubject$.value
  }

  //User Login
  loginUser(name: string, password: string): Observable<User[]> {
    this.baseURL = this.baseURL + '/user/login';
    let httpParams = new HttpParams()
      .set('userName', name)
      .set('password', password)
    return this.getByParams(httpParams);
  }

  //get user list
  getUser(): Observable<User[]> {
    this.baseURL = this.baseURL + '/user/get-appuser';
    return this.getAll();
  }

  //add or save user
  saveUser(user: User): Observable<User> {
    this.baseURL = this.baseURL + '/user/save-user';
    return this.save(user)
  }

  //logOut current user and remove it
  logOutUser() {
    localStorage.removeItem('user')
    this.userSubject$.next(null)
    this.route.navigate(['/login']);
  }

}
