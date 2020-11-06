import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {localeKeyShort} from '../constants/i18n.constants';
import {initI18nConfig} from '../config/i18n.config';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor(private translate: TranslateService) {
  }

  setLang() {
    this.translate.setDefaultLang(localeKeyShort.DEFAULT);
    this.translate.use(localeKeyShort.DEFAULT);
    initI18nConfig(localeKeyShort.DEFAULT);
  }
}
