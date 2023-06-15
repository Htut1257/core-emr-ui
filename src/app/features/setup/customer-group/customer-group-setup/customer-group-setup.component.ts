import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, Form } from '@angular/forms';
import { CustomerGroup } from 'src/app/core/model/customer-group.model';
import { CustomerGroupService } from 'src/app/core/services/customer-group-service/customer-group.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-customer-group-setup',
  templateUrl: './customer-group-setup.component.html',
  styleUrls: ['./customer-group-setup.component.css']
})
export class CustomerGroupSetupComponent implements OnInit {

  cusId: string = null
  customerForm: FormGroup
  @ViewChild("#reactiveForm", { static: true }) reactiveForm: NgForm


  constructor(
    private customerService: CustomerGroupService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public formBuilder: FormBuilder
  ) {
    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {

      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.customerForm = this.formBuilder.group({
      id: [],
      name: [],

    })
  }

  initializeFormData() {

  }

  saveCustomer(data:any) {

  }

  onNew() {

  }

  onClear() {

  }

  clearForm() {

  }


}
