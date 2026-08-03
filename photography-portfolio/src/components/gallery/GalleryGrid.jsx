export default function GalleryGrid({ images, onSelect }) {
  if (images.length === 0) {
    return (
      <p className="py-16 text-center font-mono text-xs uppercase tracking-widest2 text-parchment-dim">
        No frames in this category yet.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-px bg-ink-line md:grid-cols-3">
      {images.map((image, index) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onSelect(index)}
          className="group relative aspect-[4/5] overflow-hidden bg-ink-soft text-left"
        >
          <img
            src={image.src}
            alt={image.title}
            loading="lazy"
            className="h-full w-full object-cover opacity-90 grayscale-[15%] transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Frame number, contact-sheet style */}
          {/* <div className="absolute left-2 top-2 border border-parchment/30 bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-parchment/80">
            {image.roll}·{image.frame}
          </div> */}

          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {/* <p className="font-display text-sm text-parchment">{image.title}</p> */}
            <p className="font-mono text-[10px] uppercase tracking-widest2 text-safelight">
              {image.category}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
