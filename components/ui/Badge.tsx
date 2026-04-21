import React from 'react'
import type { ProjectType, BlogTag } from '@/lib/types'

type BadgeVariant = ProjectType | BlogTag | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  'case-study':  'bg-accent-light text-[var(--terracotta-dark)]',
  'teardown':    'bg-[var(--eau-light)] text-[var(--eau-dark)] border-[0.5px] border-[rgba(42,74,60,0.15)]',
  'side-project':'bg-[rgba(60,55,50,0.08)] text-text-primary',
  'Apprentissage PM':  'bg-accent-light text-[var(--terracotta-dark)]',
  'Analyse produit':   'bg-[var(--eau-light)] text-[var(--eau-dark)] border-[0.5px] border-[rgba(42,74,60,0.15)]',
  'Build en public':   'bg-[rgba(60,55,50,0.08)] text-text-primary',
  'neutral':     'bg-[rgba(60,55,50,0.08)] text-text-primary',
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-[6px] font-medium text-label rounded-full px-[12px] py-[6px] tracking-[var(--tracking-label)] uppercase',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
