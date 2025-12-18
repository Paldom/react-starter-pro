// @ts-nocheck
'use client';

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
import { useTranslation } from '@/i18n/client';
import { Button } from './Button';
export function LanguageSwitcher() {
  if (stryMutAct_9fa48("250")) {
    {}
  } else {
    stryCov_9fa48("250");
    const {
      i18n
    } = useTranslation();
    const languages = stryMutAct_9fa48("251") ? [] : (stryCov_9fa48("251"), [stryMutAct_9fa48("252") ? {} : (stryCov_9fa48("252"), {
      code: stryMutAct_9fa48("253") ? "" : (stryCov_9fa48("253"), 'en'),
      label: stryMutAct_9fa48("254") ? "" : (stryCov_9fa48("254"), 'English')
    }), stryMutAct_9fa48("255") ? {} : (stryCov_9fa48("255"), {
      code: stryMutAct_9fa48("256") ? "" : (stryCov_9fa48("256"), 'hu'),
      label: stryMutAct_9fa48("257") ? "" : (stryCov_9fa48("257"), 'Magyar')
    })]);
    return <div className="flex gap-2">
      {languages.map(stryMutAct_9fa48("258") ? () => undefined : (stryCov_9fa48("258"), ({
        code,
        label
      }) => <Button key={code} variant={(stryMutAct_9fa48("261") ? i18n.resolvedLanguage !== code : stryMutAct_9fa48("260") ? false : stryMutAct_9fa48("259") ? true : (stryCov_9fa48("259", "260", "261"), i18n.resolvedLanguage === code)) ? stryMutAct_9fa48("262") ? "" : (stryCov_9fa48("262"), 'default') : stryMutAct_9fa48("263") ? "" : (stryCov_9fa48("263"), 'secondary')} size="sm" onClick={stryMutAct_9fa48("264") ? () => undefined : (stryCov_9fa48("264"), () => i18n.changeLanguage(code))}>
          {label}
        </Button>))}
    </div>;
  }
}