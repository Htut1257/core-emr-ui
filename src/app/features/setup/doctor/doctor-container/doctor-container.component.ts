import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-doctor-container',
  templateUrl: './doctor-container.component.html',
  styleUrls: ['./doctor-container.component.css']
})
export class DoctorContainerComponent {
  constructor(
    private commonService:CommonServiceService
  ){

  }
}
