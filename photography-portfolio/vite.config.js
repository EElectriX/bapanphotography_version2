// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//   },
// })


// vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import sitemap from 'vite-plugin-sitemap'

// export default defineConfig({
//   plugins: [
//     react(),
//     sitemap({
//       hostname: 'https://www.bapanphotography.in',
//       dynamicRoutes: [
//         '/',
//         '/gallery',
//         '/about',
//         '/courses',
//         '/blog',
//         '/booking',
//         '/testimonials',
//         '/contact',
//       ],
//     }),
//   ],
//   server: {
//     port: 5173,
//   },
// })


// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
})

// {
//   "name": "bapanphotography_version2",
//   "lockfileVersion": 3,
//   "requires": true,
//   "packages": {}
// }
