import { useEffect, useState } from 'react'
import TestimonialCard from './TestimonialCard.jsx'

export default function TestimonialSlider({ testimonials, autoAdvanceMs = 6000 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!autoAdvanceMs) return undefined
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, autoAdvanceMs)
    return () => clearInterval(timer)
  }, [autoAdvanceMs, testimonials.length])

  if (testimonials.length === 0) return null

  const active = testimonials[index]

  return (
    <div className="mx-auto max-w-xl">
      <div key={active.id} className="animate-fadeUp">
        <TestimonialCard testimonial={active} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {testimonials.map((testimonial, i) => (
          <button
            key={testimonial.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial from ${testimonial.name}`}
            className={`h-1.5 transition-all duration-300 ${
              i === index ? 'w-6 bg-safelight' : 'w-1.5 bg-ink-line'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
