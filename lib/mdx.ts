import fs from 'fs'
import path from 'path'
// gray-matter ships no type declarations — declare the minimum we use
// eslint-disable-next-line @typescript-eslint/no-require-imports
const matter = require('gray-matter') as (
  input: string
) => { data: Record<string, unknown>; content: string }

import type { Project, BlogPost } from '@/lib/types'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')
const BLOG_DIR = path.join(process.cwd(), 'content/blog')

function slugsIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

function parseProject(slug: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.mdx`), 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data['title'] as string,
    tagline: data['tagline'] as string,
    type: data['type'] as Project['type'],
    status: data['status'] as Project['status'],
    role: data['role'] as string,
    period: data['period'] as string,
    coverImage: data['coverImage'] as string,
    content,
  }
}

function parseBlogPost(slug: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data['title'] as string,
    date: data['date'] as string,
    readingTime: data['readingTime'] as number,
    tags: data['tags'] as BlogPost['tags'],
    excerpt: data['excerpt'] as string,
    content,
  }
}

export function getAllProjects(): Project[] {
  return slugsIn(PROJECTS_DIR).map(parseProject)
}

export function getProjectBySlug(slug: string): Project | undefined {
  const file = path.join(PROJECTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return undefined
  return parseProject(slug)
}

export function getAllPosts(): BlogPost[] {
  return slugsIn(BLOG_DIR)
    .map(parseBlogPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const file = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(file)) return undefined
  return parseBlogPost(slug)
}
