import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LoaderService} from '@modules/core/services/loader.service';
import {ApiService} from '@services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HttpAuthorizationInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService,
              private apiService: ApiService) {}

  public intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith('/')) {
      return handler.handle(request);
    }

    this.activateLoader(request);
    request = this.setBackUrl(request);
    request = this.setLanguage(request);
    // request = this.setSecurity(request);

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
    /* switch (error.status) {
      case 400:
        this.toastService.error(error.error || error, RVB_ERROR_HTTP_${error.status});
        break;
      case 401:
        this.toastService.error(error.error || error, RVB_ERROR_HTTP_${error.status});
        this.router.navigate['/login'];
        break;
      case 404:
        this.loaderService.stop();
        this.toastService.error(error.error || error, RVB_ERROR_HTTP_${error.status});
        break;
      case 0:
        this.toastService.error(error.message, RVB_ERROR_HTTP_${error.status});
        break;
      default:
        this.toastService.error(error.error || error, RVB_ERROR_HTTP_${error.status});
    }

    this.activateLoader(request, false);*/
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
      // const language = this.translate.currentLang;
      const params = request.params.set('lang', 'es');
      request = request.clone({params});
    }

    return request;
  }

  /* setSecurity(request: HttpRequest<any>): HttpRequest<any> {
    if (!request.url.includes('.pdf')) {
      const headers = new HttpHeaders({'Authorization': 'Basic ' + this.loginService.getAuthorization()});
      return request.clone({headers, withCredentials: true});
    }
  }*/
}