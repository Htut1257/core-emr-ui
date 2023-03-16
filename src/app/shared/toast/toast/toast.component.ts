import { Component, OnInit, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EventType } from 'src/app/core/model/toast.model';
import { fromEvent, take } from 'rxjs';
import { Toast } from 'bootstrap'
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  @Input()
  type!: EventType;

  @Input()
  title!: string;

  @Input()
  message!: string;

  toast!: Toast;
  constructor() { }

  ngOnInit(): void {
    this.show()
  }

  //show message box
  show() {
    this.toast = new Toast(
      this.toastEl.nativeElement,
      this.type === EventType.Error
        ? {
          autohide: false,
        }
        : {
          delay: 5000,
        }
    );

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  //close message box
  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }

}
