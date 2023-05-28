import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { PaymentType } from 'src/app/core/model/payment.model';
import { PaymentService } from 'src/app/core/services/payment-service/payment.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

@Component({
  selector: 'app-payment-setup',
  templateUrl: './payment-setup.component.html',
  styleUrls: ['./payment-setup.component.css']
})
export class PaymentSetupComponent implements OnInit, OnDestroy {

  payment: PaymentType
  paymentForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm

  paymentId: string = ''

  subscription: Subscription

  constructor(
    private payService: PaymentService, private commonService: CommonServiceService,
    private toastService: ToastService, public formBuilder: FormBuilder
  ) {
    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {

        if (this.payService._payment != undefined) {
          this.payment = this.payService._payment
          this.paymentId = this.payment.paymentTypeId
          this.initializeFormData(this.payment)
        }

      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  ngOnDestroy(): void {

  }

  initializeForm() {
    this.paymentForm = this.formBuilder.group({
      paymentId: [{ value: '', disabled: true }],
      description: ['', Validators.required]
    })
  }

  initializeFormData(data: PaymentType) {
    this.paymentForm.get('paymentId').patchValue(data.paymentTypeId)
    this.paymentForm.get('description').patchValue(data.paymentTypeName)
  }

  onSavePayment(data: any) {
    this.payService.savePayment(data).subscribe({
      next: payment => {
        if (this.paymentId) {
          this.toastService.showSuccessToast("", "Success Editing " + payment.paymentTypeName)
        } else {
          this.toastService.showSuccessToast("", "Success Adding " + payment.paymentTypeName)
        }
        this.onNew()
        document.querySelector<HTMLInputElement>(`#description`)?.focus()
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  onBacktoList() {

  }

  onNew() {
    this.paymentId = ''
    this.onClear()
  }

  onClear() {
    //this.isLoading = false

    this.clearForm()
  }

  clearForm() {
    this.paymentForm.reset()
    this.reactiveForm.resetForm()
  }

  //
  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.paymentForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.paymentForm.controls['' + eleString + ''].value == null) {
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
