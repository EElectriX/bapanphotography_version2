import { marked } from 'marked'

// Eagerly import every markdown file in src/content/blog as raw text.
// Vite resolves this at build time, so no runtime fetch is required.
const postModules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/**
 * Minimal frontmatter parser — avoids pulling in a Node-oriented library
 * for a handful of `key: "value"` lines between --- fences.
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, content: raw }
  }

  const [, frontmatterBlock, content] = match
  const data = {}

  frontmatterBlock.split(/\r?\n/).forEach((line) => {
    const lineMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!lineMatch) return
    const [, key, rawValue] = lineMatch
    const value = rawValue.trim().replace(/^"(.*)"$/, '$1')
    data[key] = value
  })

  return { data, content: content.trim() }
}

function buildPost(path, raw) {
  const { data, content } = parseFrontmatter(raw)
  const html = marked.parse(content)

  return {
    slug: data.slug || path.split('/').pop().replace(/\.md$/, ''),
    title: data.title || 'Untitled post',
    date: data.date || null,
    author: data.author || 'Marlowe Reyes',
    category: data.category || 'Journal',
    excerpt: data.excerpt || '',
    cover: data.cover || '/images/blog/placeholder.jpg',
    link: data.link || null,
    html,
  }
}

let cachedPosts = null

export function getAllPosts() {
  if (cachedPosts) return cachedPosts

  cachedPosts = Object.entries(postModules)
    .map(([path, raw]) => buildPost(path, raw))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return cachedPosts
}

export function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug) || null
}