import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 400:
              this.handle400Error(error);
              break;
            case 401:
              this.handle401Error(error);
              break;
            case 404:
              this.handle404Error(error);
              break;
            case 500:
              this.handle500Error(error);
              break;
            default:
              this.handleDefaultError(error);
              break;
          }
        }
        throw error;
      })
    )
  }

  private handleDefaultError(error: HttpErrorResponse) {
    console.log(error);  
    return this.toastr.error("Something unexpected went wrong");
  }

  private handle401Error(error: HttpErrorResponse) {
    return this.toastr.error("Unauthorised", error.status.toString());
  }

  private handle404Error(error: HttpErrorResponse) {
    return this.router.navigateByUrl("/not-found");
  }

  private handle500Error(error: HttpErrorResponse) {
    const navigationExtras: NavigationExtras = { state: { error: error.error } };
    this.router.navigateByUrl("/server-error", navigationExtras);
  }

  private handle400Error(error: HttpErrorResponse) {
    if (error.error && error.error.errors) {
      const modelStateErrors: string[] = Object.values(error.error.errors).flat().map((value: unknown) => String(value));
      modelStateErrors.forEach((errorDescription: string) => {
        this.toastr.error(errorDescription, 'Error');
      });
    } else {
      this.toastr.error('An unexpected error occurred.', 'Error');
    }
  }
  
  

  private handle400Errors(error: HttpErrorResponse) {
    if (error.error.errors) {
      const modelStateErrors = [];
      for (const key in error.error.errors) {
        if (error.error.errors[key]) {
          modelStateErrors.push(error.error.errors[key])
        }
      }
      throw modelStateErrors.flat();
    }
    else {
      this.toastr.error(error.error, error.status.toString());
    }
  }
}


