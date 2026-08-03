# Marlowe Reyes Photography — Portfolio Site

A React + Vite portfolio for a portrait/editorial/documentary photographer:
gallery with filtering + lightbox, a markdown-powered journal, a booking
form, testimonials, and a courses page. Styled with Tailwind CSS around a
"darkroom / contact sheet" visual identity.

## Stack

- **React 18** + **React Router v6** for routing
- **Vite** for dev server / bundling
- **Tailwind CSS** for styling (custom design tokens in `tailwind.config.js`)
- **marked** for rendering the markdown blog posts in `src/content/blog`
- Plain `fetch` for the booking form (points at whatever endpoint you set in `.env`)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint       # eslint
```

## Project structure

```
src/
├── components/
│   ├── layout/        Navbar, Footer, Layout (route Outlet wrapper)
│   ├── gallery/        GalleryGrid, GalleryFilter, Lightbox
│   ├── booking/        BookingForm, BookingConfirmation
│   ├── blog/           BlogCard, BlogPost
│   ├── testimonials/   TestimonialCard, TestimonialSlider
│   └── common/         Button, SectionHeading, LoadingSpinner
├── pages/               One component per route (see App.jsx)
├── data/                 galleryData.js, coursesData.js, testimonialsData.json
├── content/blog/         Markdown blog posts (frontmatter + body)
├── hooks/                useScrollAnimation.js (IntersectionObserver reveal)
└── utils/                loadMarkdownPosts.js (loads + parses the markdown posts)
```

## Content you'll likely want to swap in

1. **Images** — `public/images/gallery`, `public/images/blog`,
   `public/images/testimonials` currently contain generated placeholder
   frames so the site renders out of the box. Replace them with real photos
   using the same filenames referenced in `src/data/galleryData.js`,
   `src/content/blog/*.md`, and `src/data/testimonialsData.json` — or update
   the `src` paths to match new filenames.
2. **Gallery captions** — `src/data/galleryData.js`. Each entry doubles as
   the contact-sheet frame label (roll/frame number), category, and EXIF-ish
   metadata shown in the lightbox.
3. **Blog posts** — add new `.md` files to `src/content/blog/` with the same
   frontmatter shape (`title`, `slug`, `date`, `author`, `category`,
   `excerpt`, `cover`). They're picked up automatically via
   `import.meta.glob`, no registration step needed.
4. **Courses** — `src/data/coursesData.js`.
5. **Testimonials** — `src/data/testimonialsData.json`.

## Wiring up the booking form

`BookingForm.jsx` posts JSON to whatever URL you set as
`VITE_BOOKING_FORM_ENDPOINT` in `.env` (a Formspree/Getform endpoint works
well). Until that's set, submissions are simulated locally so the flow is
demoable without a backend.

## Design notes

The visual language is built around a photographer's actual working
materials — contact sheets, frame numbers, a darkroom safelight amber, and
monospace "EXIF" captions — rather than generic portfolio-template styling.
Palette and type tokens live in `tailwind.config.js` under `theme.extend`.
