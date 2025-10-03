import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/shared/lib/utils'

const BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

const VARIANT_CLASSES = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
} as const

const SIZE_CLASSES = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
} as const

type ButtonVariant = keyof typeof VARIANT_CLASSES

type ButtonSize = keyof typeof SIZE_CLASSES

type ButtonStyleOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const buttonClassName = ({
  variant = 'default',
  size = 'default',
  className,
}: ButtonStyleOptions = {}) =>
  cn(
    BUTTON_BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  )

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={buttonClassName({ variant, size, className })}
      ref={ref}
      {...props}
    />
  ),
)

Button.displayName = 'Button'
