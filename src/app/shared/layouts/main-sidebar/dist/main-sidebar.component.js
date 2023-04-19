"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainSidebarComponent = void 0;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var MainSidebarComponent = /** @class */ (function () {
    function MainSidebarComponent(route, commonService) {
        this.route = route;
        this.commonService = commonService;
        this.expanded = false;
        this.ariaExpanded = this.expanded;
    }
    MainSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        //define route 
        this.commonService.currentUrl$.subscribe(function (url) {
            if (_this.item.children && url) {
                _this.ariaExpanded = _this.expanded;
            }
        });
    };
    //on select navigation item
    MainSidebarComponent.prototype.onSelectedItem = function (item) {
        var _a;
        if (!item.children || !item.children.length) {
            var uri = (_a = item.route) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            this.route.navigate([uri]);
            this.commonService.openNavigation();
            this.commonService.getTitle(item.displayName);
            return;
        }
        this.expanded = !this.expanded;
    };
    __decorate([
        core_1.Input()
    ], MainSidebarComponent.prototype, "item");
    __decorate([
        core_1.Input()
    ], MainSidebarComponent.prototype, "dept");
    __decorate([
        core_1.HostBinding('attr.aria-expanded')
    ], MainSidebarComponent.prototype, "ariaExpanded");
    MainSidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-main-sidebar',
            templateUrl: './main-sidebar.component.html',
            styleUrls: ['./main-sidebar.component.css'],
            animations: [
                animations_1.trigger('indicatorRotate', [
                    animations_1.state('collapsed', animations_1.style({ transform: 'rotate(0deg)' })),
                    animations_1.state('expanded', animations_1.style({ transform: 'rotate(180deg)' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
                ]),
            ]
        })
    ], MainSidebarComponent);
    return MainSidebarComponent;
}());
exports.MainSidebarComponent = MainSidebarComponent;
