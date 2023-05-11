import { Component } from '@angular/core';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.css']
})
export class PatternComponent {
  constructor(private commonService:CommonServiceService)
  {

  }

  
}
