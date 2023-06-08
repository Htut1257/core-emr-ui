import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Gender } from 'src/app/core/model/gender.model';
import { GenderService } from 'src/app/core/services/gender-service/gender.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-gender-setup',
  templateUrl: './gender-setup.component.html',
  styleUrls: ['./gender-setup.component.css']
})
export class GenderSetupComponent implements OnInit {
  genderId: string = ''
  gender: Gender
  genders: Gender[] = []
  genderForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm

  constructor(
    private genderService: GenderService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public formBuilder: FormBuilder
  ) {
    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        this.gender = this.genderService._gender
        this.genders = this.genderService._genders

        if (this.gender) {
          this.genderId = this.gender.genderId
          this.initializeFormData(this.gender)
        }
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.genderForm = this.formBuilder.group({
      genderId: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  initializeFormData(data: Gender) {
    this.genderForm.patchValue({
      genderId: data.genderId,
      description: data.description
    })
  }

  onSaveGender(data: any) {
    this.genderService.saveGender(data).subscribe({
      next: gender => {
        console.log(gender)

        let obj = this.genders.filter(data => data.genderId == gender.genderId)
        console.log(obj)
        if (obj.length >= 1) {
          let index = this.genders.findIndex(data => data.genderId == gender.genderId)
          this.genders[index] = gender
          this.toastService.showSuccessToast("","Success editing Gender :"+gender.description)
        } else {
          this.genders.push(gender)
          this.toastService.showSuccessToast("","Success adding Gender :"+gender.description)
        }
        this.genderService.genderSubject.next(this.genders)
        this.onNew()
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  onNew() {
    this.genderId = ''
    this.clearForm()
  }

  onClear() {
    this.clearForm()
    this.genderForm.get('genderId').patchValue(this.genderId)
  }

  clearForm() {
    this.genderForm.reset()
    this.reactiveForm.resetForm()
  }

  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.genderForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.genderForm.controls['' + eleString + ''].value == null) {
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
