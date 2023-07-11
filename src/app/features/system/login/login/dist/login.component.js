"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var session_component_1 = require("../session/session.component");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, userService, machineService, commonService, formBuilder, dialog) {
        this.route = route;
        this.userService = userService;
        this.machineService = machineService;
        this.commonService = commonService;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.projObj = {};
        this.isLoading = false;
        this.user = {};
        this.userService.logOutUser();
        localStorage.removeItem('core-emr');
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.initializeForm();
        this.getIpAddress();
    };
    //initialize From 
    LoginComponent.prototype.initializeForm = function () {
        this.userForm = this.formBuilder.group({
            userName: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    };
    //get ip address of client machine
    LoginComponent.prototype.getIpAddress = function () {
        var _this = this;
        this.machineService.getIpAddress().subscribe(function (data) {
            _this.machine = data;
            console.log(_this.machine);
        });
    };
    LoginComponent.prototype.getMachineId = function (model) {
        return this.machineService.getMachine(model);
    };
    //get user data to login
    LoginComponent.prototype.loginUser = function (userData) {
        var _this = this;
        this.isLoading = true;
        if (this.userForm.invalid) {
            return;
        }
        var user = userData;
        this.userService.loginUser(user.userName, user.password).subscribe({
            next: function (data) {
                _this.user = data;
                console.log(_this.user);
                if (_this.user == null) {
                    _this.clearForm();
                    document.querySelector("#name").focus();
                    return;
                }
                _this.getMachineId(_this.machine).subscribe({
                    next: function (machine) {
                        _this.projObj.userId = _this.user.userCode;
                        _this.projObj.machineId = machine.machineId;
                        _this.projObj.doctorId = _this.user.doctorId;
                        if (_this.user.doctorId) {
                            _this.projObj.sessionId = '0';
                            _this.setProjObj(_this.projObj);
                            _this.route.navigate(['/main/opd/doctor-entry']);
                        }
                        else {
                            _this.openSession();
                        }
                    },
                    error: function (err) {
                        _this.isLoading = false;
                        console.trace(err);
                    }
                });
            },
            error: function (err) {
                _this.isLoading = false;
                console.trace(err);
            }
        });
    };
    //clear form 
    LoginComponent.prototype.clearForm = function () {
        this.isLoading = false;
        this.userForm.reset();
        this.reactiveForm.resetForm();
    };
    LoginComponent.prototype.focusElement = function (eleString, nextString, type) {
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
    LoginComponent.prototype.handleEnter = function (event) {
        var eleString = event.srcElement.id;
        if (eleString !== 'login') {
            return false;
        }
        return true;
    };
    LoginComponent.prototype.openSession = function () {
        var _this = this;
        this.dialog.open(session_component_1.SessionComponent, {
            disableClose: false,
            data: {
                'title': 'Appointment Search',
                'status': '-'
            }
        }).afterClosed().subscribe(function (data) {
            _this.isLoading = false;
            if (data == undefined) {
                return;
            }
            _this.projObj.doctorId = '0';
            _this.projObj.sessionId = data.sessionId;
            _this.setProjObj(_this.projObj);
            _this.route.navigate(['/main']);
        });
    };
    //set proj id obj
    LoginComponent.prototype.setProjObj = function (data) {
        localStorage.setItem('core-emr', JSON.stringify(data));
    };
    __decorate([
        core_1.ViewChild('reactiveForm', { static: true })
    ], LoginComponent.prototype, "reactiveForm");
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
