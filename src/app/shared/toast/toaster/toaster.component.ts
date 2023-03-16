import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ToastEvent } from 'src/app/core/model/toast.model';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {
  currentToasts: ToastEvent[] = [];
  constructor(private cdr: ChangeDetectorRef, private toastService: ToastService) {

  }

  ngOnInit(): void {
    this.subscribetoToast()
  }

  //subscribe curent to subject
  subscribetoToast() {
    this.toastService.toastEvents.subscribe(toasts => {
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast)
      this.cdr.detectChanges()
    })
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }

}
