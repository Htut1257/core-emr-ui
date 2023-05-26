"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckboxRenderer = void 0;
var core_1 = require("@angular/core");
var CheckboxRenderer = /** @class */ (function () {
    function CheckboxRenderer() {
    }
    CheckboxRenderer.prototype.refresh = function (params) {
        //throw new Error('Method not implemented.');
        return true;
    };
    CheckboxRenderer.prototype.agInit = function (params) {
        this.params = params;
    };
    CheckboxRenderer.prototype.checkedHandler = function (event) {
        var checked = event.target.checked;
        var colId = this.params.column.colId;
        this.params.node.setDataValue(colId, checked);
    };
    CheckboxRenderer = __decorate([
        core_1.Component({
            selector: 'checkbox-renderer',
            template: "\n    <input \n      type=\"checkbox\" \n      (click)=\"checkedHandler($event)\"\n      [checked]=\"params.value\"\n    />\n"
        })
    ], CheckboxRenderer);
    return CheckboxRenderer;
}());
exports.CheckboxRenderer = CheckboxRenderer;
