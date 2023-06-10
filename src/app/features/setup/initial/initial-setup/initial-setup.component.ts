import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Initial } from 'src/app/core/model/doctor.model';
import { InitialService } from 'src/app/core/services/initial-service/initial.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';


@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.component.html',
  styleUrls: ['./initial-setup.component.css']
})
export class InitialSetupComponent implements OnInit {
  initialId: string = ''
  initial: Initial
  initialForm: FormGroup
  @ViewChild("reactiveForm", { static: true }) reactiveForm: NgForm

  constructor(
    private initialService: InitialService,
    private commonService: CommonServiceService, private toastSerice: ToastService,
    public formBuilder: FormBuilder
  ) {
    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        console.log(data)
        this.initial = this.initialService._initial
        if (this.initial != undefined) {
          this.initialId = this.initial.initialId
          this.initializeFormData(this.initial)
        }
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.initialForm = this.formBuilder.group({
      initialId: [{ value: '', disabled: true }],
      initialName: ['', Validators.required]
    })
  }

  initializeFormData(data: Initial) {
    this.initialForm.patchValue({
      initialId: data.initialId,
      initialName: data.initialName
    })
  }

  onSave(data: any) {
    console.log(data)
    data.initialId=this.initialId
    this.initialService.saveInitial(data).subscribe({
      next: initial => {
        if (this.initialId != '') {
          this.toastSerice.showSuccessToast("", "Success Editing Initial : " + initial.initialName)
          this.saveDataChanges(this.initial, initial)
        } else {
          this.toastSerice.showSuccessToast("", "Success Adding Initial : " + initial.initialName)
          this.initialService._initials.push(initial)
          this.initialService.initialSubject.next(this.initialService._initials)
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
    this.initialId = ''
    this.clearForm()
  }

  onClear() {
    console.log(this.initialId)
    this.clearForm()
    this.initialForm.get('initialId').patchValue(this.initialId)
  }

  clearForm() {
    this.initialForm.reset()
    this.reactiveForm.resetForm()
  }

}
