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
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
type Theme = 'light' | 'dark';
type UIState = {
  sidebarCollapsed: boolean;
  theme: Theme;
  toggleSidebar: () => void;
  setTheme: (theme: Theme) => void;
};
export const useUIStore = create<UIState>()(devtools(subscribeWithSelector(stryMutAct_9fa48("324") ? () => undefined : (stryCov_9fa48("324"), set => stryMutAct_9fa48("325") ? {} : (stryCov_9fa48("325"), {
  sidebarCollapsed: stryMutAct_9fa48("326") ? true : (stryCov_9fa48("326"), false),
  theme: stryMutAct_9fa48("327") ? "" : (stryCov_9fa48("327"), 'light'),
  toggleSidebar: stryMutAct_9fa48("328") ? () => undefined : (stryCov_9fa48("328"), () => set(stryMutAct_9fa48("329") ? () => undefined : (stryCov_9fa48("329"), state => stryMutAct_9fa48("330") ? {} : (stryCov_9fa48("330"), {
    sidebarCollapsed: stryMutAct_9fa48("331") ? state.sidebarCollapsed : (stryCov_9fa48("331"), !state.sidebarCollapsed)
  })))),
  setTheme: stryMutAct_9fa48("332") ? () => undefined : (stryCov_9fa48("332"), theme => set(stryMutAct_9fa48("333") ? {} : (stryCov_9fa48("333"), {
    theme
  })))
}))), stryMutAct_9fa48("334") ? {} : (stryCov_9fa48("334"), {
  name: stryMutAct_9fa48("335") ? "" : (stryCov_9fa48("335"), 'UIStore')
})));