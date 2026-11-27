import projectsData from '../data/projects.json'

// Newest first by default. Add projects in src/data/projects.json — no code changes needed.
// Gallery items can be a plain path or { src, caption }.
const normalize = (p) => ({ ...p, gallery: (p.gallery || []).map((g) => (typeof g === 'string' ? { src: g, caption: '' } : g)) })

export const projects = projectsData.map(normalize).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))

export const featuredProjects = projects.filter((p) => p.featured)

// "Web + Mobile" counts as both Web and Mobile when filtering.
export const projectKinds = (p) => p.type.split('+').map((t) => t.trim())

export const allTypes = [...new Set(projects.flatMap(projectKinds))].sort()

export const allTech = (() => {
  const count = new Map()
  projects.forEach((p) => p.tech.forEach((t) => count.set(t, (count.get(t) || 0) + 1)))
  return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t)
})()

export const findProject = (slug) => projects.find((p) => p.slug === slug)

export const nextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}

export const transitionName = (slug) => `project-${slug}`
