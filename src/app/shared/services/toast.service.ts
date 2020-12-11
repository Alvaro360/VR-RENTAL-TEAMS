import {Injectable} from '@angular/core';
import {ToastrConfig, ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService,
              private translateService: TranslateService) {
  }

  async success(message: string, title?: string, toastConfig?: ToastrConfig): Promise<void> {
    const messageTranslated = await this.translateService.get(message).toPromise();
    const titleTranslated = title && this.translateService.instant(title);
    this.toastr.success(messageTranslated, titleTranslated, toastConfig);
  }

  async error(message: string, title?: string, toastConfig?: ToastrConfig): Promise<void> {
    const messageTranslated = await this.translateService.get(message).toPromise();
    const titleTranslated = title && this.translateService.instant(title);
    this.toastr.error(messageTranslated, titleTranslated, toastConfig);
  }

  async info(message: string, title?: string, toastConfig?: ToastrConfig): Promise<void> {
    const messageTranslated = await this.translateService.get(message).toPromise();
    const titleTranslated = title && this.translateService.instant(title);
    this.toastr.info(messageTranslated, titleTranslated, toastConfig);
  }

  async warning(message: string, title?: string, toastConfig?: ToastrConfig): Promise<void> {
    const messageTranslated = await this.translateService.get(message).toPromise();
    const titleTranslated = title && this.translateService.instant(title);
    this.toastr.warning(messageTranslated, titleTranslated, toastConfig);
  }

}
