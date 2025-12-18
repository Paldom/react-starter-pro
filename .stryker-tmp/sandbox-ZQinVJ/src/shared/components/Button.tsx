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
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';
const BUTTON_BASE_CLASSES = stryMutAct_9fa48("223") ? "" : (stryCov_9fa48("223"), 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50');
const VARIANT_CLASSES = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline'
} as const;
const SIZE_CLASSES = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10'
} as const;
type ButtonVariant = keyof typeof VARIANT_CLASSES;
type ButtonSize = keyof typeof SIZE_CLASSES;
type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};
const buttonClassName = stryMutAct_9fa48("224") ? () => undefined : (stryCov_9fa48("224"), (() => {
  const buttonClassName = ({
    variant = stryMutAct_9fa48("225") ? "" : (stryCov_9fa48("225"), 'default'),
    size = stryMutAct_9fa48("226") ? "" : (stryCov_9fa48("226"), 'default'),
    className
  }: ButtonStyleOptions = {}) => cn(BUTTON_BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);
  return buttonClassName;
})());
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(stryMutAct_9fa48("227") ? () => undefined : (stryCov_9fa48("227"), ({
  className,
  variant,
  size,
  ...props
}, ref) => <button className={buttonClassName(stryMutAct_9fa48("228") ? {} : (stryCov_9fa48("228"), {
  variant,
  size,
  className
}))} ref={ref} {...props} />));
Button.displayName = stryMutAct_9fa48("229") ? "" : (stryCov_9fa48("229"), 'Button');