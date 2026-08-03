import { useState, useEffect } from 'react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import Button from '../components/common/Button.jsx'
import coursesData from '../data/coursesData.js'
import SEO from '../components/SEO.jsx'

export default function Courses() {
  const [activeImage, setActiveImage] = useState(null) // { src, title } | null

  // Close on Escape key
  useEffect(() => {
    if (!activeImage) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveImage(null)
    }
    window.addEventListener('keydown', onKeyDown)
    // lock scroll while lightbox is open
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeImage])

  return (
    <>
      <SEO
        title="Photography Courses & Workshops — Bapan Mondal Academy"
        description="Explore photography courses and hands-on workshops covering portrait, editorial, and documentary techniques."
        url="https://www.bapanphotography.in/courses"
      />

      <div className="container-page py-16 sm:py-24">
        <SectionHeading
          eyebrow="Learn"
          title="Courses & Workshops"
          description="Small-group, hands-on sessions taught out of the Brooklyn studio and online. Each course caps enrollment low enough for real critique."
        />

        <div className="mt-14 space-y-px bg-ink-line">
          {coursesData.map((course) => (
            <CourseRow key={course.id} course={course} onImageClick={setActiveImage} />
          ))}
        </div>
      </div>

      {activeImage && (
        <Lightbox image={activeImage} onClose={() => setActiveImage(null)} />
      )}
    </>
  )
}

function CourseRow({ course, onImageClick }) {
  const [imageError, setImageError] = useState(false)
  const hasImage = Boolean(course.image) && !imageError

  return (
    <div
      className={`grid gap-6 bg-ink p-8 sm:items-start sm:p-10 ${
        hasImage ? 'sm:grid-cols-[280px_1fr_auto]' : 'sm:grid-cols-[1fr_auto]'
      }`}
    >
      {/* Photo — only rendered if the course has a valid image */}
      {hasImage && (
        <button
          type="button"
          onClick={() => onImageClick({ src: course.image, title: course.title })}
          className="group relative aspect-[4/3] w-full overflow-hidden bg-ink-line sm:w-[280px]"
          aria-label={`View larger photo for ${course.title}`}
        >
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
            <span className="border border-parchment/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest2 text-parchment">
              View
            </span>
          </span>
        </button>
      )}

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="border border-safelight/40 px-2 py-1 font-mono text-[10px] uppercase tracking-widest2 text-safelight">
            {course.level}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
            {course.format}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl text-parchment">{course.title}</h3>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-parchment-dim">
          {course.description}
        </p>

        <ul className="mt-5 space-y-2">
          {course.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-3 text-sm text-parchment-dim">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 bg-safelight" />
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-start gap-4 sm:items-end sm:text-right">
        <div>
          <p className="font-display text-2xl text-parchment">{course.price}</p>
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
            {course.duration}
          </p>
        </div>
        <p className="font-mono text-[11px] text-parchment-dim">
          Next cohort · {course.nextDate}
        </p>
        <p className="font-mono text-[11px] text-parchment-dim">
          {course.seats} seats per cohort
        </p>
        <Button to="/booking">Reserve a Seat</Button>
      </div>
    </div>
  )
}

function Lightbox({ image, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${image.title} — enlarged photo`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center border border-parchment/40 text-parchment transition hover:border-safelight hover:text-safelight"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <img
        src={image.src}
        alt={image.title}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-full object-contain"
      />

      <p
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim"
      >
        {image.title}
      </p>
    </div>
  )
}