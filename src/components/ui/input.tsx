import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-xl border-2 border-navy-100 bg-white px-4 py-2 text-sm text-navy-800 shadow-sm transition-colors duration-200 placeholder:text-navy-300 focus-visible:outline-none focus-visible:border-navy-400 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-wine-400 focus-visible:border-wine-500',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
