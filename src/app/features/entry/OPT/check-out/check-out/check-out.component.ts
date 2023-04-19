import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  isMobile: boolean = false
  constructor(
    private commonService: CommonServiceService,
  ) {
    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
      console.log(data)
    })
  }



}
