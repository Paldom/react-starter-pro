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
import axios, { type AxiosRequestConfig } from 'axios';
const instance = axios.create(stryMutAct_9fa48("205") ? {} : (stryCov_9fa48("205"), {
  baseURL: stryMutAct_9fa48("208") ? process.env.NEXT_PUBLIC_API_BASE_URL && '/api' : stryMutAct_9fa48("207") ? false : stryMutAct_9fa48("206") ? true : (stryCov_9fa48("206", "207", "208"), process.env.NEXT_PUBLIC_API_BASE_URL || (stryMutAct_9fa48("209") ? "" : (stryCov_9fa48("209"), '/api'))),
  timeout: 10000
}));
instance.interceptors.request.use(config => {
  if (stryMutAct_9fa48("210")) {
    {}
  } else {
    stryCov_9fa48("210");
    // Only access localStorage on the client side
    if (stryMutAct_9fa48("213") ? typeof window === 'undefined' : stryMutAct_9fa48("212") ? false : stryMutAct_9fa48("211") ? true : (stryCov_9fa48("211", "212", "213"), typeof window !== (stryMutAct_9fa48("214") ? "" : (stryCov_9fa48("214"), 'undefined')))) {
      if (stryMutAct_9fa48("215")) {
        {}
      } else {
        stryCov_9fa48("215");
        const token = localStorage.getItem(stryMutAct_9fa48("216") ? "" : (stryCov_9fa48("216"), 'authToken'));
        if (stryMutAct_9fa48("218") ? false : stryMutAct_9fa48("217") ? true : (stryCov_9fa48("217", "218"), token)) {
          if (stryMutAct_9fa48("219")) {
            {}
          } else {
            stryCov_9fa48("219");
            config.headers.Authorization = stryMutAct_9fa48("220") ? `` : (stryCov_9fa48("220"), `Bearer ${token}`);
          }
        }
      }
    }
    return config;
  }
});
export const customInstance = <T,>(config: AxiosRequestConfig): Promise<T> => {
  if (stryMutAct_9fa48("221")) {
    {}
  } else {
    stryCov_9fa48("221");
    return instance.request<T>(config).then(stryMutAct_9fa48("222") ? () => undefined : (stryCov_9fa48("222"), ({
      data
    }) => data));
  }
};