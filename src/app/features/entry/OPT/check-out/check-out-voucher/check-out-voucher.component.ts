import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions, SelectionChangedEvent, ColDef, ColumnApi, GridApi } from 'ag-grid-community';
import * as moment from 'moment';
import { CheckOutService } from 'src/app/core/services/check-out-service/check-out.service';
@Component({
  selector: 'app-check-out-voucher',
  templateUrl: './check-out-voucher.component.html',
  styleUrls: ['./check-out-voucher.component.css']

})
export class CheckOutVoucherComponent implements OnInit {
  //#region grid variable

  checkOut: any[] = []

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


  //#endregion grid variable

  voucherDate: FormControl = new FormControl('')
  todayDate: string = moment(new Date(), 'MM/DD/YYYY').format('YYYY-MM-DD')

  constructor(private route: Router, private checkService: CheckOutService) {
    if (this.checkService.checkOut != undefined) {
      this.checkOut = this.checkService.checkOut
    }


  }

  ngOnInit(): void {
    this.getCheckOutData()
    this.getPaymentData()
    this.initializeGridTable()
    this.voucherDate.patchValue(this.todayDate)
  }

  initializeGridTable() {
    this.checkOutGridOption = {
      columnDefs: this.checkOutColumnDef,
      rowData: this.checkOutRow,
      suppressScrollOnNewData: false,
      onGridReady(event) {
        this.checkOutApi = event.api
        this.checkOutColumn = event.columnApi
        this.checkOutApi.sizeColumnsToFit()
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

  getCheckOutData() {
    this.checkOutColumnDef = [
      {
        headerName: 'Code',
        field: 'itemId',
        width: 50,
        editable: true,
      },
      {
        headerName: 'Description',
        field: 'itemObject',
        width: 100,
        editable: true,
      },
      {
        headerName: 'Pattern',
        field: 'pattern',
        width: 50,
        editable: true,
      },
      {
        headerName: 'Day',
        field: 'day',
        width: 30,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: 'Qty',
        field: 'qty',
        width: 30,
        editable: true,
        type: 'rightAligned'
      },
      {
        headerName: 'Price',
        field: 'price',
        width: 50,
        editable: true,
        type: 'rightAligned'
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
      {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      }, {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      },
      {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      },
      {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      },
      {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      }, {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      },
      {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      }, {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      }
      , {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      }
      , {
        itemId: '', itemObject: '', pattern: '', day: 0, qty: 0, price: 0, discount: 0, amount: 0, remark: ''
      }

    ]
  }

  getPaymentData() {
    this.paymentColumnDef = [

    ]
    this.paymentRow = [

    ]
  }

  //get single row data
  getRowData() {
    // var rowNode = this.gridApiCheckOut.getRenderedNodes()//.rowData
    // console.log(rowNode)
  }

  //get the current changed data
  onSelectionChanged(event: SelectionChangedEvent) {
    //const selectedData = this.gridApiCheckOut.getSelectedRows();
    console.log('Selection Changed', event);
  }



}
