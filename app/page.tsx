import Link from 'next/link'

import { Hero } from '@/components/sections/Hero'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { HOME_ABOUT, SECTION_LABELS } from '@/content/home'
import { getAllPosts, getAllProjects } from '@/lib/mdx'

function formatFrenchDate(value: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export default function Home() {
  const featuredProjects = getAllProjects().slice(0, 2)
  const featuredPosts = getAllPosts().slice(0, 3)

  return (
    <main className="flex-1">
      <Hero />

      <section id="about" className="bg-bg">
        <div className="mx-auto max-w-[1200px] px-[var(--space-3xl)] py-[var(--space-4xl)] max-md:px-[var(--space-xl)]">
          <div className="max-w-[640px]">
            <p className="mb-[var(--space-lg)] text-label font-medium uppercase tracking-[var(--tracking-label)] text-accent">
              — {HOME_ABOUT.eyebrow}
            </p>
            <h2
              className="mb-[var(--space-xl)] text-display-2 font-bold leading-[var(--lh-tight)] tracking-[var(--tracking-tight)] text-text-primary"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {HOME_ABOUT.title}
            </h2>
            <p className="text-body-lg leading-[var(--lh-base)] text-text-secondary">
              {HOME_ABOUT.body}
            </p>
          </div>

          <div className="mt-[var(--space-2xl)]">
            <Link
              href={HOME_ABOUT.cta.href}
              className="inline-flex items-center rounded-[var(--radius-md)] border border-[var(--border-secondary)] bg-transparent px-[var(--space-xl)] py-[10px] text-[14px] font-medium text-text-primary no-underline transition-all duration-[var(--duration-micro)] ease-out hover:border-[var(--border-primary)] hover:bg-[rgba(60,55,50,0.04)]"
            >
              {HOME_ABOUT.cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-surface">
        <div className="mx-auto max-w-[1200px] px-[var(--space-3xl)] py-[var(--space-4xl)] max-md:px-[var(--space-xl)]">
          <div className="mb-[var(--space-2xl)] max-w-[640px]">
            <p className="mb-[var(--space-lg)] text-label font-medium uppercase tracking-[var(--tracking-label)] text-accent">
              — {SECTION_LABELS.projects.eyebrow}
            </p>
            <h2
              className="text-display-2 font-bold leading-[var(--lh-tight)] tracking-[var(--tracking-tight)] text-text-primary"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {SECTION_LABELS.projects.title}
            </h2>
          </div>

          <div className="grid gap-[var(--space-2xl)] md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card key={project.slug} className="h-full" tone="cool">
                <article className="flex h-full flex-col gap-[var(--space-xl)]">
                  <div className="flex items-start justify-between gap-[var(--space-xl)]">
                    <Badge variant={project.type}>{project.type}</Badge>
                    <span className="text-caption text-text-tertiary">{project.status}</span>
                  </div>

                  <div className="max-w-[32rem]">
                    <h3
                      className="mb-[var(--space-sm)] text-h3 font-bold leading-[var(--lh-snug)] tracking-[var(--tracking-snug)] text-text-primary"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-body leading-[var(--lh-base)] text-text-secondary">
                      {project.tagline}
                    </p>
                  </div>

                  <div className="mt-auto border-t border-[var(--border-hair)] pt-[var(--space-lg)] text-caption text-text-tertiary">
                    <div>{project.role}</div>
                    <div>{project.period}</div>
                  </div>
                </article>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="bg-bg">
        <div className="mx-auto max-w-[1200px] px-[var(--space-3xl)] py-[var(--space-4xl)] max-md:px-[var(--space-xl)]">
          <div className="mb-[var(--space-2xl)] max-w-[640px]">
            <p className="mb-[var(--space-lg)] text-label font-medium uppercase tracking-[var(--tracking-label)] text-accent">
              — {SECTION_LABELS.blog.eyebrow}
            </p>
            <h2
              className="text-display-2 font-bold leading-[var(--lh-tight)] tracking-[var(--tracking-tight)] text-text-primary"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {SECTION_LABELS.blog.title}
            </h2>
          </div>

          <div className="grid gap-[var(--space-2xl)] md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Card key={post.slug} className="h-full" tone="cool">
                <article className="flex h-full flex-col gap-[var(--space-lg)]">
                  <div className="flex items-start justify-between gap-[var(--space-xl)]">
                    <Badge variant={post.tags[0] ?? 'neutral'}>{post.tags[0] ?? 'Blog'}</Badge>
                    <span className="text-caption text-text-tertiary">{formatFrenchDate(post.date)}</span>
                  </div>

                  <div className="max-w-[32rem]">
                    <h3
                      className="mb-[var(--space-sm)] text-h3 font-bold leading-[var(--lh-snug)] tracking-[var(--tracking-snug)] text-text-primary"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-body leading-[var(--lh-base)] text-text-secondary">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-auto border-t border-[var(--border-hair)] pt-[var(--space-lg)] text-caption text-text-tertiary">
                    <div>{post.readingTime} min de lecture</div>
                  </div>
                </article>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
