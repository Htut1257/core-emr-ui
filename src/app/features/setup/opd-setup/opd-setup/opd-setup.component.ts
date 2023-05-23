import { Component, OnInit } from '@angular/core';
import { Observable, startWith, map, filter, switchMap } from 'rxjs'
import { Grid, ColDef, GridOptions, GridApi, ColumnApi, Column, CellClickedEvent } from "ag-grid-community";
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { OpdGroup, OpdCategory, OpdServiceModel } from 'src/app/core/model/opd.model';

import { OpdService } from 'src/app/core/services/opd-service/opd.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

import { OpdGroupComponent } from '../../opd-group/opd-group/opd-group.component';
import { CheckboxRenderer } from 'src/app/shared/cell-renderer/checkbox-cell';



@Component({
  selector: 'app-opd-setup',
  templateUrl: './opd-setup.component.html',
  styleUrls: ['./opd-setup.component.css']
})
export class OpdSetupComponent implements OnInit {

  //#region grid variable

  opdCategoryApi: GridApi
  opdServiceApi: GridApi

  opdCategoryColumn: ColumnApi
  opdServiceColumn: ColumnApi

  opdCategoryGridOption: GridOptions
  opdServiceGridOption: GridOptions

  opdCategoryColumnDef: any
  opdCategoryRow: any
  opdServiceColumnDef: any
  opdServiceRow: any

  public frameworkComponentsCheckBox;

  //endregion grid variable

  opdGroup: OpdGroup
  opdGroups: OpdGroup[] = []
  opdCategory: OpdCategory
  opdCategories: OpdCategory[] = []
  opdCategoryId: string = "-"
  opdServiceModel: OpdServiceModel
  opdServices: OpdServiceModel[] = []
  opdServiceId: string = "-"

  opdGroupControl = new FormControl('')
  opdCategoryControl = new FormControl('')
  opdServiceControl = new FormControl('')

  filteredGroup: Observable<OpdGroup[]>;
  filteredCategory: Observable<OpdCategory[]>;
  filteredService: Observable<OpdServiceModel[]>;

  opdType: string = ''



  constructor(
    private opdService: OpdService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public dialog: MatDialog
  ) {
    this.frameworkComponentsCheckBox = {
      checkboxRenderer: CheckboxRenderer,
    }
  }

  ngOnInit(): void {
    this.autocompleteFilter()
    this.getOpdCategoryData()
    this.getOpdServiceData()
    this.initializeGridTable()
  }

  //initialize grid table with data
  initializeGridTable() {
    this.opdCategoryGridOption = {
      columnDefs: this.opdCategoryColumnDef,
      rowData: this.opdCategoryRow,
      suppressScrollOnNewData: false,
      onGridReady(event) {
        this.opdCategoryApi = event.api
        this.opdCategoryColumn = event.columnApi
        this.opdCategoryApi.sizeColumnsToFit()
      },
      onCellClicked: (event: CellClickedEvent) => {
        this.getOpdServicesData(event);
      },
    }

    this.opdServiceGridOption = {
      columnDefs: this.opdServiceColumnDef,
      rowData: this.opdServiceRow,
      suppressScrollOnNewData: false,
    }
  }

  onGridReadyOpdCategory(params: any) {
    console.log("on grid called")
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

  onGridReadyOpdService(params) {
    this.opdServiceApi = params.api
    this.opdServiceColumn = params.columnApi
    this.opdServiceApi.sizeColumnsToFit()
  }

  getOpdServiceData() {
    this.opdServiceColumnDef = [
      {
        headerName: "Description",
        field: "serviceName",
        width: 170,
        editable: true
      },
      {
        headerName: "Fees",
        field: "",
        width: 70,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: "Srv Fee",
        field: "fees1",
        width: 80,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: "Mo Fee ",
        field: "fees2",
        width: 75,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: "Staff Fee",
        field: "fees3",
        width: 85,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: "Teach Fee",
        field: "fees4",
        width: 100,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: "Refer Fee",
        field: "fees6",
        width: 90,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: "Read Fee",
        field: "fees5",
        width: 90,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: "%",
        field: "percent",
        width: 50,
        cellRenderer: "checkboxRenderer"
      },
      {
        headerName: "CFS",
        field: "cfs",
        width: 65,
        cellRenderer: "checkboxRenderer"
      },
      {
        headerName: "Active",
        field: "status",
        width: 70,
        cellRenderer: "checkboxRenderer"
      },
      {
        headerName: "Doctor",
        field: "doctor",
        width: 100,
        editable: true
      },
      {
        headerName: "Cost",
        field: "serviceCost",
        width: 80,
        editable: true,
        type: 'rightAligned'
      },
    ]
    this.opdServiceRow = [ // fees 1 to 5 percent cfs status doctor serviceCost
      this.emptyOpdServiceModel()
      // {
      //   serviceName: '', fees: 0, fees1: 0, fees2: 0, fees3: 0, fees4: 0, fees5: 0,
      //   percent: false, cfs: false, status: false, doctor: '', serviceCost: 0,
      // }
    ]
  }

  changedCell(event) {
    let columnField = event.colDef.field
    let rowData = event.data
    let row = event.rowIndex
    var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
    let tableParams = {
      rowIndex: row,
      firstColumn: firstEditCol,
      gridApi: this.opdCategoryApi,
      rowObj: null
    }
    if (this.opdServiceApi.getFocusedCell()) {
      if (columnField == "status" || columnField == "cfs" || columnField == "percent") {
        tableParams = {
          rowIndex: row,
          firstColumn: firstEditCol,
          gridApi: this.opdServiceApi,
          rowObj: this.emptyOpdServiceModel()
        }
        this.onSaveOpdService(rowData, tableParams)
      }
    }
  }

  cellEditingStopped(event) {
    let columnField = event.colDef.field
    let rowData = event.data
    let row = event.rowIndex
    var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
    let tableParams = {
      rowIndex: row,
      firstColumn: firstEditCol,
      gridApi: this.opdCategoryApi,
      rowObj: null
    }

    if (this.opdCategoryApi.getFocusedCell()) {
      tableParams = {
        rowIndex: row,
        firstColumn: firstEditCol,
        gridApi: this.opdCategoryApi,
        rowObj: this.emptyOpdCategory()
      }
      this.opdCategoryApi.setFocusedCell(event.rowIndex, event.colDef.field);
      if (columnField = "catName") {
        this.saveOpdCategory(rowData, tableParams)
      }
    }

    if (this.opdServiceApi.getFocusedCell()) {
      tableParams = {
        rowIndex: row,
        firstColumn: firstEditCol,
        gridApi: this.opdServiceApi,
        rowObj: this.emptyOpdServiceModel()
      }
      this.onSaveOpdService(rowData, tableParams)
    }

  }

  emptyOpdCategory(): OpdCategory {
    return {
      catId: '',
      catName: '',
      groupId: '',
      migId: 0,
      opdAccCode: null,
      ipdAccCode: null,
      depCode: null,
      srvF1AccId: null,
      srvF2AccId: null,
      srvF3AccId: null,
      srvF4AccId: null,
      srvF5AccId: null,
      payableAccId: null,
      payableAccOpt: null,
      srvF2RefDr: null,
      srvF3RefDr: null,
      ipdDeptCode: null,
      userCode: null,
      expense: false,
      updateStatus: null,
      status: false,
    }
  }

  emptyOpdServiceModel(): OpdServiceModel {
    return {
      serviceId: null,
      serviceName: '',
      catId: '',
      fees: 0,
      fees1: 0,
      cfs: false,
      serviceCode: '',
      status: false,
      migId: 0,
      doctor: '',
      fees2: 0,
      fees3: 0,
      fees4: 0,
      fees5: 0,
      fees6: 0,
      percent: false,
      labGroupId: 0,
      labRemark: '',
      serviceCost: 0
    }
  }

  //filter for autocomplete
  autocompleteFilter() {
    this.filteredGroup = this.opdGroupControl.valueChanges.pipe(
      startWith(''),
      switchMap(name => {
        return name ? this._filterOpdGroup(name) : []
      })

    )

    this.filteredCategory = this.opdCategoryControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filterOpdCategory(value) : this.opdCategories.slice()))
    )

    this.filteredService = this.opdServiceControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filterOpdService(value) : this.opdServices.slice()))
    )
  }

  getOpdGroup(name: string) {
    return this.opdService.getOpdGroup().pipe(
      filter(data => !!data),
      map(item => item.filter(option => option.groupName.toLowerCase().includes(name)))
    )
  }

  opdGroupDisplayFn(item: any) {
    return item ? item.groupName : '';
  }

  //filter data for autocomplete
  private _filterOpdGroup(value: any): Observable<OpdGroup[]> {
    let filterValue = value
    return this.getOpdGroup(filterValue)
  }

  //open dialog of opd group setup
  openOpdGroupDialog() {
    this.dialog.open(OpdGroupComponent, {
      disableClose: false,
      width: '50%',
      height: '50%'
    })
  }

  //get selected data from autocomplete
  getOpdGroupData(event) {
    this.opdType = 'groupId'
    this.opdGroup = event.option.value
    if (this.opdGroup) {
      this.opdServiceGridOption.api.setRowData([])
      this.opdServiceApi.applyTransaction({
        add: [
          this.emptyOpdServiceModel()
        ]
      })
      this.getOpdCategory(this.opdType, this.opdGroup.groupId);
    }
  }

  getOpdCategory(type: string, value: string) {
    this.opdService.getOpdCategorybyFilter(type, value).subscribe({
      next: opdCategory => {

        this.opdCategories = opdCategory

        this.opdCategoryRow = this.opdCategories
        if (this.opdCategoryRow.length < 1) {
          this.opdCategoryRow.push(this.emptyOpdCategory())
          this.opdCategoryGridOption.api.setRowData(this.opdCategoryRow)
        }
        else {
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

  //filter data for autocomplete
  private _filterOpdCategory(value: any): any {
    let filterValue = value
    this.opdType = "catName"
    this.getOpdCategory(this.opdType, value);
    if (value.catName != null) {
      filterValue = value.catName.toLowerCase()
    } else {
      filterValue = value.toLowerCase()
    }
    return this.opdCategories.filter(data => data.catName.toLowerCase().includes(filterValue));
  }

  opdCategoryDisplayFn(item: any) {
    return item ? item.catName : '';
  }

  getOpdService(type: string, value: string) {
    this.opdService.getOpdServicebyFilter(type, value).subscribe({
      next: opdServices => {
        console.log(opdServices)
        this.opdServices = opdServices
        this.opdServiceRow = this.opdServices
        if (this.opdServiceRow.length < 1) {
          this.opdServiceRow.push(this.emptyOpdServiceModel())
          this.opdServiceGridOption.api.setRowData(this.opdServiceRow)
        }
        else {
          this.opdServiceGridOption.api.setRowData(this.opdServiceRow)
          this.opdServiceApi.applyTransaction({
            add: [
              this.emptyOpdServiceModel()
            ]
          })
        }
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //get selected data from Table cell
  getOpdServicesData(event) {
    this.opdType = 'catId'
    this.opdCategory = event.data
    if (this.opdCategory) {
      this.getOpdService(this.opdType, this.opdCategory.catId);
    }
  }

  //filter data for autocomplete
  private _filterOpdService(value: any): any {
    let filterValue = value
    this.opdType = "serviceName"
    this.getOpdService(this.opdType, value);
    if (value.serviceName != null) {
      filterValue = value.serviceName.toLowerCase()
    } else {
      filterValue = value.toLowerCase()
    }
    return this.opdServices.filter(data => data.serviceName.toLowerCase().includes(filterValue));
  }

  opdServiceDisplayFn(item: any) {
    return item ? item.catName : '';
  }

  saveTable(rowIndex: any, firstColumn: any, gridApi: GridApi, rowObj: Object) {
    let totalRow = gridApi.getDisplayedRowCount() - 1
    if (totalRow == rowIndex) {
      gridApi.applyTransaction({
        add: [rowObj]
      })
      gridApi.ensureIndexVisible(0)
      gridApi.ensureColumnVisible(firstColumn);
      gridApi.setFocusedCell(rowIndex + 1, firstColumn);
    }
  }


  saveOpdCategory(data: OpdCategory, TableParams: any) {
    data.groupId = this.opdGroup.groupId
    this.opdService.saveOpdCategory(data).subscribe({
      next: opdCategory => {
        data.catId = opdCategory.catId
        this.opdCategories.push(opdCategory)
        this.saveTable(TableParams.rowIndex, TableParams.firstColumn, TableParams.gridApi, TableParams.rowObj)
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  onSaveOpdService(data: OpdServiceModel, TableParams: any) {

    if (!this.opdCategory) {
      this.toastService.showWarningToast("", "Please Select Opd Category")
      return
    }
    console.log("before")
    console.log(data)
    data.catId = this.opdCategory.catId
    this.opdService.saveOpdService(data).subscribe({
      next: opdService => {
        data.serviceId = opdService.serviceId
        this.opdServices.push(opdService)
        this.saveTable(TableParams.rowIndex, TableParams.firstColumn, TableParams.gridApi, TableParams.rowObj)
      },
      error: err => {
        console.trace(err)
      }
    })
  }


}
