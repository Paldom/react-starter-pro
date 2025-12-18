/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
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
import { Button } from '@/shared/components/Button';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
export function AppRouteError() {
  if (stryMutAct_9fa48("277")) {
    {}
  } else {
    stryCov_9fa48("277");
    const navigate = useNavigate();
    const error = useRouteError();
    let message = stryMutAct_9fa48("278") ? "" : (stryCov_9fa48("278"), 'An unexpected error occurred.');
    if (stryMutAct_9fa48("280") ? false : stryMutAct_9fa48("279") ? true : (stryCov_9fa48("279", "280"), isRouteErrorResponse(error))) {
      if (stryMutAct_9fa48("281")) {
        {}
      } else {
        stryCov_9fa48("281");
        message = stryMutAct_9fa48("284") ? error.statusText && `Request failed with status ${error.status}` : stryMutAct_9fa48("283") ? false : stryMutAct_9fa48("282") ? true : (stryCov_9fa48("282", "283", "284"), error.statusText || (stryMutAct_9fa48("285") ? `` : (stryCov_9fa48("285"), `Request failed with status ${error.status}`)));
      }
    } else if (stryMutAct_9fa48("287") ? false : stryMutAct_9fa48("286") ? true : (stryCov_9fa48("286", "287"), error instanceof Error)) {
      if (stryMutAct_9fa48("288")) {
        {}
      } else {
        stryCov_9fa48("288");
        message = error.message;
      }
    }
    return <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/20 p-8 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="max-w-md text-balance text-sm text-muted-foreground">
          {message}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={stryMutAct_9fa48("289") ? () => undefined : (stryCov_9fa48("289"), () => navigate(0))}>Try again</Button>
        <Button variant="outline" onClick={stryMutAct_9fa48("290") ? () => undefined : (stryCov_9fa48("290"), () => navigate(stryMutAct_9fa48("291") ? "" : (stryCov_9fa48("291"), '/'), stryMutAct_9fa48("292") ? {} : (stryCov_9fa48("292"), {
          replace: stryMutAct_9fa48("293") ? false : (stryCov_9fa48("293"), true)
        })))}>
          Go back home
        </Button>
      </div>
    </div>;
  }
}