"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserListComponent = void 0;
var core_1 = require("@angular/core");
var user_setup_component_1 = require("../user-setup/user-setup.component");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(route, dialog, userService, toastService) {
        this.route = route;
        this.dialog = dialog;
        this.userService = userService;
        this.toastService = toastService;
        this.columnDefs = [];
        this.domLayout = 'autoHeight';
        this.isMobile = false;
        this.user = {};
        this.columnDefs = this.createColumnDefs();
        this.getScreenSize();
    }
    UserListComponent.prototype.getScreenSize = function () {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrWidth);
        if (parseInt(window.innerWidth.toString()) <= 400) {
            this.isMobile = true;
        }
        else {
            this.isMobile = false;
        }
    };
    UserListComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    //get data ready for grid data
    UserListComponent.prototype.onGridReady = function (params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.api.sizeColumnsToFit();
        params.api.resetRowHeights();
    };
    UserListComponent.prototype.onRowClicked = function (params) {
        console.log('click');
        this.userService.user = params.data;
        if (this.isMobile) {
            this.route.navigate(['/main/user/user-setup']);
        }
    };
    UserListComponent.prototype.onRowdblClicked = function (params) {
        this.userService.user = params.data;
        if (this.isMobile) {
            this.route.navigate(['/main/user/user-setup']);
            return;
        }
        this.userSetupComponent.InitialObject();
    };
    //get userList
    UserListComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (userData) {
            {
                _this.userList = userData;
                var colData_1 = [];
                var objKey = Object.keys(_this.userList[0]);
                objKey.forEach(function (key) { return colData_1.push({ field: key }); });
                //this.columnDefs = colData
                _this.rowData = _this.userList;
                _this.defaultColDef = {
                    enableValue: true,
                    sortable: true,
                    enableRowGroup: true,
                    enablePivot: true,
                    rowSelection: 'multiple',
                    groupSelectsChildren: true
                };
            }
        });
    };
    //define columns
    UserListComponent.prototype.createColumnDefs = function () {
        return [
            //  { "field": "userCode" },
            { "field": "userName" },
            { "field": "userShortName" },
        ];
    };
    __decorate([
        core_1.HostListener('window:resize', ['$event'])
    ], UserListComponent.prototype, "getScreenSize");
    __decorate([
        core_1.ViewChild(user_setup_component_1.UserSetupComponent)
    ], UserListComponent.prototype, "userSetupComponent");
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'app-user-list',
            templateUrl: './user-list.component.html',
            styleUrls: ['./user-list.component.css']
        })
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
