import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs'
import { GridOptions, ColumnApi, GridApi } from 'ag-grid-community';

import { Cashier, CashierHis } from 'src/app/core/model/checkout.model';
import { Location } from 'src/app/core/model/location.model';
import { PaymentType } from 'src/app/core/model/payment.model';
import { DrTreatment, treatmentItem } from 'src/app/core/model/autocomplete-item.model';
import { DoctorTreatment, tableItem } from 'src/app/core/model/doctor-entry.model';
import { Currency } from 'src/app/core/model/currency.model';

import { CheckOutService } from 'src/app/core/services/check-out-service/check-out.service';
import { LocationService } from 'src/app/core/services/location-service/location.service';
import { PaymentService } from 'src/app/core/services/payment-service/payment.service';
import { CurrencyService } from 'src/app/core/services/currency-service/currency.service';
import { UserService } from 'src/app/core/services/user-service/user-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';

import { AutocompleteCell } from 'src/app/shared/cell-renderer/autocomplete-cell';
import { CheckboxRenderer } from 'src/app/shared/cell-renderer/checkbox-cell';
import * as moment from 'moment';
import { User } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-check-out-voucher',
  templateUrl: './check-out-voucher.component.html',
  styleUrls: ['./check-out-voucher.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CheckOutVoucherComponent implements OnInit {
  //#region grid variable

  checkOut: Cashier
  checkOutHis: CashierHis
  checkOutGridOption: GridOptions
  paymentGridOption: GridOptions

  checkOutApi: GridApi
  paymentApi: GridApi

  checkOutColumn: ColumnApi
  paymentColumn: ColumnApi

  checkOutColumnDef: any
  paymentColumnDef: any

  checkOutRow: any
  paymentRow: any

  public frameworkComponents
  drTreatment: DoctorTreatment[] = []

  //#endregion grid variable

  checkOutForm: FormGroup
  @ViewChild("#reactiveForm", { static: true }) reactiveForm: NgForm

  user: User
  payment: any
  payments: PaymentType[] = []
  location: any
  locations: Location[] = []
  currency: any
  currencies: Currency[] = []
  pharmacyDay: any = new FormControl(1)

  todayDate: string = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')
  subscription: Subscription
  constructor(
    private route: Router, private checkService: CheckOutService,
    private locationService: LocationService, private payService: PaymentService,
    private currencyService: CurrencyService, private userService: UserService,
    private commonService: CommonServiceService, private toastService: ToastService,
    public formBuilder: FormBuilder,
  ) {
    this.commonService.isMobileObj$.subscribe(data => {
      if (data == false) {
        this.initCheckOutData()
      }
    })

    this.user = this.userService.getUserValue()

    this.frameworkComponents = {
      autoComplete: AutocompleteCell,
      checkbox: CheckboxRenderer
    }
  }

  ngOnInit(): void {
    this.initialzeForm()

    this.getCheckOutData()
    this.getPaymentData()
    this.initializeGridTable()

    this.getPayment()
    this.getLocation()
    this.getCurency()

    this.checkOutForm.controls['pharmacyDay'].valueChanges.pipe(
      map(name => name ? name : '1')
    ).subscribe(data => {
      this.setPharmacyDay(data)
    })

  }

  //initialize Form
  initialzeForm() {
    this.checkOutForm = this.formBuilder.group({
      visitNo: [{ value: '', disabled: true }],
      admissionNo: [{ value: '', disabled: true }],
      regNo: [{ value: '', disabled: true }],
      patientName: [{ value: '', disabled: true }],
      doctorName: [{ value: '', disabled: true }],
      payment: [null, Validators.required],
      location: [null, Validators.required],
      pharmacyDay: [1],
      currency: [null, Validators.required],
      vouTotal: [0],
      tax: [0],
      discountPharmacy: [0],
      discountOpd: [0],
      totalAmount: [{ value: 0, disabled: true }]
    })
  }

  //initialize Form data
  initializeFormData(data: Cashier) {
    this.checkOutForm.patchValue({
      visitNo: data.visitId,
      admissionNo: data.admissionNo ? data.admissionNo : '',
      regNo: data.regNo,
      patientName: data.patientName,
      doctorName: data.drName,
      pharmacyDay: 1,
      vouTotal: 0,
      tax: 0,
      discountPharmacy: 0,
      discountOpd: 0,
      totalAmount: 0
    })
  }

  //get location
  getLocation() {
    this.locationService.getLocation().subscribe({
      next: locations => {
        this.locations = locations
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //get payment
  getPayment() {
    this.payService.getPayment().subscribe({
      next: payments => {
        this.payments = payments
        this.checkOutForm.get('payment').patchValue(this.payments[0])
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //compare payment data with initial data
  comparePayment(pay1: PaymentType, pay2: PaymentType) {
    return pay1 && pay2 ? pay1.paymentTypeId === pay2.paymentTypeId : pay1 === pay2
  }

  //get currency
  getCurency() {
    this.currencyService.getCurrency().subscribe({
      next: currencies => {
        this.currencies = currencies
        this.checkOutForm.get('currency').patchValue(this.currencies[0])
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //compare currency data with initial data
  compareCurrency(c1: Currency, c2: Currency) {
    return c1 && c2 ? c1.currencyCode === c2.currencyCode : c1 === c2
  }

  //initialize data from the selected list
  initCheckOutData() {
    if (this.checkService._checkOut != undefined) {
      this.checkOutHis = this.checkService._checkOut
      this.checkOut = this.checkService._checkOut
      this.initializeFormData(this.checkOut)
      this.renderTreatmentData(this.checkOut.treatments)
    }
  }

  //render data to grid table 
  renderTreatmentData(data: DoctorTreatment[]) {
    this.checkOutRow = data.reduce(function (filtered: any, option: any) {
      var someValue = {
        cityObject: tableItem(option),
        patternObj: option.pattern,
        day: option.days,
        qty: option.qty,
        price: option.remark,
        foc: option.isFOC,
        discount: 0,
        amount: option.fees * option.qty,
        remark: option.remark
      }
      filtered.push(someValue)
      return filtered
    }, [])
    for (let item of this.checkOutRow) {
      this.drTreatment.push(item)
    }
    this.setTotalAmount(this.drTreatment)
    this.checkOutRow.push(this.emptydrTreat())
    this.checkOutGridOption.api.setRowData(this.checkOutRow)
  }

  initializeGridTable() {
    this.checkOutGridOption = {
      columnDefs: this.checkOutColumnDef,
      rowData: this.checkOutRow,
      suppressScrollOnNewData: false,
      defaultColDef: {
        resizable: true
      },
    }

    this.paymentGridOption = {
      columnDefs: this.paymentColumnDef,
      rowData: this.paymentRow,
      suppressScrollOnNewData: false,
      onGridReady(event) {
        this.paymentApi = event.api
        this.paymentColumn = event.columnApi
        this.paymentApi.sizeColumnsToFit()
      },
    }

  }

  onGridReadyCheckOut(params) {
    this.checkOutApi = params.api
    this.checkOutColumn = params.columnApi
    this.checkOutApi.sizeColumnsToFit()
  }

  //column and row defination for check out
  getCheckOutData() {
    this.checkOutColumnDef = [
      {
        headerName: 'Code',
        field: 'cityObject',
        width: 50,
        editable: true,
        cellEditor: 'autoComplete',
        cellEditorParams: {
          'propertyRendered': 'itemId',
          'returnObject': true,
          'columnDefs': [
            { headerName: 'Code', field: 'itemId' },
            { headerName: 'Name', field: 'itemName' },
            { headerName: 'Option', field: 'itemOption' },
            { headerName: 'Type', field: 'itemType' }
          ]
        },
        valueFormatter: params => {
          if (params.value) {
            return params.value.itemId;
          }
          return "";
        },
      },
      {
        headerName: 'Description',
        field: 'cityObject.itemName',
        width: 100,
        editable: true,
      },
      {
        headerName: 'Pattern',
        field: 'patternObj',
        width: 45,
        editable: params => params.data.cityObject.itemOption == "Pharmacy",
        cellEditor: 'autoComplete',
        cellEditorParams: {
          'propertyRendered': 'patternCode',
          'returnObject': true,
          'columnDefs': [
            { headerName: 'Code', field: 'patternCode' },
            { headerName: 'Description', field: 'despEng' },
          ]
        },
        valueFormatter: params => {
          if (params.value) return params.value.patternCode;
          return "";
        },
      },
      {
        headerName: 'Day',
        field: 'day',
        width: 35,
        editable: params => params.data.cityObject.itemOption == "Pharmacy",
        type: 'rightAligned'
      },
      {
        headerName: 'Qty',
        field: 'qty',
        width: 30,
        editable: params => params.data.cityObject.itemOption == "Pharmacy",
        type: 'rightAligned'
      },
      {
        headerName: 'Unit',
        field: 'cityObject.itemUnit',
        width: 35,
        editable: false,
      },
      {
        headerName: 'Price',
        field: 'price',
        width: 50,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: 'Foc',
        field: 'isFOC',
        width: 30,
        cellRendererSelector: (params) => {
          if (params.data.cityObject.itemOption != "Pharmacy") {
            return {
              component: CheckboxRenderer
            }
          } else {
            return undefined
          }
        },
        editable: false,
      },
      {
        headerName: 'Discount',
        field: 'discount',
        width: 50,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: 'Amount',
        field: 'amount',
        width: 50,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: 'Remark',
        field: 'remark',
        width: 100,
        editable: true,
      },
    ]
    this.checkOutRow = [
      this.emptydrTreat()
    ]
  }

  //column and row defination for payment
  getPaymentData() {
    this.paymentColumnDef = [

    ]
    this.paymentRow = [

    ]
  }

  emptydrTreat(): DrTreatment {
    return {
      cityObject: {
        itemOption: '',
        itemType: '',
        itemId: '',
        itemName: '',
        relStr: '',
        fees: 0,
        fees1: 0,
        fees2: 0,
        fees3: 0,
        fees4: 0,
        fees5: 0,
        fees6: 0,
        isPercent: '',
        serviceCost: 0,
        itemUnit: '',
        isFOC: false,
        uniqueId: '',
      },
      patternObj: {
        patternCode: '',
        despEng: '',
        id: '',
        despMM: '',
        factor: 0
      },
      day: this.checkOutForm.get('pharmacyDay').value,
      qty: 0,
      price: 0,
      foc: false,
      discount: 0,
      amount: 0,
      remark: '',
    }
  }

  cellValueChanged(event) {
    let columnField = event.colDef.field
    let rowData = event.data
    let rowIndex = event.rowIndex
    var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
    if (columnField == "isFOC") {
      rowData.amount = rowData.price * rowData.qty
      if (rowData.isFOC == true) {
        rowData.amount = 0
      }
      this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption)
    }
    this.setTotalAmount(this.checkOutRow)
  }

  cellEditingStopped(event) {
    let columnField = event.colDef.field
    let rowData = event.data
    let row = event.rowIndex
    var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
    if (this.checkOutApi.getFocusedCell()) {
      this.checkOutCellEvent(row, firstEditCol, columnField, this.checkOutApi, rowData, this.drTreatment)
    }
    this.setTotalAmount(this.checkOutRow)
  }

  //cell Editing event for Check Out Table
  checkOutCellEvent(rowIndex: any, firstColumn: any, columnField: string, gridApi: GridApi, rowData: Object, lstRow: any[]) {
    let data: any = rowData
    let itemType = data.cityObject.itemOption
    if (columnField == "cityObject") {
      if (data.cityObject.itemId == '') {
        gridApi.setFocusedCell(rowIndex, columnField);
        return
      }

      data.qty = 1
      data.price = data.cityObject.fees
      data.amount = data.price * data.qty

      if (itemType == "Pharmacy") {
        this.checkOutRow[rowIndex] = rowData;
        this.checkOutGridOption.api.setRowData(this.checkOutRow);
        this.addNewRowtoTable(rowIndex, firstColumn, gridApi, rowData, lstRow, this.emptydrTreat())
        this.focusTableCell(rowIndex, "patternObj", gridApi)
        return
      }

      data.day = ''
      this.checkOutRow[rowIndex] = rowData;
      this.checkOutGridOption.api.setRowData(this.checkOutRow);
      this.addNewRowtoTable(rowIndex, firstColumn, gridApi, rowData, lstRow, this.emptydrTreat())
      this.focusTableCell(rowIndex, "price", gridApi)
    }

    if (columnField == "patternObj") {
      if (data.patternObj.patternCode == '') {
        gridApi.setFocusedCell(rowIndex, columnField);
        return
      }

      data.qty = data.patternObj.factor * data.day
      data.amount = data.price * data.qty
      this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption)
      this.focusTableCell(rowIndex + 1, firstColumn, gridApi)
    }

    if (columnField == "day") {
      data.qty = data.patternObj.factor * data.day
      data.amount = data.price * data.qty
      this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption)
    }

    if (columnField == "qty") {
      data.amount = data.price * data.qty
      this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption)
    }

    if (columnField == "price") {
      data.amount = data.price * data.qty
      this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption)
      if (itemType != "Pharmacy" && itemType != '') {
        this.focusTableCell(rowIndex + 1, firstColumn, gridApi)
      }
    }

    if (columnField == "discount") {
      this.setRowDatatoTable(rowIndex, this.checkOutRow, rowData, this.checkOutApi, this.checkOutGridOption)
    }
  }

  //add new row to table
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
    }
  }

  //set Data to Table
  setRowDatatoTable(rowIndex: any, tableRow: any, rowData: Object, gridApi: GridApi, gridOption: GridOptions) {
    tableRow[rowIndex] = rowData;
    gridOption.api.setRowData(tableRow);
    gridApi.applyTransaction({
      add: [this.emptydrTreat()]
    })
  }

  //focusing table cell
  focusTableCell(rowIndex: any, column: any, gridApi: GridApi) {
    gridApi.ensureIndexVisible(0)
    gridApi.ensureColumnVisible(column);
    gridApi.setFocusedCell(rowIndex, column);
  }

  //set nummber of days pharmacy Item
  setPharmacyDay(day: number) {
    for (let item of this.checkOutRow) {
      if (item.cityObject.itemOption == "Pharmacy") {
        item.day = day
        item.qty = day * item.patternObj.factor
        item.amount = item.price * item.qty
      }
    }
    this.checkOutGridOption.api.setRowData(this.checkOutRow);
    this.checkOutApi.applyTransaction({
      add: [this.emptydrTreat()]
    })
    this.setTotalAmount(this.checkOutRow)
  }

  //calculate amount total from table
  setTotalAmount(rowData: any[]) {
    let sumAmount = 0
    rowData.forEach(element => {
      sumAmount += element.amount
    });
    this.checkOutForm.get('vouTotal').patchValue(sumAmount)
    //this.totalAmount = sumAmount
  }

  //save list to mappable obj
  savetoDrTreatment(): DoctorTreatment[] {
    return this.drTreatment.reduce(function (filtered: any, option: any) {
      const item = treatmentItem(option.cityObject)
      var someNewValue = {
        group: item.group,
        subGroup: item.subGroup,
        code: item.code,
        desc: item.desc,
        relStr: item.relStr,
        fees: item.fees,
        fees1: item.fees1,
        fees2: item.fees2,
        fees3: item.fees3,
        fees4: item.fees4,
        fees5: item.fees5,
        fees6: item.fees6,
        isPercent: item.isPercent,
        serviceCost: item.serviceCost,
        itemUnit: item.itemUnit,
        expDate: item.expDate,
        isFOC: item.isFOC,
        uniqueId: item.uniqueId,

        pattern: option.patternObj,
        days: option.day,
        qty: option.qty,
        remark: option.remark,
        amount: option.amount,
      }
      filtered.push(someNewValue);
      return filtered
    }, [])
  }



  // 
  saveCashierData(data: any) {
    this.checkOut.visitDate = moment(new Date(), 'MM/DD/YYYY').format("yyyy-MM-DDThh:mm:ss")
    this.checkOut.reVisitDate = moment(new Date(), 'MM/DD/YYYY').format("yyyy-MM-DDThh:mm:ss")
    this.checkOut.id = null
    this.checkOut.admissionNo = ''

    this.checkOut.locId = data.location.locationId
    this.checkOut.locName = data.location.locationName

    this.checkOut.currId = data.currency.currencyCode
    this.checkOut.currName = data.currency.currencyName

    this.checkOut.payTypeId = data.payment.paymentTypeId
    this.checkOut.payTypeName = data.payment.paymentTypeName

    this.checkOut.treatments = this.savetoDrTreatment()
    this.checkOut.vouTotal = data.vouTotal
    let totalAmount = data.vouTotal - (data.tax + data.discountOpd + data.discountPharmacy)
    this.checkOut.paid = 0
    this.checkOut.balance = totalAmount
    if (data.payment.paymentTypeName == "Cash") {
      this.checkOut.paid = totalAmount
      this.checkOut.balance = 0
    }

    this.checkOut.discP = 0
    this.checkOut.discAmt = 0
    this.checkOut.taxP = 0
    this.checkOut.taxAmt = data.tax
    this.checkOut.maxUniqueId = 0

    this.checkOut.sessionId = null

    this.checkOut.userId = this.user.userCode
    this.checkOut.macId = "20"

  }

  saveCashierHisData(data: any) {
    this.checkOut.id = ''
    this.checkOut.drNotes = ''
    this.checkOut.admissionNo = ''

    this.checkOutHis.locId = data.location.locationId
    this.checkOutHis.locName = data.location.locationName

    this.checkOutHis.currId = data.currency.currencyCode
    this.checkOutHis.currName = data.currency.currencyName

    this.checkOutHis.payTypeId = data.payment.paymentTypeId
    this.checkOutHis.payTypeName = data.payment.paymentTypeName

    this.checkOutHis.treatments = this.savetoDrTreatment()
    this.checkOutHis.vouTotal = data.vouTotal
    let totalAmount = data.vouTotal - (data.tax + data.discountOpd + data.discountPharmacy)
    this.checkOutHis.paid = 0
    this.checkOutHis.balance = totalAmount
    if (data.payment.paymentTypeName == "Cash") {
      this.checkOutHis.paid = totalAmount
      this.checkOutHis.balance = 0
    }

    this.checkOutHis.discP = 0
    this.checkOutHis.discA = 0
    this.checkOutHis.taxP = 0
    this.checkOutHis.taxA = data.tax
    this.checkOutHis.sessionId = null
    this.checkOutHis.saleVouNo = null
    this.checkOutHis.opdVouNo = null
    this.checkOutHis.userId = this.user.userCode
    this.checkOutHis.macId = "20"

  }

  saveCheckOut(data: any) {

    this.saveCashierData(data)
    this.saveCashierHisData(data)
    console.log(this.checkOut)
    return
    this.checkService.saveCheckOut(this.checkOut).subscribe({
      next: checkOut => {
        console.log("mongo completed")
        console.log(checkOut)
        this.checkService.saveCheckoutHistory(this.checkOutHis).subscribe(data => {
          console.log("maria completed")
          console.log(data)
        })
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  //limit input to number
  numberLimit(e: any) {
    var txt = String.fromCharCode(e.which);
    if (!txt.match(/^[0-9-@&#%()]*$/)) { //
      return false;
    }
    return txt
  }

}
