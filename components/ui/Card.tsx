import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className = '', onClick }: CardProps) {
  const interactive = Boolean(onClick)

  return (
    <div
      onClick={onClick}
      className={[
        'bg-surface border-[0.5px] border-[var(--border-hair)] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-[var(--space-2xl)]',
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
