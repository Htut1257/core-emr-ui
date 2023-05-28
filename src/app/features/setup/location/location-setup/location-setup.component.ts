import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Location } from 'src/app/core/model/location.model';
import { LocationService } from 'src/app/core/services/location-service/location.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-location-setup',
  templateUrl: './location-setup.component.html',
  styleUrls: ['./location-setup.component.css']
})
export class LocationSetupComponent implements OnInit, OnDestroy {

  location: Location
  locatonId:string
  locationForm: FormGroup

  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm

  constructor(
    private locationService: LocationService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {

  }

  initializeForm() {
    this.locationForm = this.formBuilder.group({

    })
  }

  initializeFormData(data: Location) {

  }

  onSaveLocation(data: any) {
    this.locationService.saveLocation(data).subscribe({
      next: location => {
        console.log(location)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  onNew() {
    this.locatonId=''
    this.clearForm()
  }

  onBacktoList() {

  }

  onClear() {
    this.clearForm()
  }

  clearForm() {
    this.locationForm.reset()
    this.reactiveForm.resetForm()
  }


}
