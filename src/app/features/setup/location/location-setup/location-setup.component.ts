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
  locatonId: string
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
      locationId: [{ value: '', disabled: true }],
      locationName: ['']
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
    this.locatonId = ''
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

  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.locationForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.locationForm.controls['' + eleString + ''].value == null) {
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
