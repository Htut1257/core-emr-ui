import { Component, ViewChild, OnInit } from '@angular/core';
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
export class PatternSetupComponent implements OnInit {

  pattern: Pattern
  patternForm: FormGroup

  constructor(
    private patternService: PatternService,
    private toastService: ToastService, private commonService: CommonServiceService,
    public fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.initializeForm()

  }

  initializeForm() {
    this.patternForm = this.fb.group({
      patternCode: [''],
      despEng: [''],
      despMM: [''],
      factor: [0]
    });
  }

  initiaizeFormData(data: Pattern) {
    this.patternForm.get('patternCode').patchValue(data.patternCode);
    this.patternForm.get('despEng').patchValue(data.despEng);
    this.patternForm.get('despMM').patchValue(data.despMM);
    this.patternForm.get('factor').patchValue(data.factor);
  }

  onSavepattern(data: any) {
    console.log("saved")
    this.patternService.savePattern(data).subscribe({
      next: pattern => {
        this.pattern = pattern
      }, error: err => {
        console.trace(err)
      }
    })
  }

}
