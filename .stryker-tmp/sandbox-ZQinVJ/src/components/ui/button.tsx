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
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(stryMutAct_9fa48("32") ? "" : (stryCov_9fa48("32"), "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"), stryMutAct_9fa48("33") ? {} : (stryCov_9fa48("33"), {
  variants: stryMutAct_9fa48("34") ? {} : (stryCov_9fa48("34"), {
    variant: stryMutAct_9fa48("35") ? {} : (stryCov_9fa48("35"), {
      default: stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), "bg-primary text-primary-foreground hover:bg-primary/90"),
      destructive: stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"),
      outline: stryMutAct_9fa48("38") ? "" : (stryCov_9fa48("38"), "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50"),
      secondary: stryMutAct_9fa48("39") ? "" : (stryCov_9fa48("39"), "bg-secondary text-secondary-foreground hover:bg-secondary/80"),
      ghost: stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"),
      link: stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), "text-primary underline-offset-4 hover:underline")
    }),
    size: stryMutAct_9fa48("42") ? {} : (stryCov_9fa48("42"), {
      default: stryMutAct_9fa48("43") ? "" : (stryCov_9fa48("43"), "h-9 px-4 py-2 has-[>svg]:px-3"),
      sm: stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"),
      lg: stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), "h-10 rounded-md px-6 has-[>svg]:px-4"),
      icon: stryMutAct_9fa48("46") ? "" : (stryCov_9fa48("46"), "size-9"),
      "icon-sm": stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), "size-8"),
      "icon-lg": stryMutAct_9fa48("48") ? "" : (stryCov_9fa48("48"), "size-10")
    })
  }),
  defaultVariants: stryMutAct_9fa48("49") ? {} : (stryCov_9fa48("49"), {
    variant: stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), "default"),
    size: stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), "default")
  })
}));
function Button({
  className,
  variant = stryMutAct_9fa48("52") ? "" : (stryCov_9fa48("52"), "default"),
  size = stryMutAct_9fa48("53") ? "" : (stryCov_9fa48("53"), "default"),
  asChild = stryMutAct_9fa48("54") ? true : (stryCov_9fa48("54"), false),
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
}) {
  if (stryMutAct_9fa48("55")) {
    {}
  } else {
    stryCov_9fa48("55");
    const Comp = asChild ? Slot : stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), "button");
    return <Comp data-slot="button" data-variant={variant} data-size={size} className={cn(buttonVariants(stryMutAct_9fa48("57") ? {} : (stryCov_9fa48("57"), {
      variant,
      size,
      className
    })))} {...props} />;
  }
}
export { Button, buttonVariants };