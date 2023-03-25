import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  isMobile:boolean=false
  constructor(private commonService:CommonServiceService){
    this.commonService.isMobile$.subscribe(data=>{
      this.isMobile=data  
      console.log(data)
    })
  }

}
