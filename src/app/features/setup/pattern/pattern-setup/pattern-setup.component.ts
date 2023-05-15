import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Pattern } from 'src/app/core/model/pattern.model';
import { PatternService } from 'src/app/core/services/pattern-service/pattern.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';

@Component({
  selector: 'app-pattern-setup',
  templateUrl: './pattern-setup.component.html',
  styleUrls: ['./pattern-setup.component.css']
})
export class PatternSetupComponent implements OnInit, OnDestroy {

  pattern: Pattern
  patternForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm

  patternId: string = null
  subscription: Subscription
  constructor(
    private patternService: PatternService,
    private toastService: ToastService, private commonService: CommonServiceService,
    public fb: FormBuilder,
  ) {

    this.subscription = this.commonService.isMobileObj$.subscribe({
      next: data => {
        if (data == false) {
          if (this.patternService._pattern) {
            this.pattern = this.patternService._pattern
            this.patternId = this.pattern.id
            this.initiaizeFormData(this.pattern)
          }
        }
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  ngOnInit(): void {
    this.initializeForm()

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  initializeForm() {
    this.patternForm = this.fb.group({
      patternCode: ['', Validators.required],
      despEng: ['', Validators.required],
      despMM: [''],
      factor: [0, Validators.required]
    });
  }

  initiaizeFormData(data: Pattern) {
    this.patternForm.get('patternCode').patchValue(data.patternCode);
    this.patternForm.get('despEng').patchValue(data.despEng);
    this.patternForm.get('despMM').patchValue(data.despMM);
    this.patternForm.get('factor').patchValue(data.factor);
  }

  saveDataChanges(main: Pattern, data: Pattern) {
    main.id = data.id
    main.patternCode = data.patternCode
    main.despEng = data.despEng
    main.despMM = data.despMM
    main.factor = data.factor
  }

  onSavepattern(data: any) {
    data.id = this.patternId
    this.patternService.savePattern(data).subscribe({
      next: pattern => {
        // this.pattern = pattern
        if (!this.patternId) {
          this.toastService.showSuccessToast("", "Success adding new Pattern :" + pattern.patternCode)
          this.patternService._patterns.push(pattern)
          this.patternService.patterns.next(this.patternService._patterns)
        } else {
          this.toastService.showSuccessToast("", "Success editing new Pattern :" + pattern.patternCode)
          this.saveDataChanges(this.pattern, pattern)
        }
        this.clearForm()
      }, error: err => {
        console.trace(err)
      }
    })
  }

  clearForm() {
    this.patternId = ""
    this.patternForm.reset()
    this.reactiveForm.resetForm();
    this.patternForm.get('factor').patchValue(0)

  }

  onClear() {
    this.clearForm();
  }

  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.patternForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.patternForm.controls['' + eleString + ''].value == null) {
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
