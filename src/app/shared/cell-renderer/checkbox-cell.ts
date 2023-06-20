import { Component } from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'checkbox-renderer',
  template: `
    <mat-checkbox
      color="primary"
      (click)="checkedHandler($event)"
      [checked]="params.value">
</mat-checkbox> 
`,
})
export class CheckboxRenderer implements ICellRendererAngularComp {
    refresh(params: ICellRendererParams<any, any>):boolean {
        //throw new Error('Method not implemented.');
        return true
    }
   
    public params: any;

    agInit(params: any): void {
      this.params = params;
    }
  
    checkedHandler(event) {
        let checked = event.target.checked;
        let colId = this.params.column.colId;
        this.params.node.setDataValue(colId, checked);
    }
}
