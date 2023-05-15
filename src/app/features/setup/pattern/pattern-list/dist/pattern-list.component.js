"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PatternListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var PatternListComponent = /** @class */ (function () {
    function PatternListComponent(patternService, commonService, toastService) {
        var _this = this;
        this.patternService = patternService;
        this.commonService = commonService;
        this.toastService = toastService;
        this.patterns = [];
        this.displayedColumn = ['position', 'code', 'despEng', 'despMyan', 'factor'];
        this.isMobile = false;
        this.patterns = [];
        this.dataSource = new table_1.MatTableDataSource(this.patterns);
        this.patternService.patterns.subscribe(function (data) {
            _this.dataSource.data = data;
        });
        this.commonService.isMobile$.subscribe(function (data) {
            _this.isMobile = data;
        });
    }
    PatternListComponent.prototype.ngOnInit = function () {
        this.getPatternData();
    };
    PatternListComponent.prototype.getPatternData = function () {
        var _this = this;
        this.patternService.getPattern().subscribe({
            next: function (patterns) {
                _this.patterns = patterns;
                _this.dataSource = new table_1.MatTableDataSource(_this.patterns);
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    PatternListComponent.prototype.getRowData = function (row) {
        this.patternService._pattern = row;
        if (this.isMobile) {
            this.commonService.getCurrentObject(true);
        }
        else {
            this.commonService.getCurrentObject(false);
        }
    };
    PatternListComponent = __decorate([
        core_1.Component({
            selector: 'app-pattern-list',
            templateUrl: './pattern-list.component.html',
            styleUrls: ['./pattern-list.component.css']
        })
    ], PatternListComponent);
    return PatternListComponent;
}());
exports.PatternListComponent = PatternListComponent;
