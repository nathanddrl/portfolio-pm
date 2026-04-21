import React from 'react'

type CardTone = 'default' | 'cool'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  tone?: CardTone
}

const toneClasses: Record<CardTone, string> = {
  default: 'bg-surface border-[var(--border-hair)]',
  cool: 'bg-secondary-light border-[rgba(42,74,60,0.15)]',
}

export function Card({ children, className = '', onClick, tone = 'default' }: CardProps) {
  const interactive = Boolean(onClick)

  return (
    <div
      onClick={onClick}
      className={[
        'border-[0.5px] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-[var(--space-2xl)]',
        toneClasses[tone],
        interactive
          ? 'cursor-pointer transition-all duration-[var(--duration-micro)] ease-out hover:-translate-y-[2px] hover:shadow-[var(--shadow-md)]'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
