import Link from 'next/link'
import { HOME_HERO } from '@/content/home'

export function Hero() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(80%_120%_at_100%_0%,rgba(217,123,79,.18),transparent_60%)] bg-surface-alt">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-[var(--space-3xl)] px-[var(--space-3xl)] py-[var(--space-4xl)] max-md:flex-col max-md:items-start max-md:px-[var(--space-xl)] max-md:py-[var(--space-3xl)]">
        <div className="max-w-[640px]">
          <p className="mb-[var(--space-lg)] text-label font-medium uppercase tracking-[var(--tracking-label)] text-accent">
            — {HOME_HERO.name}
          </p>
          <h1
            className="mb-[var(--space-md)] text-display-1 font-bold leading-[var(--lh-tight)] tracking-[var(--tracking-tight)] text-text-primary"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {HOME_HERO.title}
          </h1>
          <p className="max-w-[34rem] text-body-lg leading-[var(--lh-base)] text-text-secondary">
            {HOME_HERO.body}
          </p>

          <div className="mt-[var(--space-2xl)] flex flex-wrap gap-[var(--space-md)]">
            <Link
              href={HOME_HERO.ctaPrimary.href}
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] border-[1.5px] border-transparent bg-accent px-[var(--space-xl)] py-[10px] text-[14px] font-medium text-white no-underline transition-all duration-[var(--duration-micro)] ease-out hover:bg-[var(--terracotta-dark)]"
            >
              {HOME_HERO.ctaPrimary.label}
            </Link>
            <Link
              href={HOME_HERO.ctaSecondary.href}
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] border-[1.5px] border-accent bg-transparent px-[var(--space-xl)] py-[10px] text-[14px] font-medium text-accent no-underline transition-all duration-[var(--duration-micro)] ease-out hover:bg-accent-light"
            >
              {HOME_HERO.ctaSecondary.label}
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="shrink-0 rounded-full max-md:hidden"
          style={{
            width: '90px',
            height: '90px',
            background: 'radial-gradient(circle at 30% 30%, #F5C488, #D97B4F 70%)',
          }}
        />
      </div>
    </section>
  )
}
