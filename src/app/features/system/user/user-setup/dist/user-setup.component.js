"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSetupComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var UserSetupComponent = /** @class */ (function () {
    function UserSetupComponent(route, formBuilder, userService, roleService, doctorService, toastService, commonService) {
        var _this = this;
        this.route = route;
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.roleService = roleService;
        this.doctorService = doctorService;
        this.toastService = toastService;
        this.commonService = commonService;
        this.userId = '';
        this.doctors = [];
        this.docControl = new forms_1.FormControl('');
        this.submitted = false;
        this.isMobile = false;
        // this.user = {} as User
        this.commonService.isMobileObj$.subscribe(function (data) {
            console.log(_this.userService.user);
            if (data == false) {
                if (_this.userService.user != undefined) {
                    _this.user = _this.userService.user;
                    _this.userId = _this.user.userCode;
                    _this.initializeFormData(_this.user);
                }
            }
        });
    }
    UserSetupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeForm();
        this.getRole();
        this.filteredDoc = this.docControl.valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (name) { return (name ? _this._filterDoc(name) : _this.doctors.slice()); }));
    };
    //initialize Form 
    UserSetupComponent.prototype.initializeForm = function () {
        this.userForm = this.formBuilder.group({
            userCode: [{ value: '', disabled: true }],
            userName: [''],
            userShortName: [''],
            password: ['', forms_1.Validators.required],
            email: [''],
            role: [null, forms_1.Validators.required],
            active: [true]
        });
    };
    //initialize form data 
    UserSetupComponent.prototype.initializeFormData = function (data) {
        this.userForm.get('userCode').patchValue(data.userCode);
        this.userForm.get('userName').patchValue(data.userName);
        this.userForm.get('userShortName').patchValue(data.userShortName);
        this.userForm.get('password').patchValue(data.password);
        this.userForm.get('email').patchValue(data.email);
        var role = this.roleList.filter(function (item) { return item.roleCode == data.roleCode; });
        this.userForm.get('role').patchValue(role[0]);
        this.userForm.get('active').patchValue(data.active);
    };
    //get role data
    UserSetupComponent.prototype.getRole = function () {
        var _this = this;
        this.roleService.getRole().subscribe(function (roleData) {
            console.log(roleData);
            _this.roleList = roleData;
            _this.roleAutoComplete();
        });
    };
    //display name on role select
    UserSetupComponent.prototype.roleDisplayFn = function (item) {
        return item ? item.roleName : '';
    };
    UserSetupComponent.prototype.getDoctor = function (id) {
        var _this = this;
        this.doctorService.getDoctor(id).subscribe({
            next: function (doctors) {
                _this.doctors = doctors;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    UserSetupComponent.prototype.DocDisplayFn = function (item) {
        return item ? item.doctorName : '';
    };
    //filter data for autocomplete
    UserSetupComponent.prototype._filterDoc = function (value) {
        var filterValue = value;
        this.getDoctor(value);
        if (value.doctorName != null) {
            filterValue = value.doctorName.toLowerCase();
        }
        else {
            filterValue = value.toLowerCase();
        }
        return this.doctors.filter(function (data) { return data.doctorName.toLowerCase().includes(filterValue); });
    };
    //filter as autocomplete
    UserSetupComponent.prototype.roleFilter = function (value) {
        var filterValue = '';
        if (value.roleName != null) {
            filterValue = value.roleName.toLowerCase();
        }
        else {
            filterValue = value.toLowerCase();
        }
        return this.roleList.filter(function (data) { return data.roleName.toLowerCase().includes(filterValue); });
    };
    //apply autocomplete
    UserSetupComponent.prototype.roleAutoComplete = function () {
        var _this = this;
        this.roleFilteredOption = this.userForm.controls['role'].valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (data) { return data ? _this.roleFilter(data) : _this.roleList.slice(); }));
    };
    //add or edit user
    UserSetupComponent.prototype.saveUser = function (user) {
        user.userCode = this.userId;
        user.doctor = this.docControl.value;
        user.uniqueId = user.doctor.doctorId;
        this.userService.saveUser(user).subscribe({
            next: function (userData) {
                this.user = userData;
                this.userService.userList.push(this.user);
            }
        });
    };
    UserSetupComponent.prototype.onNew = function () {
        this.userId = '';
        this.onClear();
        this.userService.user = {};
    };
    UserSetupComponent.prototype.onClear = function () {
        this.clearObject(this.userId);
    };
    UserSetupComponent.prototype.clearObject = function (id) {
        this.userForm.reset();
        this.userForm.controls['userCode'].setValue(id);
        this.userForm.controls['active'].setValue(true);
    };
    UserSetupComponent.prototype.onBackToList = function () {
        this.onNew();
        this.route.navigate(['/main/user/user-list']);
    };
    UserSetupComponent.prototype.focusElement = function (eleString, nextString, type) {
        var _a;
        if (type == "autocomplete") {
            if (this.userForm.controls['' + eleString + ''].value == null) {
                return;
            }
        }
        if (type == "option") {
            if (this.userForm.controls['' + eleString + ''].value == null) {
                return;
            }
        }
        (_a = document.querySelector("#" + nextString)) === null || _a === void 0 ? void 0 : _a.focus();
    };
    //block auto submit 
    UserSetupComponent.prototype.handleEnter = function (event) {
        var eleString = event.srcElement.id;
        if (eleString !== 'btnSave') {
            return false;
        }
        return true;
    };
    UserSetupComponent = __decorate([
        core_1.Component({
            selector: 'app-user-setup',
            templateUrl: './user-setup.component.html',
            styleUrls: ['./user-setup.component.css']
        })
    ], UserSetupComponent);
    return UserSetupComponent;
}());
exports.UserSetupComponent = UserSetupComponent;
