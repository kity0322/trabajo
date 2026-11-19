import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          'bg-gold-500 text-navy-900 shadow-sm hover:bg-gold-400 hover:shadow-md focus-visible:ring-gold-400',
        primary:
          'bg-navy-700 text-white shadow-sm hover:bg-navy-600 hover:shadow-md focus-visible:ring-navy-400',
        outline:
          'border-2 border-navy-700 text-navy-700 bg-transparent hover:bg-navy-700 hover:text-white focus-visible:ring-navy-400',
        ghost: 'text-navy-700 hover:bg-navy-50 focus-visible:ring-navy-200',
        wine: 'bg-wine-500 text-white shadow-sm hover:bg-wine-600 focus-visible:ring-wine-400',
        link: 'text-navy-700 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-[52px] rounded-xl px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
