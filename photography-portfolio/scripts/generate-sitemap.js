// scripts/generate-sitemap.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.resolve('src/content/blog') // adjust to your actual folder
const SITE_URL = 'https://www.bapanphotography.in'

const staticRoutes = [
  { path: '/', priority: 1.0 },
  { path: '/gallery', priority: 0.8 },
  { path: '/about', priority: 0.7 },
  { path: '/courses', priority: 0.9 },
  { path: '/blog', priority: 0.8 },
  { path: '/booking', priority: 0.7 },
  { path: '/testimonials', priority: 0.6 },
  { path: '/contact', priority: 0.6 },
]

function getBlogRoutes() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  return files.map(file => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { data } = matter(raw)
    const slug = data.slug || file.replace('.md', '')
    return {
      path: `/blog/${slug}`,
      lastmod: data.date ? new Date(data.date).toISOString() : undefined,
      priority: 0.7,
    }
  })
}

function buildSitemap(routes) {
  const urls = routes
    .map(r => `
  <url>
    <loc>${SITE_URL}${r.path}</loc>
    ${r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ''}
    <priority>${r.priority}</priority>
  </url>`)
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`
}

const allRoutes = [...staticRoutes, ...getBlogRoutes()]
const xml = buildSitemap(allRoutes)

fs.mkdirSync('dist', { recursive: true })
fs.writeFileSync(path.join('dist', 'sitemap.xml'), xml)
console.log(`Sitemap generated with ${allRoutes.length} routes.`)