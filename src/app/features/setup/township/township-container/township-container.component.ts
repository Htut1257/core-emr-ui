import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-township-container',
  templateUrl: './township-container.component.html',
  styleUrls: ['./township-container.component.css']
})
export class TownshipContainerComponent {
  isMobile: boolean = false
  constructor(private commonService: CommonServiceService) {
    this.commonService.isMobile$.subscribe(data=>{
      this.isMobile=data
    })
  }

}
