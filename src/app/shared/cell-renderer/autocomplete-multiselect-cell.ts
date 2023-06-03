import { Component, AfterViewInit, ViewChild, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { AutocompleteService } from 'src/app/core/services/autocomplete-service/autocomplete.service';
import { PatternService } from 'src/app/core/services/pattern-service/pattern.service';
@Component({
    selector: 'auto-complete',
    encapsulation: ViewEncapsulation.None,
    host: {
        style: `position: absolute;
					left: 0px; 
					top: 0px;
					background-color: transparant;
					` },
    template: ` 
		<input #input [id]="'autoText'"
			[(ngModel)]="inputValue"
			(ngModelChange)="processDataInput($event)"
			style=" height: 28px; font-weight: 400; font-size: 12px;"
			[style.width]="params.column.actualWidth + 'px'">
		<ag-grid-angular
			style="font-weight: 150;" 
			[style.height]="gridHeight + 'px'"
			[style.width]="gridWidth + 'px'"
			class="ag-theme-balham"
			[rowData]="rowData" 
			[columnDefs]="columnDefs"
			(gridReady)="onGridReady($event)"
			(rowClicked)="rowClicked($event)">
		</ag-grid-angular>
	`
})

export class AutocompleteCellMultiSelect implements ICellEditorAngularComp, AfterViewInit {

    // variables for agGrid
    public params: any;
    public gridApi: any;
    public rowData: any;
    public columnDefs: [{}];
    public rowSelection: string = 'single';
    public columnFilter: any;
    // variables for component
    public returnObject: boolean;
    public cellValue: string;
    public filteredRowData: any;
    public inputValue: string;
    public apiEndpoint: string;
    public gridHeight: number = 315;
    public gridWidth: number = 500;
    public useApi: boolean;
    public propertyName: string;
    public isCanceled: boolean = true;
    public selectedObject: any = {}

    @ViewChild("input") input: ElementRef;

    constructor(
        private autoService: AutocompleteService, private patternService: PatternService,
    ) {

    }
    columnObject: any;

    ngAfterViewInit() {
        window.setTimeout(() => {
            if (this.inputValue == this.cellValue) {
                this.input.nativeElement.select();
            } else {
                this.input.nativeElement.focus();
            }
            if (this.inputValue && !this.useApi) this.updateFilter();
        })
    }

    // ICellEditorAngularComp functions
    agInit(params: any): void {
        this.params = params;
        //to get witch field to use
        console.log(params)
        this.columnObject = params.colDef.field
        if (!params.rowData) {
            this.apiEndpoint = params.apiEndpoint;
            this.useApi = true;
            this.rowData = [{}]
        } else {
            this.rowData = params.rowData;
        }
        if (params.gridHeight) this.gridHeight = params.gridHeight;
        if (params.gridWidth) this.gridWidth = params.gridWidth;
        this.columnDefs = params.columnDefs;

        this.propertyName = params.propertyRendered;
        if (this.columnObject == "patternObj") {
            this.gridWidth = 200
        } else if (this.columnObject == "examinationObj") {
            this.gridWidth = 300
        }
        this.cellValue = params.value[this.propertyName];
        this.returnObject = params.returnObject;
        if (!params.charPress) {
            if (this.cellValue) this.inputValue = this.cellValue;
        } else {
            this.inputValue = params.charPress;
        }
        this.getApiData(params.charPress).subscribe(data => {
            this.rowData = data;
        });
    }

    getValue(): any {
        if (!this.returnObject) return this.selectedObject[this.propertyName];
        let data: any = [
            {
                desc: "testing ",
                id: "6464907f52eef633b8c45ea3"
            }, {
                desc: "testing 1",
                id: "6464907f52eef633b8c45ea3"
            }
        ]
        return data;
    }
    isPopup(): boolean {
        return true;
    }
    isCancelAfterEnd(): boolean {
        return this.isCanceled
    }

    // ag-Grid functions
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.columnFilter = this.gridApi.getFilterInstance(this.propertyName);
    }

    // component functions
    rowClicked(params) {
        this.selectedObject = params.data;
        this.isCanceled = false;
        this.params.api.stopEditing();
    }

    rowConfirmed() {
        if (this.gridApi.getSelectedRows()[0]) {
            this.selectedObject = this.gridApi.getSelectedRows()[0];
            this.isCanceled = false;
        }
        this.params.api.stopEditing();
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event) {
        event.stopPropagation();
        if (event.keyCode >= 66 && event.keyCode <= 90 || event.key == "Backspace") {
            document.querySelector<HTMLInputElement>(`#autoText`)?.focus()
        }
        if (event.key == "Escape") {
            this.params.api.stopEditing();
            return false;
        }
        if (event.key == "Enter" || event.key == "Tab") {
            this.rowConfirmed();
            return false;
        }
        if (event.key == "ArrowUp" || event.key == "ArrowDown") {
            this.navigateGrid();
            return false;
        }
        return true
    }

    processDataInput(event) {

        if (this.useApi) {
            this.columnFilter = this.gridApi.getFilterInstance(this.propertyName);
            if (event.length == 0) this.gridApi.setRowData();
            if (event.length >= 1) {
                this.getApiData(event).subscribe(data => {
                    this.rowData = data;
                });
            };
            // if (event.length > 2) {
            //     this.getApiData(event).subscribe(data => {
            //         this.rowData = data;
            //     });
            // }
        } else {
            this.updateFilter();
        }
    }

    getApiData(filter) {
        if (this.columnObject == "cityObject") {
            return this.autoService.getTreatmentData(filter)
        } else if (this.columnObject == "examinationObj") {
            return this.autoService.getExaminationData(filter)
        } else if (this.columnObject == "patternObj") {
            // return this.autoService.getTreatmentData(filter)
            return this.patternService.getPattern()
        }
        else {
            return this.autoService.getTreatmentData(filter)
        }
        // return this.httpClient.get(this.apiEndpoint + this.toQueryString(filter));
    }

    toQueryString(filter) {
        return "?" + this.propertyName + "=" + filter;
    }

    updateFilter() {
        this.columnFilter.setModel({
            type: 'startsWith',
            filter: this.inputValue,
        });
        this.columnFilter.onFilterChanged();
        if (this.gridApi.getDisplayedRowAtIndex(0)) {
            this.gridApi.getDisplayedRowAtIndex(0).setSelected(true);
            this.gridApi.ensureIndexVisible(0, 'top');
        } else {
            this.gridApi.deselectAll();
        }
    }

    navigateGrid() {
        if (this.gridApi.getFocusedCell() == null || this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex) == null) { // check if no cell has focus, or if focused cell is filtered
            this.gridApi.setFocusedCell(this.gridApi.getDisplayedRowAtIndex(0).rowIndex, this.propertyName);
            this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex).setSelected(true);
        } else {
            this.gridApi.setFocusedCell(this.gridApi.getFocusedCell().rowIndex, this.propertyName);
            this.gridApi.getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex).setSelected(true);
        }
    }

}