import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastEvent, EventType } from '../../model/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastEvents!: Observable<ToastEvent>
  private _toastEvents = new Subject<ToastEvent>();
  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  //show success message box
  showSuccessToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: EventType.Success,
    })
  }

  //show info message box
  showInfoToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: EventType.Info,
    });
  }

  //show warning message box
  showWarningToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: EventType.Warning,
    });
  }

  //show error message box
  showErrorToast(title: string, message: string) {
    this._toastEvents.next({
      message,
      title,
      type: EventType.Error,
    });
  }

}
