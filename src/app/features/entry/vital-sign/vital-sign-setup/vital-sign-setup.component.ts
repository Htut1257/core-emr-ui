import { Component, OnInit } from '@angular/core';
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
  booking:Booking
  constructor(
    private route: Router, private vitalService: VitalSignService,
    private appointService: AppointmentService,
    private commonService: CommonServiceService,
    public formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    if(this.appointService._booking!=undefined){
      this.booking=this.appointService._booking
    }
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

    this.vitalForm.get('bookingId').patchValue(this.booking.bookingId)
    this.vitalForm.get('regNo').patchValue(this.booking.regNo)
  }


  onSaveVital(data) {
    let Vital = data
    console.log(data)
    this.vitalService.saveVitalSign(Vital).subscribe(data => {
      console.log(data)
    })
  }


}
