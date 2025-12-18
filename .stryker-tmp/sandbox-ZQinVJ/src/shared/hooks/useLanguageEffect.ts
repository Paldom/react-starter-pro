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
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
export function useLanguageEffect() {
  if (stryMutAct_9fa48("265")) {
    {}
  } else {
    stryCov_9fa48("265");
    const {
      i18n
    } = useTranslation();
    useEffect(() => {
      if (stryMutAct_9fa48("266")) {
        {}
      } else {
        stryCov_9fa48("266");
        const applyLanguageAttributes = () => {
          if (stryMutAct_9fa48("267")) {
            {}
          } else {
            stryCov_9fa48("267");
            document.documentElement.lang = stryMutAct_9fa48("270") ? i18n.resolvedLanguage && 'en' : stryMutAct_9fa48("269") ? false : stryMutAct_9fa48("268") ? true : (stryCov_9fa48("268", "269", "270"), i18n.resolvedLanguage || (stryMutAct_9fa48("271") ? "" : (stryCov_9fa48("271"), 'en')));
            document.documentElement.dir = i18n.dir(); // "ltr" | "rtl"
          }
        };
        applyLanguageAttributes();
        i18n.on(stryMutAct_9fa48("272") ? "" : (stryCov_9fa48("272"), 'languageChanged'), applyLanguageAttributes);
        return () => {
          if (stryMutAct_9fa48("273")) {
            {}
          } else {
            stryCov_9fa48("273");
            i18n.off(stryMutAct_9fa48("274") ? "" : (stryCov_9fa48("274"), 'languageChanged'), applyLanguageAttributes);
          }
        };
      }
    }, stryMutAct_9fa48("275") ? [] : (stryCov_9fa48("275"), [i18n]));
  }
}