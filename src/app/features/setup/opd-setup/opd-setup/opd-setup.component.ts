import { Component, OnInit } from '@angular/core';
import { Observable, startWith, map } from 'rxjs'
import { Grid, ColDef, GridOptions, GridApi, ColumnApi, Column } from "ag-grid-community";
import { FormControl } from '@angular/forms';
import { OpdGroup, OpdCategory } from 'src/app/core/model/opd.model';
import { OpdService } from 'src/app/core/services/opd-service/opd.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-opd-setup',
  templateUrl: './opd-setup.component.html',
  styleUrls: ['./opd-setup.component.css']
})
export class OpdSetupComponent implements OnInit {

  //#region grid variable

  opdCategoryApi: GridApi
  opdCategoryColumn: ColumnApi
  opdCategoryGridOption: GridOptions
  opdCategoryColumnDef: any
  opdCategoryRow: any

  //endregion grid variable
  opdGroup: OpdGroup
  opdGroups: OpdGroup[] = []
  opdCategory: OpdCategory[] = []

  opdGroupControl = new FormControl('')
  filteredGroup: Observable<OpdGroup[]>;
  opdType: string = ''
  constructor(
    private opdService: OpdService,
    private commonService: CommonServiceService, private toastService: ToastService,
  ) {

  }

  ngOnInit(): void {
    this.getOpdGroup()
    this.autocompleteFilter()
    this.getOpdCategoryData()
    this.initializeGridTable()

  }

  initializeGridTable() {
    this.opdCategoryGridOption = {
      columnDefs: this.opdCategoryColumnDef,
      rowData: this.opdCategoryRow,
      suppressScrollOnNewData: false,
      onCellClicked(event) {
        console.log(event)

      },
    }

  }

  onGridReadyOpdCategory(params) {
    this.opdCategoryApi = params.api
    this.opdCategoryColumn = params.columnApi
    this.opdCategoryApi.sizeColumnsToFit()
  }

  getOpdCategoryData() {
    this.opdCategoryColumnDef = [
      {
        headerName: "Description",
        field: "catName",
        width: 100,
        editable: true
      },
    ]
    this.opdCategoryRow = [
      this.emptyOpdCategory()
    ]
  }

  cellEditingStopped(event) {
    let columnField = event.colDef.field
    let rowData = event.data
    let row = event.rowIndex
    var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
    if (this.opdCategoryApi.getFocusedCell()) {
      //  this.opdCategoryApi.setFocusedCell(event.rowIndex, event.colDef.field);
      this.addNewRowtoTable(row, firstEditCol, this.opdCategoryApi, rowData, this.opdCategory, this.emptyOpdCategory());
     
    }
  }

  emptyOpdCategory(): OpdCategory {
    return {
      catId: '',
      catName: '',
      groupId: '',
      migId: '',
      opdAccCode: '',
      ipdAccCode: '',
      depCode: '',
      srvF1AccId: '',
      srvF2AccId: '',
      srvF3AccId: '',
      srvF4AccId: '',
      srvF5AccId: '',
      payableAccId: '',
      payableAccOpt: '',
      srvF2RefDr: '',
      srvF3RefDr: '',
      ipdDeptCode: '',
      userCode: '',
      expense: false,
      status: false,
    }
  }

  addNewRowtoTable(rowIndex: any, firstColumn: any, gridApi: GridApi, rowData: Object, lstRow: any[], rowObj: Object) {
    let currentRow = lstRow[rowIndex]
    if (currentRow != undefined) {
      currentRow = rowData
    }
    let totalRow = gridApi.getDisplayedRowCount() - 1
    if (totalRow == rowIndex) {
      let curentData = rowData
      lstRow.push(curentData)
      gridApi.applyTransaction({
        add: [rowObj]
      })
      gridApi.ensureIndexVisible(0)
      gridApi.ensureColumnVisible(firstColumn);
      gridApi.setFocusedCell(rowIndex + 1, firstColumn);
    }
  }

  autocompleteFilter() {
    this.filteredGroup = this.opdGroupControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filterOpdGroup(value) : this.opdGroups.slice()))
    )
  }

  getOpdGroup() {
    this.opdService.getOpdGroup().subscribe({
      next: opdGroups => {
        this.opdGroups = opdGroups
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  opdGroupDisplayFn(item: any) {
    return item ? item.groupName : '';
  }

  //filter data for autocomplete
  private _filterOpdGroup(value: any): any {
    let filterValue = value
    if (value.groupName != null) {
      filterValue = value.groupName.toLowerCase()
    } else {
      filterValue = value.toLowerCase()
    }
    return this.opdGroups.filter(data => data.groupName.toLowerCase().includes(filterValue));
  }

  getOpdCategory(type: string, value: string) {
    this.opdService.getOpdCategorybyFilter(type, value).subscribe({
      next: opdCategory => {
        this.opdCategory = opdCategory
        // let rowData = this.opdCategory.reduce(function (filtered: any, option: any) {
        //   let someValue = {
        //     description: option.catName
        //   }
        //   filtered.push(someValue)
        //   return filtered
        // }, [])
        this.opdCategoryRow = this.opdCategory
        if (this.opdCategoryRow.length < 1) {
          console.log("empty")
          this.opdCategoryRow.push(this.emptyOpdCategory())
          this.opdCategoryGridOption.api.setRowData(this.opdCategoryRow)
        }
        else {
          console.log("not empty")
          this.opdCategoryGridOption.api.setRowData(this.opdCategoryRow)
          this.opdCategoryApi.applyTransaction({
            add: [
              this.emptyOpdCategory()
            ]
          })
        }
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //get selected data from autocomplete
  getOpdGroupData(event) {
    this.opdType = 'groupId'
    this.opdGroup = event.option.value
    if (this.opdGroup) {
      this.getOpdCategory(this.opdType, this.opdGroup.groupId);
    }
  }


  saveOpdCategory(data: OpdCategory) {
    this.opdService.saveOpdCategory(data).subscribe({
      next: opdCategory => {

      },
      error: err => {
        console.trace(err)
      }
    })
  }

}
