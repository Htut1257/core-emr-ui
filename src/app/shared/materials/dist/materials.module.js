"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MaterialsModule = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var common_1 = require("@angular/common");
//material Modules
var sidenav_1 = require("@angular/material/sidenav");
var divider_1 = require("@angular/material/divider");
var list_1 = require("@angular/material/list");
var toolbar_1 = require("@angular/material/toolbar");
var menu_1 = require("@angular/material/menu");
var tooltip_1 = require("@angular/material/tooltip");
var progress_bar_1 = require("@angular/material/progress-bar");
var table_1 = require("@angular/material/table");
var sort_1 = require("@angular/material/sort");
var card_1 = require("@angular/material/card");
var forms_1 = require("@angular/forms");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var checkbox_1 = require("@angular/material/checkbox");
var button_1 = require("@angular/material/button");
var icon_1 = require("@angular/material/icon");
var datepicker_1 = require("@angular/material/datepicker");
var tabs_1 = require("@angular/material/tabs");
var stepper_1 = require("@angular/material/stepper");
var expansion_1 = require("@angular/material/expansion");
var core_3 = require("@angular/material/core");
var dialog_1 = require("@angular/material/dialog");
var autocomplete_1 = require("@angular/material/autocomplete");
var Modules = [
    core_2.MatRippleModule,
    sidenav_1.MatSidenavModule,
    divider_1.MatDividerModule,
    list_1.MatListModule,
    toolbar_1.MatToolbarModule,
    menu_1.MatMenuModule,
    tooltip_1.MatTooltipModule,
    progress_bar_1.MatProgressBarModule,
    table_1.MatTableModule,
    sort_1.MatSortModule,
    card_1.MatCardModule,
    forms_1.FormsModule,
    forms_1.ReactiveFormsModule,
    form_field_1.MatFormFieldModule,
    input_1.MatInputModule,
    select_1.MatSelectModule,
    checkbox_1.MatCheckboxModule,
    button_1.MatButtonModule,
    icon_1.MatIconModule,
    datepicker_1.MatDatepickerModule,
    tabs_1.MatTabsModule,
    stepper_1.MatStepperModule,
    expansion_1.MatExpansionModule,
    core_3.MatNativeDateModule,
    dialog_1.MatDialogModule,
    autocomplete_1.MatAutocompleteModule,
];
var MaterialsModule = /** @class */ (function () {
    function MaterialsModule() {
    }
    MaterialsModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                common_1.CommonModule,
                Modules
            ],
            exports: [
                Modules
            ]
        })
    ], MaterialsModule);
    return MaterialsModule;
}());
exports.MaterialsModule = MaterialsModule;
