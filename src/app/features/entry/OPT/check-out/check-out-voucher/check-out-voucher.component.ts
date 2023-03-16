import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions, SelectionChangedEvent, ColDef } from 'ag-grid-community';
import { CheckOutService } from 'src/app/core/services/check-out-service/check-out.service';
@Component({
  selector: 'app-check-out-voucher',
  templateUrl: './check-out-voucher.component.html',
  styleUrls: ['./check-out-voucher.component.css']
})
export class CheckOutVoucherComponent implements OnInit {
  checkOut: any
  //for check out table
  gridOptionsCheckOut: GridOptions
  gridApiCheckOut: any
  gridColumnApiCheckOut: any

  //for payment table
  gridOptionsPayment: GridOptions
  gridApiPayment: any
  gridColumnApiPayment: any

  defaultColDef: any
  columns: any
  rows: any

  constructor(private route: Router, private checkService: CheckOutService) {
    if (this.checkService.checkOut != undefined) {
      this.checkOut = this.checkService.checkOut
    }
    this.defaultColDef = {
      resizable: true,
    };
    this.initCheckOutTable();
    this.initPaymentTable();
  }

  ngOnInit(): void {

  }

  initCheckOutTable() {
    this.columns = [
      { headerName: "Code", field: "code", editable: true, resizeable: true },
      { headerName: "Description", field: "desp", editable: true },
      { headerName: "Exp Date", field: "expDate", editable: true },
      { headerName: "Qty", field: "qty", editable: true },
      { headerName: "Price", field: "price", editable: true },
      { headerName: "Discount", field: "discount", editable: true },
      { headerName: "Amount", field: "amount", editable: true },
    ]
    this.rows = [
      { code: 1, desp: 'test', expDate: '01/02/2023', qty: 5, price: 1000, discount: 5, amount: 5000 },
      { code: 1, desp: 'test', expDate: '01/02/2023', qty: 5, price: 1000, discount: 5, amount: 5000 },
      { code: 1, desp: 'test', expDate: '01/02/2023', qty: 5, price: 1000, discount: 5, amount: 5000 }
    ]
    this.gridOptionsCheckOut = <GridOptions>{
      enableCellEditingOnBackspace: true,
      columnDefs: this.columns,
      animateRows: true,
      rowData: this.rows,
      defaultColDef: {
        resizable: true
      }
    };
  }

  initPaymentTable() {
    this.columns = [
      { field: 'type', headerName: 'Payment Type', editable: true },
      { field: 'price', headerName: 'Amount', editable: true },
    ]
    this.rows = [
      { type: 'Toyota', price: 35000 },
      { type: 'Ford', price: 32000 },
      { type: 'Porsche', price: 72000 },
    ]
    this.gridOptionsPayment = <GridOptions>{
      enableCellEditingOnBackspace: true,
      columnDefs: this.columns,
      animateRows: true,
      rowData: this.rows,
      defaultColDef: {
        resizable: true
      }
    };
  }

  onGridReady(params) {
    console.log(params)
    this.gridApiCheckOut = params.api;
    this.gridColumnApiCheckOut = params.columnApi;
    this.gridApiCheckOut.sizeColumnsToFit();

    
  }

  onGridReadyPay(params) {
    this.gridApiPayment = params.api;
    this.gridColumnApiPayment = params.columnApi;
   this.gridApiPayment.sizeColumnsToFit();
  }

  cellEditingStarted(event) {

  }


  cellEditingStopped(event) {
    console.log(event)
    this.gridApiCheckOut.applyTransaction({ add: [{}] })
    let row = event.rowIndex + 1

    var firstEditCol = event.columnApi.getAllDisplayedColumns()[0];
    console.log(row + "::" + event.rowIndex)
    this.gridApiCheckOut.ensureIndexVisible(0)
    this.gridApiCheckOut.ensureColumnVisible(firstEditCol);
    this.gridApiCheckOut.setFocusedCell(row, firstEditCol);

  }

  //get single row data
  getRowData() {
    var rowNode = this.gridApiCheckOut.getRenderedNodes()//.rowData
    console.log(rowNode)
  }

  //get the current changed data
  onSelectionChanged(event: SelectionChangedEvent) {
    const selectedData = this.gridApiCheckOut.getSelectedRows();
    console.log('Selection Changed', event);
  }

  addNewRow() {
    alert("ok")
  }

}
