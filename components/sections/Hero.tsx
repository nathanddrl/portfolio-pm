import Link from 'next/link'
import { HOME_HERO } from '@/content/home'

export function Hero() {
  return (
    <section
      style={{
        background:
          'radial-gradient(80% 120% at 100% 0%, rgba(217,123,79,.18), transparent 60%), linear-gradient(135deg, #E8DFD0, #D7E4DC)',
      }}
    >
      <div className="mx-auto flex items-center justify-between gap-[var(--space-3xl)] px-[var(--space-3xl)] py-[var(--space-4xl)] max-w-[1200px] max-md:flex-col max-md:px-[var(--space-xl)] max-md:py-[var(--space-3xl)]">
        <div className="max-w-[640px]">
          <p className="mb-[var(--space-lg)] text-label font-medium text-accent uppercase tracking-[var(--tracking-label)]">
            — {HOME_HERO.eyebrow}
          </p>
          <h1
            className="mb-[var(--space-xl)] text-display-1 font-bold text-text-primary leading-[var(--lh-tight)] tracking-[var(--tracking-tight)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {HOME_HERO.title}
          </h1>
          <p className="mb-[var(--space-2xl)] text-body-lg text-text-secondary leading-[var(--lh-base)]">
            {HOME_HERO.body}
          </p>
          <Link
            href={HOME_HERO.cta.href}
            className="inline-flex items-center font-medium text-[14px] text-white bg-accent hover:bg-[var(--terracotta-dark)] px-[var(--space-xl)] py-[10px] rounded-[var(--radius-md)] border-[1.5px] border-transparent no-underline transition-all duration-[var(--duration-micro)] ease-out"
          >
            {HOME_HERO.cta.label}
          </Link>
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
