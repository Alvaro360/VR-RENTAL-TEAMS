import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {localeKeyShort} from '../constants/i18n.constants';
import {initI18nConfig} from '../config/i18n.config';
import {LANGUAGE_KEY} from '@modules/core/constants/translate.constants';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  LANGUAGE_KEY = LANGUAGE_KEY;

  constructor(private translate: TranslateService) {
  }

  setLang() {
    const lang = localStorage.getItem(this.LANGUAGE_KEY);
    if (!lang) {
      this.translate.setDefaultLang(localeKeyShort.DEFAULT);
      this.translate.use(localeKeyShort.DEFAULT);
      initI18nConfig(localeKeyShort.DEFAULT);
      localStorage.setItem(this.LANGUAGE_KEY, this.translate.currentLang);
    } else {
      this.updateLang(lang);
    }
  }

  updateLang(lang: string) {
    if (lang === 'es') {
      this.translate.setDefaultLang(localeKeyShort.ES);
      this.translate.use(localeKeyShort.ES);
      initI18nConfig(localeKeyShort.ES);
      localStorage.setItem(this.LANGUAGE_KEY, localeKeyShort.ES);
    } else {
      this.translate.setDefaultLang(localeKeyShort.ENGB);
      this.translate.use(localeKeyShort.ENGB);
      initI18nConfig(localeKeyShort.ENGB);
      localStorage.setItem(this.LANGUAGE_KEY, localeKeyShort.ENGB);
    }
  }
}
