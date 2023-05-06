import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs'
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { OpdGroup } from 'src/app/core/model/opd.model';
import { OpdService } from 'src/app/core/services/opd-service/opd.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-opd-group-setup',
  templateUrl: './opd-group-setup.component.html',
  styleUrls: ['./opd-group-setup.component.css']
})
export class OpdGroupSetupComponent implements OnInit {
  opdGroup: OpdGroup
  opdGroupForm: FormGroup

  opdGroupId: string
  subscription: Subscription
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  constructor(
    private opdService: OpdService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public fb: FormBuilder,
  ) {
    this.opdGroup = {} as OpdGroup
    this.subscription = this.commonService.isMobileObj$.subscribe(data => {
      this.opdGroupId = null;
      if (data == false) {
        if (this.opdService._opdGroup) {
          this.opdGroup = this.opdService._opdGroup
          this.opdGroupId = this.opdGroup.groupId
          this.initializeFormData(this.opdGroup)
        }

      }

    })
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.opdGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      locationId: ['']
    })
  }

  initializeFormData(data: OpdGroup) {
    console.log(data.groupName)
    this.opdGroupForm.get('groupName').patchValue(data.groupName)
    // this.opdGroupForm.get('locationId').patchValue("")
  }

  saveOpdGroup(data: any) {
    let opdGroup: any = {
      groupId: this.opdGroupId,
      groupName: data.groupName,
      locationId: data.locationId,
      status: true
    }
    console.log(opdGroup)

    this.opdService.saveOpdGroup(opdGroup).subscribe({
      next: opdGroup => {
        console.log("saved")
        console.log(opdGroup)
      },
      error: err => {
        console.trace(err)
      }
    });
  }

}
