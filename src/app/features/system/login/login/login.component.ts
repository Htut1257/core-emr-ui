import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, NgForm, Validators, } from '@angular/forms';

import { User } from 'src/app/core/model/user.model';
import { MachineInfo } from 'src/app/core/model/machine-info.model';

import { UserService } from 'src/app/core/services/user-service/user-service.service';
import { MachineService } from 'src/app/core/services/machine-service/machine.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';

import { SessionComponent } from '../session/session.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any
  userForm: FormGroup
  @ViewChild('reactiveForm', { static: true }) reactiveForm: NgForm
  projObj: any = {}
  machine: any
  isLoading: boolean = false
  constructor(
    private route: Router,
    private userService: UserService, private machineService: MachineService,
    private commonService: CommonServiceService, private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.user = {} as User
    this.userService.logOutUser()
    localStorage.removeItem('core-emr')

  }

  ngOnInit(): void {
    this.initializeForm();
    this.getIpAddress();
  }

  //initialize From 
  initializeForm() {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //get ip address of client machine
  getIpAddress() {
    this.machineService.getIpAddress().subscribe(data => {
      this.machine = data
      console.log(this.machine)
    })
  }

  getMachineId(model: MachineInfo) {
    return this.machineService.getMachine(model)
  }

  //get user data to login
  loginUser(userData: any) {

    this.isLoading = true
    if (this.userForm.invalid) {
      return
    }
    let user = userData
    this.userService.loginUser(user.userName, user.password).subscribe({
      next: data => {
        this.user = data
        console.log(this.user)
        if (this.user == null) {
          this.clearForm()
          document.querySelector<HTMLInputElement>(`#name`).focus()
          return
        }

        this.getMachineId(this.machine).subscribe({
          next: machine => {
            this.projObj.userId = this.user.userCode
            this.projObj.machineId = machine.machineId
            this.projObj.doctorId = this.user.doctorId
            if (this.user.doctorId) {
              this.projObj.sessionId='0'
              this.setProjObj(this.projObj)
              this.route.navigate(['/main/opd/doctor-entry'])
            }
            else {
              this.openSession()
            }
          },
          error: err => {
            this.isLoading = false
            console.trace(err)
          }
        })
      },
      error: err => {
        this.isLoading = false
        console.trace(err)
      }
    })
  }

  //clear form 
  clearForm() {
    this.isLoading = false
    this.userForm.reset()
    this.reactiveForm.resetForm()
  }

  focusElement(eleString: string, nextString: string, type: string) {
    if (type == "autocomplete") {
      if (this.userForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    if (type == "option") {
      if (this.userForm.controls['' + eleString + ''].value == null) {
        return
      }
    }
    document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
  }

  //block auto submit 
  handleEnter(event: any) {
    let eleString = event.srcElement.id
    if (eleString !== 'login') {
      return false
    }
    return true
  }

  openSession() {
    this.dialog.open(SessionComponent, {
      disableClose: false,
      data: {
        'title': 'Appointment Search',
        'status': '-'
      }
    }).afterClosed().subscribe(data => {
      this.isLoading = false
      if (data == undefined) {
        return
      }
      this.projObj.doctorId='0'
      this.projObj.sessionId = data.sessionId
     
      this.setProjObj(this.projObj)
      this.route.navigate(['/main'])
    })
  }

  //set proj id obj
  setProjObj(data) {
    localStorage.setItem('core-emr', JSON.stringify(data))
  }

}


