import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LoaderService} from '@modules/core/services/loader.service';
import {ApiService} from '@services/api.service';
import {LoginService} from '@modules/login/services/login.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ToastService} from '@services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService,
              private apiService: ApiService,
              private translateService: TranslateService,
              private loginService: LoginService,
              private router: Router,
              private toastService: ToastService,
  private toastr: ToastrService) {}

  public intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith('/')) {
      return handler.handle(request);
    }

    this.activateLoader(request);
    request = this.setBackUrl(request);
    request = this.setLanguage(request);
    request = this.setSecurity(request);

    return handler.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = this.interceptResponse(request, event);
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        error = this.interceptErrorResponse(request, error);
        return throwError(error);
      })
    );
  }

  interceptResponse(request: HttpRequest<any>, eventResponse: HttpEvent<any>): HttpEvent<any> {
    this.activateLoader(request, false);
    return eventResponse;
  }

  interceptErrorResponse(request: HttpRequest<any>, error: HttpErrorResponse): HttpErrorResponse {
    switch (error.status) {
      case 400:
        this.toastService.error(error.error);
        break;
      case 401:
        if (!this.loginService.isLoggedIn()) {
          this.toastService.error('VR_INVALID_CREDENTIALS');
        } else {
          this.loginService.logout();
          this.router.navigate(['login']);
        }
        break;
      case 404:
        this.loaderService.stop();
        this.toastService.error(error.error);
        break;
      case 0:
        this.toastService.error(error.message);
        break;
      default:
        this.toastService.error(error.error );
    }

    this.activateLoader(request, false);
    return error;
  }

  activateLoader(request, activateFlag = true): void {
    if (request.method === 'GET') {
      return;
    }

    if (activateFlag) {
      this.loaderService.start();
    } else {
      this.loaderService.stop();
    }
  }

  setBackUrl(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({url: this.apiService.setCompleteUrl(request.url)});
  }

  setLanguage(request: HttpRequest<any>): HttpRequest<any> {
    if (request.method) {
      const language = this.translateService.currentLang;
      const params = request.params.set('lang', language);
      request = request.clone({params});
    }

    return request;
  }

  setSecurity(request: HttpRequest<any>): HttpRequest<any> {
    if (!this.loginService.getAuthorization()) {
      return request;
    }

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthorization()}`});
    return request.clone({headers});
  }
}
