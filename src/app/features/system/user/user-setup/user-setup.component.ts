import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, map, startWith } from 'rxjs'
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/core/model/user.model';
import { Role } from 'src/app/core/model/role.model';
import { UserService } from 'src/app/core/services/user-service/user-service.service';
import { RoleService } from 'src/app/core/services/role-service/role-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.css']
})
export class UserSetupComponent implements OnInit {
  user: User
  userId: string = ''
  userList: User[]
  roleList: Role[]
  roleFilteredOption: Observable<any>
  userForm: FormGroup
  submitted: boolean = false
  isMobile = false
  scrHeight: any;
  scrWidth: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    console.log(this.scrWidth)
    if (parseInt(window.innerWidth.toString()) <= 400) {
      this.isMobile = true
    } else {
      this.isMobile = false
    }
  }
  constructor(private route: Router, private formBuilder: FormBuilder,
    private userService: UserService, private roleService: RoleService,
    private toastService: ToastService) {
    this.user = {} as User
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.InitialObject()
    this.getRole()
  }

  //initialize User Object and Form
  public InitialObject() {
    this.initializeForm()
    this.user = this.userService.user
    if (Object.keys(this.user).length > 0) {
      this.userId = this.user.userCode
      this.initializeFormData(this.user)
    }
  }

  //initialize Form 
  initializeForm() {
    this.userForm = this.formBuilder.group({
      userCode: [{ value: '', disabled: true }],
      userName: [''],
      userShortName: [''],
      password: ['', Validators.required],
      email: [''],
      role: ['', Validators.required],
      active: [true],
    });
  }

  //initialize form data 
  initializeFormData(data: User) {
    this.userForm.setValue({
      userCode: data.userCode,
      userName: data.userName,
      userShortName: data.userShortName,
      password: data.password,
      email: data.email ? data.email : '',
      role: data.role,
      active: data.active,
    })
  }

  //get role data
  getRole() {
    this.roleService.getRole().subscribe(roleData => {
      this.roleList = roleData
      this.roleAutoComplete()
    })

  }

  //compare role data with initial data
  compareRole(r1: Role, r2: Role) {
    return r1 && r2 ? r1.roleCode === r2.roleCode : r1 === r2
  }

  //display name on role select
  roleDisplayFn(item: any) {
    return item ? item.roleName : ''
  }

  //filter as autocomplete
  private roleFilter(value: any) {
    let filterValue = ''
    if (value.roleName != null) {
      filterValue = value.roleName.toLowerCase()
    } else {
      filterValue = value.toLowerCase()
    }
    return this.roleList.filter(data => data.roleName.toLowerCase().includes(filterValue));
  }

  //apply autocomplete
  private roleAutoComplete() {
    this.roleFilteredOption = this.userForm.controls['role'].valueChanges.pipe(
      startWith(''),
      map(data => data ? this.roleFilter(data) : this.roleList.slice())
    )
  }

  //add or edit user
  saveUser(user: any) {
    console.log(user)
    user.userCode = this.userId

    this.userService.saveUser(user).subscribe({
      next(userData) {
        this.user = userData
        this.userService.userList.push(this.user);
      },
    })
  }

  onNew() {
    this.userId = ''
    this.onClear()
    this.userService.user = {} as User
  }

  onClear() {
    this.clearObject(this.userId)
  }

  clearObject(id: string) {
    this.userForm.reset();
    this.userForm.controls['userCode'].setValue(id);
    this.userForm.controls['active'].setValue(true);
  }

  onBackToList() {
    this.onNew()
    this.route.navigate(['/main/user/user-list'])
  }

  //key enter event
  focusNext(event: any) {
    let eleString = event.srcElement.id
    let nextString = ''
    switch (eleString) {
      case 'userName': {
        nextString = 'shortName'
        document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
        break
      }
      case 'shortName': {
        nextString = 'password'
        document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
        break
      }
      case 'password': {
        nextString = 'email'
        document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
        break
      }
      case 'email': {
        nextString = 'role'
        document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
        break
      }
      case 'role': {
        if (this.userForm.controls['role'].value == null) {
          break
        }
        nextString = 'btnSave'
        document.querySelector<HTMLInputElement>(`#${nextString}`)?.focus()
        break
      }
    }
  }

  //block auto submit 
  handleEnter(event: any) {
    let eleString = event.srcElement.id
    if (eleString !== 'btnSave') {
      return false
    }
    return true
  }

}
