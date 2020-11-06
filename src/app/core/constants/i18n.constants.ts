const localeKeyLong = {
  ES: 'es-Es',
  ESLT: 'es-Lt',
  CAES: 'ca-Es',
  FR: 'fr-Fr',
  AR: 'ar-Ar',
  OP: 'op-Op',
  ENGB: 'en-Gb',
  DEFAULT: 'es-Es'
};

const localeKeyShort = {
  ES: 'es',
  ESLT: 'lt',
  CAES: 'ca',
  FR: 'fr',
  AR: 'ar',
  OP: 'op',
  ENGB: 'en',
  DEFAULT: 'es'
};

const localeKeyLongToShort = {
  'es-Es': localeKeyShort.ES,
  'es-Lt': localeKeyShort.ESLT,
  'ca-Es': localeKeyShort.CAES,
  'fr-Fr': localeKeyShort.FR,
  'ar-Ar': localeKeyShort.AR,
  'op-Op': localeKeyShort.OP,
  'en-Gb': localeKeyShort.ENGB
};

const localeKeyShortToLong = {
  'es': localeKeyLong.ES,
  'lt': localeKeyLong.ESLT,
  'ca': localeKeyLong.CAES,
  'fr': localeKeyLong.FR,
  'ar': localeKeyLong.AR,
  'op': localeKeyLong.OP,
  'gb': localeKeyLong.ENGB
};

export {
  localeKeyLong,
  localeKeyShort,
  localeKeyLongToShort,
  localeKeyShortToLong
};
