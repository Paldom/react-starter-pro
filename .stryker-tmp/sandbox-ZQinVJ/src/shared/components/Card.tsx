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
import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
export type CardProps = HTMLAttributes<HTMLDivElement>;
export const Card = forwardRef<HTMLDivElement, CardProps>(stryMutAct_9fa48("230") ? () => undefined : (stryCov_9fa48("230"), ({
  className,
  ...props
}, ref) => <div ref={ref} className={cn(stryMutAct_9fa48("231") ? "" : (stryCov_9fa48("231"), 'rounded-lg border bg-card text-card-foreground shadow-sm'), className)} {...props} />));
Card.displayName = stryMutAct_9fa48("232") ? "" : (stryCov_9fa48("232"), 'Card');
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(stryMutAct_9fa48("233") ? () => undefined : (stryCov_9fa48("233"), ({
  className,
  ...props
}, ref) => <div ref={ref} className={cn(stryMutAct_9fa48("234") ? "" : (stryCov_9fa48("234"), 'flex flex-col space-y-1.5 p-6'), className)} {...props} />));
CardHeader.displayName = stryMutAct_9fa48("235") ? "" : (stryCov_9fa48("235"), 'CardHeader');
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({
  className,
  children,
  ...props
}, ref) => {
  if (stryMutAct_9fa48("236")) {
    {}
  } else {
    stryCov_9fa48("236");
    if (stryMutAct_9fa48("239") ? false : stryMutAct_9fa48("238") ? true : stryMutAct_9fa48("237") ? children : (stryCov_9fa48("237", "238", "239"), !children)) {
      if (stryMutAct_9fa48("240")) {
        {}
      } else {
        stryCov_9fa48("240");
        return null;
      }
    }
    return <h3 ref={ref} className={cn(stryMutAct_9fa48("241") ? "" : (stryCov_9fa48("241"), 'text-2xl font-semibold leading-none tracking-tight'), className)} {...props}>
        {children}
      </h3>;
  }
});
CardTitle.displayName = stryMutAct_9fa48("242") ? "" : (stryCov_9fa48("242"), 'CardTitle');
export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(stryMutAct_9fa48("243") ? () => undefined : (stryCov_9fa48("243"), ({
  className,
  ...props
}, ref) => <div ref={ref} className={cn(stryMutAct_9fa48("244") ? "" : (stryCov_9fa48("244"), 'p-6 pt-0'), className)} {...props} />));
CardContent.displayName = stryMutAct_9fa48("245") ? "" : (stryCov_9fa48("245"), 'CardContent');