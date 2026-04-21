import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-[var(--terracotta-dark)] border-transparent',
  secondary:
    'bg-transparent text-accent border-accent hover:bg-accent-light',
  ghost:
    'bg-transparent text-text-secondary border-[var(--border-secondary)] hover:text-text-primary',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-[var(--space-lg)] py-[10px] text-[13px] rounded-[var(--radius-md)]',
  md: 'px-[var(--space-xl)] py-[10px] text-[14px] rounded-[var(--radius-md)]',
  lg: 'px-[26px] py-[14px] text-body rounded-[12px]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center gap-sm font-medium border-[1.5px] transition-all duration-[var(--duration-micro)] ease-out cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
