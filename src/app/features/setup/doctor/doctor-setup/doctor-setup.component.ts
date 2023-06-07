import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Doctor } from 'src/app/core/model/doctor.model';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

@Component({
  selector: 'app-doctor-setup',
  templateUrl: './doctor-setup.component.html',
  styleUrls: ['./doctor-setup.component.css']
})
export class DoctorSetupComponent implements OnInit {
  doctor: Doctor
  doctorForm: FormGroup
  @ViewChild("reactiveForm", { static: true }) reactiveForm: NgForm

  constructor(
    private doctorService: DoctorService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

  }

  initializeForm() {
    this.doctorForm = this.formBuilder.group({
      doctorId: [{ value: null, disabled: true }],
      doctorName: [''],
      genderId: [''],
      nirc: [''],
      speciality: [''],
      initialID: [''],
      licenseNo: [''],
      active: [''],
      phoneNo: [''],
      updateDate: [''],
      drType: [''],
    })
  }

  initializeFormData(data: Doctor) {
    this.doctorForm.patchValue({

    })
  }


  initializeGrid() {

  }

  onSaveForm() {

  }

  onNew() {

  }

  onClear() {

  }

  clearForm() {

  }




}
