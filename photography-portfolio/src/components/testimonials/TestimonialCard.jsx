export default function TestimonialCard({ testimonial }) {
  return (
    <div className="flex h-full flex-col justify-between border border-ink-line bg-ink-soft p-8">
      <div>
        <div className="mb-4 flex gap-1 text-safelight" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <p className="font-display text-lg leading-snug text-parchment">
          “{testimonial.quote}”
        </p>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-ink-line">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-sm text-parchment">{testimonial.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-parchment-dim">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  )
}
