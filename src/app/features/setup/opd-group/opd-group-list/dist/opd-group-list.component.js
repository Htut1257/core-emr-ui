"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpdGroupListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var OpdGroupListComponent = /** @class */ (function () {
    function OpdGroupListComponent(opdService, commonServie) {
        var _this = this;
        this.opdService = opdService;
        this.commonServie = commonServie;
        this.opdGroups = [];
        this.displayedColumn = ["group"];
        this.dataSource = new table_1.MatTableDataSource(this.opdGroups);
        this.opdService.opdGroups.subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    OpdGroupListComponent.prototype.ngOnInit = function () {
        this.getOpdGroup();
    };
    OpdGroupListComponent.prototype.getOpdGroup = function () {
        var _this = this;
        console.log("called");
        this.opdService.getOpdGroup().subscribe({
            next: function (opdGroup) {
                _this.opdGroups;
                _this.dataSource = new table_1.MatTableDataSource(_this.opdGroups);
                console.log(opdGroup);
            },
            error: function (err) {
            }
        });
    };
    OpdGroupListComponent.prototype.getGroupRow = function (group) {
        this.opdService._opdGroup = group;
        this.commonServie.getCurrentObject(false);
    };
    OpdGroupListComponent = __decorate([
        core_1.Component({
            selector: 'app-opd-group-list',
            templateUrl: './opd-group-list.component.html',
            styleUrls: ['./opd-group-list.component.css']
        })
    ], OpdGroupListComponent);
    return OpdGroupListComponent;
}());
exports.OpdGroupListComponent = OpdGroupListComponent;
