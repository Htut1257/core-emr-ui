import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest,HttpEvent,HttpResponse } from '@angular/common/http';
import { Observable, map, catchError, finalize } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast-service/toast-service.service';
import { CommonServiceService } from 'src/app/core/services/common-service/common-service.service';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(
    private commonServie: CommonServiceService, private toastService: ToastService
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpRequest<any>> {
    this.commonServie.isProgress.next(true)
    return next.handle(request).pipe(
      finalize(
        () => {
          this.commonServie.isProgress.next(false)
        }
      ),
      catchError((err) => {
        this.commonServie.isProgress.next(false)
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${err.error.message}`;
          this.toastService.showErrorToast('App Error', `${errorMessage}`)
        } else {
          // server-side error
          //errorMessage = ` Code: ${error.status}\nMessage:something wrong with server,please contact the service team`;
          errorMessage = ` Code: ${err.status}\nMessage: ${err.message}`;
          if (err.status === 500) {
            errorMessage = ` Code: ${err.status}\nMessage:something wrong with server,please contact the service team`;
            this.toastService.showErrorToast('App Error', `${errorMessage}`)
          }
        }
        throw new Error(` ${errorMessage}`);
      })
    ).pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
      if (evt instanceof HttpResponse) {
        this.commonServie.isProgress.next(false)
      }
      return evt;
    }));
  }

}
