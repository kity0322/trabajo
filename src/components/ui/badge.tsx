import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-navy-700 text-white',
        gold: 'border-transparent bg-gold-100 text-gold-800',
        wine: 'border-transparent bg-wine-100 text-wine-600',
        outline: 'border-navy-200 text-navy-600 bg-white',
        success: 'border-transparent bg-emerald-100 text-emerald-700',
        soft: 'border-transparent bg-navy-50 text-navy-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
