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
import * as React from "react";
import { cn } from "@/lib/utils";
function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (stryMutAct_9fa48("58")) {
    {}
  } else {
    stryCov_9fa48("58");
    return <div data-slot="card" className={cn(stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"), className)} {...props} />;
  }
}
function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (stryMutAct_9fa48("60")) {
    {}
  } else {
    stryCov_9fa48("60");
    return <div data-slot="card-header" className={cn(stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6"), className)} {...props} />;
  }
}
function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (stryMutAct_9fa48("62")) {
    {}
  } else {
    stryCov_9fa48("62");
    return <div data-slot="card-title" className={cn(stryMutAct_9fa48("63") ? "" : (stryCov_9fa48("63"), "leading-none font-semibold"), className)} {...props} />;
  }
}
function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (stryMutAct_9fa48("64")) {
    {}
  } else {
    stryCov_9fa48("64");
    return <div data-slot="card-description" className={cn(stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), "text-muted-foreground text-sm"), className)} {...props} />;
  }
}
function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (stryMutAct_9fa48("66")) {
    {}
  } else {
    stryCov_9fa48("66");
    return <div data-slot="card-action" className={cn(stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "col-start-2 row-span-2 row-start-1 self-start justify-self-end"), className)} {...props} />;
  }
}
function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (stryMutAct_9fa48("68")) {
    {}
  } else {
    stryCov_9fa48("68");
    return <div data-slot="card-content" className={cn(stryMutAct_9fa48("69") ? "" : (stryCov_9fa48("69"), "px-6"), className)} {...props} />;
  }
}
function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (stryMutAct_9fa48("70")) {
    {}
  } else {
    stryCov_9fa48("70");
    return <div data-slot="card-footer" className={cn(stryMutAct_9fa48("71") ? "" : (stryCov_9fa48("71"), "flex items-center px-6 [.border-t]:pt-6"), className)} {...props} />;
  }
}
export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };