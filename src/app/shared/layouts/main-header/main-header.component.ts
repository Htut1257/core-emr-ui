import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {
  title:string
  constructor(private route:Router,public commonService:CommonServiceService){
    localStorage.removeItem('headerName') 
    this.commonService.titleSubject$.subscribe(data=>{
      this.title=data
    })
  }

  logOut(){
    this.route.navigate(['/login'])
  }
  
}

