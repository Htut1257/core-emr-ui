import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, map, startWith } from 'rxjs'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { User } from 'src/app/core/model/user.model';
import { Role } from 'src/app/core/model/role.model';
import { Doctor } from 'src/app/core/model/doctor.model';
import { UserService } from 'src/app/core/services/user-service/user-service.service';
import { RoleService } from 'src/app/core/services/role-service/role-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
import { DoctorService } from 'src/app/core/services/doctor-service/doctor.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
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

  doctors: Doctor[] = []
  docControl = new FormControl('')
  filteredDoc: Observable<any[]>;

  roleFilteredOption: Observable<any>
  userForm: FormGroup
  submitted: boolean = false
  isMobile = false


  constructor(
    private route: Router, private formBuilder: FormBuilder,
    private userService: UserService, private roleService: RoleService,
    private doctorService: DoctorService,
    private toastService: ToastService, private commonService: CommonServiceService
  ) {
    this.user = {} as User
    this.commonService.isMobileObj$.subscribe(data => {
      if (data = false) {

      }
    })
  }

  ngOnInit(): void {
    this.InitialObject()
    this.getRole()

    this.filteredDoc = this.docControl.valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filterDoc(name) : this.doctors.slice()))
    );
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
      role: [null, Validators.required],
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

  getDoctor(id: string) {
    this.doctorService.getDoctor(id).subscribe({
      next: doctors => {
        this.doctors = doctors;
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  DocDisplayFn(item: any) {
    return item ? item.doctorName : '';
  }

  //filter data for autocomplete
  private _filterDoc(value: any): any {
    let filterValue = value
    this.getDoctor(value)
    if (value.doctorName != null) {
      filterValue = value.doctorName.toLowerCase()
    } else {
      filterValue = value.toLowerCase()
    }
    return this.doctors.filter(data => data.doctorName.toLowerCase().includes(filterValue));
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

    user.userCode = this.userId
    user.doctor = this.docControl.value
    user.uniqueId = user.doctor.doctorId
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
    if (eleString !== 'btnSave') {
      return false
    }
    return true
  }

}
