"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpdGroupSetupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var OpdGroupSetupComponent = /** @class */ (function () {
    function OpdGroupSetupComponent(opdService, commonService, toastService, fb) {
        var _this = this;
        this.opdService = opdService;
        this.commonService = commonService;
        this.toastService = toastService;
        this.fb = fb;
        this.opdGroup = {};
        this.subscription = this.commonService.isMobileObj$.subscribe(function (data) {
            _this.opdGroupId = null;
            if (data == false) {
                if (_this.opdService._opdGroup) {
                    _this.opdGroup = _this.opdService._opdGroup;
                    _this.opdGroupId = _this.opdGroup.groupId;
                    _this.initializeFormData(_this.opdGroup);
                }
            }
        });
    }
    OpdGroupSetupComponent.prototype.ngOnInit = function () {
        this.initializeForm();
    };
    OpdGroupSetupComponent.prototype.initializeForm = function () {
        this.opdGroupForm = this.fb.group({
            groupName: ['', forms_1.Validators.required],
            locationId: ['']
        });
    };
    OpdGroupSetupComponent.prototype.initializeFormData = function (data) {
        console.log(data.groupName);
        this.opdGroupForm.get('groupName').patchValue(data.groupName);
        // this.opdGroupForm.get('locationId').patchValue("")
    };
    OpdGroupSetupComponent.prototype.saveOpdGroup = function (data) {
        var opdGroup = {
            groupId: this.opdGroupId,
            groupName: data.groupName,
            locationId: data.locationId,
            status: true
        };
        console.log(opdGroup);
        this.opdService.saveOpdGroup(opdGroup).subscribe({
            next: function (opdGroup) {
                console.log("saved");
                console.log(opdGroup);
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    __decorate([
        core_1.ViewChild('reactiveForm', { static: true })
    ], OpdGroupSetupComponent.prototype, "reactiveForm");
    OpdGroupSetupComponent = __decorate([
        core_1.Component({
            selector: 'app-opd-group-setup',
            templateUrl: './opd-group-setup.component.html',
            styleUrls: ['./opd-group-setup.component.css']
        })
    ], OpdGroupSetupComponent);
    return OpdGroupSetupComponent;
}());
exports.OpdGroupSetupComponent = OpdGroupSetupComponent;
