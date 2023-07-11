"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SessionComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SessionComponent = /** @class */ (function () {
    function SessionComponent(route, sessionService, dialogRef) {
        this.route = route;
        this.sessionService = sessionService;
        this.dialogRef = dialogRef;
        this.sessions = [];
        this.sessionControl = new forms_1.FormControl(null);
        // this.dialogRef.disableClose = true
    }
    SessionComponent.prototype.ngOnInit = function () {
        this.getSession();
    };
    SessionComponent.prototype.ngOnDestroy = function () {
        this.dialogRef.close(this.session);
    };
    SessionComponent.prototype.getSession = function () {
        var _this = this;
        this.sessionService.getAllSession().subscribe({
            next: function (sessions) {
                _this.sessions = sessions;
            },
            error: function (err) {
                console.trace(err);
            }
        });
    };
    //get session data on selection 
    SessionComponent.prototype.getSelectedSession = function () {
        if (this.sessionControl.value != null) {
            this.session = this.sessionControl.value;
            this.route.navigate(['/main']);
            this.dialogRef.close(this.session);
        }
    };
    //get session data on Enter
    SessionComponent.prototype.getSessonData = function (event) {
        if (this.sessionControl.value == null) {
            return;
        }
        this.session = this.sessionControl.value;
        this.route.navigate(['/main']);
        this.dialogRef.close(this.session);
    };
    SessionComponent = __decorate([
        core_1.Component({
            selector: 'app-session',
            templateUrl: './session.component.html',
            styleUrls: ['./session.component.css']
        })
    ], SessionComponent);
    return SessionComponent;
}());
exports.SessionComponent = SessionComponent;
