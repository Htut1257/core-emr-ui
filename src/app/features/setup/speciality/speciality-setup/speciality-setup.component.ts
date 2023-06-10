import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { scan, Subscription } from 'rxjs'
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Speciality } from 'src/app/core/model/doctor.model';
import { SpecialityService } from 'src/app/core/services/speciality-service/speciality.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

@Component({
  selector: 'app-speciality-setup',
  templateUrl: './speciality-setup.component.html',
  styleUrls: ['./speciality-setup.component.css']
})

export class SpecialitySetupComponent implements OnInit, OnDestroy {
  specialId: string = ''
  special: Speciality
  specialForm: FormGroup
  @ViewChild("reactiveForm", { static: true }) reactiveForm: NgForm
  subscribe: Subscription
  constructor(
    private specialService: SpecialityService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public formBuilder: FormBuilder
  ) {
    this.subscribe = this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        console.log(this.specialService._special)
        if (this.specialService._special != undefined) {
          this.special = this.specialService._special
          this.specialId = this.special.specId
          this.initializeFormData(this.special)
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
    this.specialForm = this.formBuilder.group({
      specId: [{ value: '', disabled: true }],
      desp: ['', Validators.required]
    })
  }

  initializeFormData(data: Speciality) {
    this.specialForm.patchValue({
      specId: data.specId,
      desp: data.desp
    })
  }

  onSave(data: any) {
    data.specId = this.specialId
    this.specialService.saveSpeciality(data).subscribe({
      next: special => {
        if (this.specialId == '') {
          this.toastService.showSuccessToast("", "Success adding Speciality :" + special.desp)
          this.specialService._specials.push(special)
          this.specialService.specialSubject.next(this.specialService._specials)
        }
        else {
          this.toastService.showSuccessToast("", "Success editing Speciality :" + special.desp)
          this.saveDataChanges(this.special, special)

        }
        this.onNew()
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  saveDataChanges(main: any, data: any) {
    Object.assign(main, data)
  }

  onNew() {
    this.specialId = ''
    this.specialService._special = undefined
    this.clearForm()
  }

  onClear() {
    this.clearForm()
    this.specialForm.get('specId').patchValue(this.specialId)
  }

  clearForm() {
    this.specialForm.reset()
    this.reactiveForm.resetForm()
  }

  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.specialForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.specialForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
  }

  //handle event from submitting
  handleEnter(event: any) {
    let tagname = event.srcElement.id
    if (tagname !== 'btnSave') {
      return false
    }
    return true
  }

}
