import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { scan, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Township } from 'src/app/core/model/township.model';
import { TownshipService } from 'src/app/core/services/township-service/township.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

@Component({
  selector: 'app-township-setup',
  templateUrl: './township-setup.component.html',
  styleUrls: ['./township-setup.component.css']
})
export class TownshipSetupComponent implements OnInit, OnDestroy {
  townId: string = null
  townShip: Township
  townForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  subscribe: Subscription
  constructor(
    private townService: TownshipService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public formBuilder: FormBuilder,
  ) {
    this.townShip = {} as Township
    this.subscribe = this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        console.log(this.townService._town)
        if (this.townService._town != undefined) {
          this.townShip = this.townService._town
          this.townId = this.townShip.townshipId.toString()
          this.initializeFormData(this.townShip)
        }
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe()
    }
  }

  initializeForm() {
    this.townForm = this.formBuilder.group({
      townShipId: [{ value: '', disabled: true }],
      townShipName: ['', Validators.required],
    })
  }

  initializeFormData(data: Township) {
    this.townForm.patchValue({
      townShipId: data.townshipId,
      townShipName: data.townshipName,
    })
  }

  onSaveTown(data: any) {
    this.townShip.townshipId = this.townId
    this.townShip.townshipName = data.townShipName
    this.townService.saveTownShip(this.townShip).subscribe({
      next: townShip => {
        if (this.townId == null) {
          this.toastService.showSuccessToast("", "Success adding Town :" + townShip.townshipName)
          this.townService._towns.push(townShip)
          this.townService.townSubject.next(this.townService._towns)
        } else {
          this.toastService.showSuccessToast("", "Success editing Town :" + townShip.townshipName)
         // this.saveDataChanges(this.townShip, townShip)
        }
        this.onNew()
        this.townService._town = undefined
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //data changes saved
  saveDataChanges(main: any, data: any) {
    scan(main, data)
  }

  onNew() {
    this.townId = null
    this.clearForm()
  }

  onClear() {
    this.clearForm()
    this.townForm.get('townShipId').patchValue(this.townId)
  }

  clearForm() {
    this.townForm.reset()
    this.reactiveForm.resetForm()
  }

}
