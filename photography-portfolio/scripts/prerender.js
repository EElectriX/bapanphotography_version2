// // scripts/prerender.js
// import puppeteer from 'puppeteer'
// import { preview } from 'vite'
// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'

// const BLOG_DIR = path.resolve('src/content/blog') // adjust if different
// const PORT = 4173

// const staticRoutes = [
//   '/',
//   '/gallery',
//   '/about',
//   '/courses',
//   '/blog',
//   '/booking',
//   '/testimonials',
//   '/contact',
// ]

// function getBlogRoutes() {
//   if (!fs.existsSync(BLOG_DIR)) return []
//   const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
//   return files.map(file => {
//     const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
//     const { data } = matter(raw)
//     const slug = data.slug || file.replace('.md', '')
//     return `/blog/${slug}`
//   })
// }

// async function run() {
//   const routes = [...staticRoutes, ...getBlogRoutes()]

//   console.log(`Prerendering ${routes.length} routes...`)

//   // Serve the built dist/ folder locally
//   const server = await preview({
//     preview: { port: PORT },
//   })
//   const baseUrl = `http://localhost:${PORT}`

//   const browser = await puppeteer.launch()

//   for (const route of routes) {
//     const page = await browser.newPage()
//     try {
//       await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0', timeout: 30000 })
//       const html = await page.content()

//       const outDir = route === '/' ? 'dist' : path.join('dist', route)
//       fs.mkdirSync(outDir, { recursive: true })
//       fs.writeFileSync(path.join(outDir, 'index.html'), html)

//       console.log(`✓ ${route}`)
//     } catch (err) {
//       console.error(`✗ ${route} — ${err.message}`)
//     } finally {
//       await page.close()
//     }
//   }

//   await browser.close()
//   await server.httpServer.close()
//   console.log('Prerendering complete.')
// }

// run()