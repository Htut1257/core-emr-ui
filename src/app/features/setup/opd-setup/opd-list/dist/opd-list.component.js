"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OpdListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var OpdListComponent = /** @class */ (function () {
    function OpdListComponent(opdService, commonServie, dialog) {
        var _this = this;
        this.opdService = opdService;
        this.commonServie = commonServie;
        this.dialog = dialog;
        this.opdGroups = [];
        this.displayedColumn = ["group"];
        this.dataSource = new table_1.MatTableDataSource(this.opdGroups);
        this.opdService.opdGroups.subscribe(function (data) {
            _this.dataSource.data = data;
        });
    }
    OpdListComponent.prototype.ngOnInit = function () {
        this.getOpdGroup();
    };
    OpdListComponent.prototype.getOpdGroup = function () {
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
    OpdListComponent.prototype.getGroupRow = function (group) {
        this.opdService._opdGroup = group;
        this.commonServie.getCurrentObject(false);
    };
    OpdListComponent = __decorate([
        core_1.Component({
            selector: 'app-opd-list',
            templateUrl: './opd-list.component.html',
            styleUrls: ['./opd-list.component.css']
        })
    ], OpdListComponent);
    return OpdListComponent;
}());
exports.OpdListComponent = OpdListComponent;
