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
import { useQueryClient } from '@tanstack/react-query';
import { useGetUserSettings, useUpdateUserSettings, getGetUserSettingsQueryKey } from '@/shared/api/generated/settings/settings';
import type { UserSettings } from '@/shared/api/generated/models';
export function useUserSettingsQuery() {
  if (stryMutAct_9fa48("107")) {
    {}
  } else {
    stryCov_9fa48("107");
    return useGetUserSettings();
  }
}
export function useUpdateUserSettingsMutation() {
  if (stryMutAct_9fa48("108")) {
    {}
  } else {
    stryCov_9fa48("108");
    const queryClient = useQueryClient();
    const mutation = useUpdateUserSettings(stryMutAct_9fa48("109") ? {} : (stryCov_9fa48("109"), {
      mutation: stryMutAct_9fa48("110") ? {} : (stryCov_9fa48("110"), {
        onSuccess: () => {
          if (stryMutAct_9fa48("111")) {
            {}
          } else {
            stryCov_9fa48("111");
            void queryClient.invalidateQueries(stryMutAct_9fa48("112") ? {} : (stryCov_9fa48("112"), {
              queryKey: getGetUserSettingsQueryKey()
            }));
          }
        }
      })
    }));
    return stryMutAct_9fa48("113") ? {} : (stryCov_9fa48("113"), {
      ...mutation,
      mutate: stryMutAct_9fa48("114") ? () => undefined : (stryCov_9fa48("114"), (data: UserSettings) => mutation.mutate(stryMutAct_9fa48("115") ? {} : (stryCov_9fa48("115"), {
        data
      }))),
      mutateAsync: stryMutAct_9fa48("116") ? () => undefined : (stryCov_9fa48("116"), (data: UserSettings) => mutation.mutateAsync(stryMutAct_9fa48("117") ? {} : (stryCov_9fa48("117"), {
        data
      })))
    });
  }
}