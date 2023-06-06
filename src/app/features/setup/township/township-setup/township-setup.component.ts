import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Township } from 'src/app/core/model/township.model';
import { TownshipService } from 'src/app/core/services/township-service/township.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
import { scan } from 'rxjs';
@Component({
  selector: 'app-township-setup',
  templateUrl: './township-setup.component.html',
  styleUrls: ['./township-setup.component.css']
})
export class TownshipSetupComponent implements OnInit {
  townId: string = null
  townShip: Township
  townForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm

  constructor(
    private townService: TownshipService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public formBuilder: FormBuilder,
  ) {
    this.townShip = {} as Township
    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
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
        if (this.townId != null) {
          this.toastService.showSuccessToast("", "Success adding Town :" + townShip.townshipName)
          this.townService._towns.push(this.townShip)
          this.townService.townSubject.next(this.townService._towns)
        } else {
          this.toastService.showSuccessToast("", "Success editing Town :" + townShip.townshipName)
          this.saveDataChanges(this.townShip,townShip)
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
  saveDataChanges(main:any,data:any){
   scan(main,data)
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
