import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  public appDrawer: any;
  public isDrawer: boolean = false
  public currentUrl$ = new BehaviorSubject<String>('');

  $sizeObserver!: Observable<any>
  sizeSubject$!: BehaviorSubject<any>

  //set title object
  private titleSubject: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('headerName'));
  public titleSubject$: Observable<any> = this.titleSubject.asObservable();

  //for configurating mobile screen
  public isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isMobile$: Observable<any> = this.isMobile.asObservable()

  //set mobile screen 
  public isMobileObj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isMobileObj$: Observable<any> = this.isMobileObj.asObservable()

  constructor(private route: Router) {

    //define route name 
    this.route.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl$.next(event.urlAfterRedirects);
      }
    });

    //get screen size 
    this.sizeSubject$ = new BehaviorSubject<any>(this.getCurrScreen());
    this.$sizeObserver = this.sizeSubject$
    if (this.isMobile.value == false) {
      if (this.sizeSubject$.value.width <= 400 || this.sizeSubject$.value.width <= 750) {
        this.isMobile.next(true)
      }
    }
    
  }

  //to open close navigation
  openNavigation() {
    if (this.isDrawer) {
      this.appDrawer.close();
    } else {
      this.appDrawer.open();
    }
    this.isDrawer = !this.isDrawer;
  }

  //get current title component
  public getTitle(name: string) {
    localStorage.setItem('headerName', name)
    this.titleSubject.next(name)
  }

   //get screen size
   getSize(size: any) {
    this.sizeSubject$.next(size);
    if (size.width <= 750 || size.width <= 875) {
      this.isMobile.next(true)
    } else {
      this.isMobile.next(false)
    }
  }

  //get current screen size
  getCurrScreen() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  //set mobile object
  getCurrentObject(data) {
    this.isMobileObj.next(data);
  }

}
