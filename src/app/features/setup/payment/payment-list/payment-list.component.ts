import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentType } from 'src/app/core/model/payment.model';
import { PaymentService } from 'src/app/core/services/payment-service/payment.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: PaymentType[] = []
  payment: PaymentType
  isMobile: boolean = false

  dataSource: MatTableDataSource<PaymentType>
  displayedColumn: string[] = ['position', 'description']

  constructor(
    private payService: PaymentService,
    private commonService: CommonServiceService, private toastService: ToastService,
  ) {
    this.dataSource=new MatTableDataSource<PaymentType>(this.payments)
    this.payService.payments.subscribe(data => {
      this.dataSource.data = data
    })
  }

  ngOnInit(): void {
    this.getPayment();
  }

  getPayment() {
    this.payService.getPayment().subscribe({
      next: payments => {
        this.payments = payments
        this.dataSource.data=this.payments
      },
      error: err => {
        console.trace(err)
      }
    })
  }

  getRowData(data:PaymentType){
    console.log(data)
    this.payService._payment=data
    this.commonService.getCurrentObject(false);
  }

}
