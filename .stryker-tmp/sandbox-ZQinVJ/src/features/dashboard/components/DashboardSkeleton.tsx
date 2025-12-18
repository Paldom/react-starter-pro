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
import { memo } from 'react';
import { Card } from '@/shared/components/Card';
export const DashboardSkeleton = memo(stryMutAct_9fa48("72") ? () => undefined : (stryCov_9fa48("72"), () => <div className="space-y-6">
    <div className="h-8 w-1/4 animate-pulse rounded bg-muted" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from(stryMutAct_9fa48("73") ? {} : (stryCov_9fa48("73"), {
      length: 4
    }), stryMutAct_9fa48("74") ? () => undefined : (stryCov_9fa48("74"), (_, index) => <Card key={stryMutAct_9fa48("75") ? `` : (stryCov_9fa48("75"), `skeleton-${index}`)} className="h-32 animate-pulse bg-muted" aria-hidden />))}
    </div>
    <Card className="h-64 animate-pulse bg-muted" aria-hidden />
  </div>));
DashboardSkeleton.displayName = stryMutAct_9fa48("76") ? "" : (stryCov_9fa48("76"), 'DashboardSkeleton');