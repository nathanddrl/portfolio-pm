export type ProjectType = 'case-study' | 'teardown' | 'side-project'

export type ProjectStatus = 'En cours' | 'Terminé' | 'Archivé'

export type BlogTag =
  | 'Apprentissage PM'
  | 'Analyse produit'
  | 'Build en public'

export interface Project {
  slug: string
  title: string
  tagline: string
  type: ProjectType
  status: ProjectStatus
  role: string
  period: string
  coverImage: string
  content: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  readingTime: number
  tags: BlogTag[]
  excerpt: string
  content: string
}

export interface Persona {
  name: string
  age: string
  quote: string
  needs: string[]
  frustrations: string[]
}

export interface Decision {
  decision: string
  why: string
  rejected: string
}

export interface Metric {
  name: string
  definition: string
  why: string
}
