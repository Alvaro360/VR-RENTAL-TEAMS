import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEnGb from '@angular/common/locales/en-GB';
import localeFr from '@angular/common/locales/fr';
import localeEsAr from '@angular/common/locales/es-AR';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {localeKeyLong, localeKeyLongToShort, localeKeyShort} from '../constants/i18n.constants';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initI18nConfig(localeKeyLongLanguage: string): void {
  switch (localeKeyLongLanguage) {
    case localeKeyLong.ES:
      registerLocaleData(localeEs);
      break;
    case localeKeyLong.AR:
      registerLocaleData(localeEsAr);
      break;
    case localeKeyLong.FR:
      registerLocaleData(localeFr);
      break;
    case localeKeyLong.ENGB:
    default:
      registerLocaleData(localeEnGb);
  }
}

export function getCurrentLocaleKeyShort(): string {
  const vrLocaleLong = window['VictoryRoad'].acl.userProfile.culture;
  if (!vrLocaleLong ) {
    return localeKeyShort.ENGB;
  }

  return localeKeyLongToShort[vrLocaleLong ];
}

export function getCurrentLocaleKeyLong(): string {
  const vrLocaleLong = window['VictoryRoad'].acl.userProfile.culture;
  if (!vrLocaleLong ) {
    return localeKeyLong.ENGB;
  }

  return vrLocaleLong ;
}
