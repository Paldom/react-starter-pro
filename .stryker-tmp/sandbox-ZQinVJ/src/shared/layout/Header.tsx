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
import { memo } from 'react';
import { Menu, User } from 'lucide-react';
import { useTranslation } from '@/i18n/client';
import { Button } from '@/shared/components/Button';
import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher';
import { useUIStore } from '@/shared/store/ui';
export const Header = memo(() => {
  if (stryMutAct_9fa48("294")) {
    {}
  } else {
    stryCov_9fa48("294");
    const toggleSidebar = useUIStore(stryMutAct_9fa48("295") ? () => undefined : (stryCov_9fa48("295"), state => state.toggleSidebar));
    const {
      t
    } = useTranslation();
    return <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" aria-hidden />
        </Button>
        <h1 className="text-xl font-semibold">{t(stryMutAct_9fa48("296") ? "" : (stryCov_9fa48("296"), 'app.title'))}</h1>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" aria-hidden />
          <span className="text-sm font-medium">John Doe</span>
        </div>
      </div>
    </header>;
  }
});
Header.displayName = stryMutAct_9fa48("297") ? "" : (stryCov_9fa48("297"), 'Header');