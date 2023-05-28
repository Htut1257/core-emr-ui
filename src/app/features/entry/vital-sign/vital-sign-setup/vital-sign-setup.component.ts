import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VitalSign } from 'src/app/core/model/vital-sign.model';
import { VitalSignService } from 'src/app/core/services/vital-sign-service/vital-sign.service';
import { AppointmentService } from 'src/app/core/services/appointment-service/appointment.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { Booking } from 'src/app/core/model/booking.model';
@Component({
  selector: 'app-vital-sign-setup',
  templateUrl: './vital-sign-setup.component.html',
  styleUrls: ['./vital-sign-setup.component.css']
})
export class VitalSignSetupComponent implements OnInit {
  vital: VitalSign
  vitalForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm

  booking: Booking
  isLoading: boolean = false
  constructor(
    private route: Router, private vitalService: VitalSignService,
    private appointService: AppointmentService,
    private commonService: CommonServiceService,
    public formBuilder: FormBuilder
  ) {
    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        console.log(data)
        console.log(this.appointService._booking)
        if (this.appointService._booking != undefined) {
          this.booking = this.appointService._booking
          this.initializeFormData(this.booking)
        }
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.vitalForm = this.formBuilder.group({
      bookingId: [{ value: null, disabled: true }],
      regNo: [{ value: null, disabled: true }],
      nurseRemark: [''],
      temperature: [''],
      tempUnit: [''],
      plus: [''],
      respiratory: [''],
      bpUpper: [''],
      bpLower: [''],
      oxygenStatus: [''],
      oxygenRate: [''],
      oxygenConcentration: [''],
      oxygenMethod: [''],
      glucometer: [''],
      glucoUnit: [''],
      weight: [''],
      weightUnit: [''],
      height: [''],
      heightUnit: [''],
      bmi: [''],
    })
  }

  initializeFormData(data) {
    console.log(data)
    this.vitalForm.get('bookingId').patchValue(data.bookingId)
    this.vitalForm.get('regNo').patchValue(data.regNo)
  }

  onSaveVital(data) {
    let Vital = data
    let booking: any = this.booking
    booking.bStatus = booking.bstatus
    Vital.regNo = this.vitalForm.get('regNo').value
    Vital.bookingId = this.vitalForm.get('bookingId').value
    this.vitalService.saveVitalSign(Vital).subscribe({
      next: vital => {
        this.appointService.updateAppointmentStatus(booking).subscribe({
          next: booking => {
            this.onClear();
          }, error: err => {
            console.trace(err)
          }
        })
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  onNew() {

  }

  onBackToList() {

  }

  onClear() {
    this.isLoading = false
    this.clearForm()
  }

  clearForm() {
    this.vitalForm.reset()
    this.reactiveForm.resetForm()
  }

  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.vitalForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.vitalForm.controls['' + eleString + ''].value == null) {
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
