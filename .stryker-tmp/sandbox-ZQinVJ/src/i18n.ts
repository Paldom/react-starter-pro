// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
void i18n.use(HttpBackend) // load /locales/{{lng}}/{{ns}}.json over HTTP
.use(LanguageDetector) // detect user language
.use(initReactI18next) // bind i18next to React
.init(stryMutAct_9fa48("186") ? {} : (stryCov_9fa48("186"), {
  // what languages you actually ship:
  supportedLngs: stryMutAct_9fa48("187") ? [] : (stryCov_9fa48("187"), [stryMutAct_9fa48("188") ? "" : (stryCov_9fa48("188"), 'en'), stryMutAct_9fa48("189") ? "" : (stryCov_9fa48("189"), 'hu')]),
  fallbackLng: stryMutAct_9fa48("190") ? "" : (stryCov_9fa48("190"), 'en'),
  // where JSON files live
  backend: stryMutAct_9fa48("191") ? {} : (stryCov_9fa48("191"), {
    loadPath: stryMutAct_9fa48("192") ? "" : (stryCov_9fa48("192"), '/locales/{{lng}}/{{ns}}.json')
  }),
  // reduce 404s like /en-US/... if you only serve plain 'en' or 'hu'
  load: stryMutAct_9fa48("193") ? "" : (stryCov_9fa48("193"), 'languageOnly'),
  // default namespace
  ns: stryMutAct_9fa48("194") ? [] : (stryCov_9fa48("194"), [stryMutAct_9fa48("195") ? "" : (stryCov_9fa48("195"), 'common')]),
  defaultNS: stryMutAct_9fa48("196") ? "" : (stryCov_9fa48("196"), 'common'),
  // useful while wiring things up
  debug: stryMutAct_9fa48("199") ? import.meta.env.MODE !== 'development' : stryMutAct_9fa48("198") ? false : stryMutAct_9fa48("197") ? true : (stryCov_9fa48("197", "198", "199"), import.meta.env.MODE === (stryMutAct_9fa48("200") ? "" : (stryCov_9fa48("200"), 'development'))),
  // not needed for React; it already escapes
  interpolation: stryMutAct_9fa48("201") ? {} : (stryCov_9fa48("201"), {
    escapeValue: stryMutAct_9fa48("202") ? true : (stryCov_9fa48("202"), false)
  })
}));

// Export for TypeScript
export const defaultNS = stryMutAct_9fa48("203") ? "" : (stryCov_9fa48("203"), 'common');
export const resources = {
  en: {
    common: {
      app: {
        title: ''
      },
      nav: {
        dashboard: '',
        settings: ''
      },
      dashboard: {
        title: '',
        subtitle: '',
        loading: '',
        error: '',
        totalRevenue: '',
        subscriptions: '',
        sales: '',
        activeUsers: '',
        monthlyOverview: ''
      },
      settings: {
        title: '',
        subtitle: '',
        loading: '',
        loadError: '',
        profileSettings: '',
        name: '',
        email: '',
        notifications: '',
        validation: {
          nameRequired: '',
          emailInvalid: ''
        },
        updateSuccess: '',
        updateError: '',
        saveChanges: '',
        saving: ''
      },
      common: {
        loading: '',
        error: ''
      }
    }
  }
} as const;
export { default } from 'i18next';