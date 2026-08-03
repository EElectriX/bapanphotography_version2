export default function GalleryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-ink-line pb-6">
      {categories.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
              isActive
                ? 'border-safelight bg-safelight text-ink'
                : 'border-ink-line text-parchment-dim hover:border-parchment hover:text-parchment'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
