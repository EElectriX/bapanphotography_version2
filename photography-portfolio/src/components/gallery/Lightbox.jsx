import { useEffect, useCallback } from 'react'

export default function Lightbox({ images, activeIndex, onClose, onNavigate }) {
  const image = images[activeIndex]

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') {
        onNavigate((activeIndex + 1) % images.length)
      }
      if (event.key === 'ArrowLeft') {
        onNavigate((activeIndex - 1 + images.length) % images.length)
      }
    },
    [activeIndex, images.length, onClose, onNavigate]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-ink/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      <div className="flex items-center justify-between border-b border-ink-line px-6 py-4">
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
          Frame {activeIndex + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim hover:text-parchment"
        >
          Close ✕
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4">
        <button
          type="button"
          onClick={() => onNavigate((activeIndex - 1 + images.length) % images.length)}
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 border border-ink-line p-3 font-mono text-parchment-dim hover:border-parchment hover:text-parchment sm:block"
          aria-label="Previous image"
        >
          ←
        </button>

        <img
          src={image.src}
          alt={image.title}
          className="max-h-[70vh] w-auto max-w-full object-contain shadow-frame"
        />

        <button
          type="button"
          onClick={() => onNavigate((activeIndex + 1) % images.length)}
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 border border-ink-line p-3 font-mono text-parchment-dim hover:border-parchment hover:text-parchment sm:block"
          aria-label="Next image"
        >
          →
        </button>
      </div>

      {/* <div className="border-t border-ink-line px-6 py-5">
        <div className="container-page flex flex-col gap-2 !px-0 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg text-parchment">{image.title}</p>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-safelight">
              {image.category} · {image.location}
            </p>
          </div>
          <p className="font-mono text-[11px] text-parchment-dim">
            {image.camera} · {image.film} · {image.year}
          </p>
        </div>
      </div> */}
    </div>
  )
}
