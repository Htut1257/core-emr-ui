import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-vital-sign-container',
  templateUrl: './vital-sign-container.component.html',
  styleUrls: ['./vital-sign-container.component.css']
})
export class VitalSignContainerComponent {
  isMobile: boolean = false
  constructor(private commonService: CommonServiceService) {
    this.commonService.isMobile$.subscribe(data => {
      this.isMobile = data
    })
  }
}
