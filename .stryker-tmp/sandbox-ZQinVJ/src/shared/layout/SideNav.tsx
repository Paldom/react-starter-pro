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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings } from 'lucide-react';
import { useTranslation } from '@/i18n/client';
import { cn } from '@/shared/lib/utils';
import { useUIStore } from '@/shared/store/ui';
export const SideNav = memo(() => {
  if (stryMutAct_9fa48("298")) {
    {}
  } else {
    stryCov_9fa48("298");
    const {
      t
    } = useTranslation();
    const pathname = usePathname();
    const sidebarCollapsed = useUIStore(stryMutAct_9fa48("299") ? () => undefined : (stryCov_9fa48("299"), state => state.sidebarCollapsed));
    const navItems = [{
      to: '/',
      label: t('nav.dashboard'),
      icon: LayoutDashboard
    }, {
      to: '/settings',
      label: t('nav.settings'),
      icon: Settings
    }] as const;
    return <aside className={cn(stryMutAct_9fa48("300") ? "" : (stryCov_9fa48("300"), 'flex flex-col border-r bg-background transition-all duration-300'), sidebarCollapsed ? stryMutAct_9fa48("301") ? "" : (stryCov_9fa48("301"), 'w-16') : stryMutAct_9fa48("302") ? "" : (stryCov_9fa48("302"), 'w-64'))}>
      <nav className="flex-1 space-y-1 p-4" aria-label="Main navigation">
        {navItems.map(item => {
          if (stryMutAct_9fa48("303")) {
            {}
          } else {
            stryCov_9fa48("303");
            const isActive = stryMutAct_9fa48("306") ? pathname !== item.to : stryMutAct_9fa48("305") ? false : stryMutAct_9fa48("304") ? true : (stryCov_9fa48("304", "305", "306"), pathname === item.to);
            const Icon = item.icon;
            return <Link key={item.to} href={item.to} className={cn(stryMutAct_9fa48("307") ? "" : (stryCov_9fa48("307"), 'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors'), isActive ? stryMutAct_9fa48("308") ? "" : (stryCov_9fa48("308"), 'bg-primary text-primary-foreground') : stryMutAct_9fa48("309") ? "" : (stryCov_9fa48("309"), 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'))} aria-current={isActive ? stryMutAct_9fa48("310") ? "" : (stryCov_9fa48("310"), 'page') : undefined}>
              <Icon className="h-5 w-5 flex-shrink-0" aria-hidden />
              {stryMutAct_9fa48("313") ? !sidebarCollapsed || <span>{item.label}</span> : stryMutAct_9fa48("312") ? false : stryMutAct_9fa48("311") ? true : (stryCov_9fa48("311", "312", "313"), (stryMutAct_9fa48("314") ? sidebarCollapsed : (stryCov_9fa48("314"), !sidebarCollapsed)) && <span>{item.label}</span>)}
            </Link>;
          }
        })}
      </nav>
    </aside>;
  }
});
SideNav.displayName = stryMutAct_9fa48("315") ? "" : (stryCov_9fa48("315"), 'SideNav');