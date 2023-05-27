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


  dataSource:MatTableDataSource<PaymentType>
  displayedColumn:string[]=['position','description']
  
  constructor(
    private payService: PaymentService,
    private commonService: CommonServiceService, private toastService: ToastService,
  ) {

  }

  ngOnInit(): void {

  }

  getPayment() {
    this.payService.getPayment().subscribe({
      next: payments => {
        this.payments = payments
      },
      error: err => {
        console.trace(err)
      }
    })
  }

}
