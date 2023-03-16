import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  public appDrawer: any;
  isDrawer: boolean = false
  public currentUrl$ = new BehaviorSubject<String>('');

  public isMobileObj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isMobileObj$: Observable<any> = this.isMobileObj.asObservable()

  constructor(private route:Router) {
    //define route name 
    this.route.events.subscribe((event:Event)=>{
      if(event instanceof NavigationEnd){
        this.currentUrl$.next(event.urlAfterRedirects);
      }
    });
  }

  //to open close navigation
  openNavigation() {
    if (this.isDrawer) {
      this.appDrawer.open();
    } else {
      this.appDrawer.close();
    }
    this.isDrawer = !this.isDrawer;
  }

  //set mobile object
  getCurrentObject(data){
    this.isMobileObj.next(data);
  }

}
