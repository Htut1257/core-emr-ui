import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/services/user-service/user-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any
  userForm: FormGroup
  submitted: boolean = false
  constructor(private route: Router, private formBuilder: FormBuilder,
    private userService: UserService, private toastService: ToastService) {
    this.user = {} as User
    this.userService.logOutUser()
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  //initialize From 
  initializeForm() {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //get form controls
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  //get user data to login
  loginUser(userData: any) {
    this.submitted = true
    if (this.userForm.invalid) {
      return
    }
    let user = userData
    this.userService.loginUser(user.userName, user.password).subscribe({
      next: data => {
        this.user = data
        if (this.user == null) {
          this.resetForm()
          document.querySelector<HTMLInputElement>(`#name`).focus()
          return
        }
        localStorage.setItem('user',JSON.stringify(this.user))
        this.route.navigate(['/main'])
      }
    })
  }

  //clear form 
  resetForm() {
    this.submitted = false
    this.userForm.reset()
  }

  //key enter event
  focusNext(event: any) {
    let eleString = event.srcElement.id
    let nextString = ''
    switch (eleString) {
      case 'name': {
        nextString = 'password'
        document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
        break
      }
      case 'password': {
        nextString = 'login'
        document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
        break
      }
    }
  }

  //block auto submit 
  handleEnter(event: any) {
    let eleString = event.srcElement.id
    if (eleString !== 'login') {
      return false
    }
    return true
  }

}


