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
var table_1 = require("@angular/material/table");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(route, dialog, userService, toastService, commonService) {
        var _this = this;
        this.route = route;
        this.dialog = dialog;
        this.userService = userService;
        this.toastService = toastService;
        this.commonService = commonService;
        this.displayedColumn = ["position", "name", "short"];
        this.isMobile = false;
        this.user = {};
        this.dataSource = new table_1.MatTableDataSource(this.userList);
        this.userService.users.subscribe(function (data) {
            _this.dataSource.data = data;
        });
        this.commonService.isMobile$.subscribe(function (data) {
            _this.isMobile = data;
        });
    }
    UserListComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    UserListComponent.prototype.onRowdblClicked = function (params) {
        this.userService.user = params;
        if (this.isMobile) {
            // this.route.navigate(['/main/user/user-setup'])
            this.commonService.getCurrentObject(true);
        }
        else {
            this.commonService.getCurrentObject(false);
        }
    };
    //get userList
    UserListComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser().subscribe(function (userData) {
            {
                _this.userList = userData;
                _this.dataSource = new table_1.MatTableDataSource(_this.userList);
            }
        });
    };
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
