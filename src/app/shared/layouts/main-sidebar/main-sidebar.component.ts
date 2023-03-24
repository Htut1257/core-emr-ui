import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { NavItem } from 'src/app/core/model/nav-item.model';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ]
})

export class MainSidebarComponent implements OnInit {
  expanded: boolean = false

  @Input() item!: NavItem;
  @Input() dept!:number;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded

  constructor(public route: Router, private commonService: CommonServiceService) {

  }

  ngOnInit(): void {
    //define route 
    this.commonService.currentUrl$.subscribe((url:string)=>{
      if(this.item.children && url){
        this.ariaExpanded=this.expanded;
      }
    });
  }

  //on select navigation item
  onSelectedItem(item:any){
    if(!item.children || !item.children.length){
      let uri=item.route?.toLowerCase();
      this.route.navigate([uri]);
      this.commonService.openNavigation();
      this.commonService.getTitle(item.displayName)
      return;
    }
    this.expanded=!this.expanded
  }

}
