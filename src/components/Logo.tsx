import { GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-sm">
        <GraduationCap className="h-5 w-5 text-navy-900" strokeWidth={2.5} />
      </div>
      <span className={cn('font-heading text-lg font-bold tracking-tight', dark ? 'text-white' : 'text-navy-800')}>
        Impulsar<span className="text-gold-500">Saber</span>
      </span>
    </div>
  )
}
