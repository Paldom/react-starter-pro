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
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const alertVariants = cva(stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current"), stryMutAct_9fa48("19") ? {} : (stryCov_9fa48("19"), {
  variants: stryMutAct_9fa48("20") ? {} : (stryCov_9fa48("20"), {
    variant: stryMutAct_9fa48("21") ? {} : (stryCov_9fa48("21"), {
      default: stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), "bg-card text-card-foreground"),
      destructive: stryMutAct_9fa48("23") ? "" : (stryCov_9fa48("23"), "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90")
    })
  }),
  defaultVariants: stryMutAct_9fa48("24") ? {} : (stryCov_9fa48("24"), {
    variant: stryMutAct_9fa48("25") ? "" : (stryCov_9fa48("25"), "default")
  })
}));
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  if (stryMutAct_9fa48("26")) {
    {}
  } else {
    stryCov_9fa48("26");
    return <div data-slot="alert" role="alert" className={cn(alertVariants(stryMutAct_9fa48("27") ? {} : (stryCov_9fa48("27"), {
      variant
    })), className)} {...props} />;
  }
}
function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (stryMutAct_9fa48("28")) {
    {}
  } else {
    stryCov_9fa48("28");
    return <div data-slot="alert-title" className={cn(stryMutAct_9fa48("29") ? "" : (stryCov_9fa48("29"), "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight"), className)} {...props} />;
  }
}
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  if (stryMutAct_9fa48("30")) {
    {}
  } else {
    stryCov_9fa48("30");
    return <div data-slot="alert-description" className={cn(stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed"), className)} {...props} />;
  }
}
export { Alert, AlertTitle, AlertDescription };