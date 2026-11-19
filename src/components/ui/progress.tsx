import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicatorClassName?: string }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn('relative h-3 w-full overflow-hidden rounded-full bg-navy-100', className)}
    {...props}
  >
    <motion.div
      className={cn('h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400', indicatorClassName)}
      initial={{ width: 0 }}
      animate={{ width: `${value ?? 0}%` }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
