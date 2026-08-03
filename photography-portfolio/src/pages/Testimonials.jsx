import SectionHeading from '../components/common/SectionHeading.jsx'
import TestimonialCard from '../components/testimonials/TestimonialCard.jsx'
import testimonials from '../data/testimonialsData.json'
import SEO from '../components/SEO.jsx'


export default function Testimonials() {
  return (
  <>
      <SEO
        title="Testimonials — Bapan Mondal Photography Academy"
        description="See what students and clients say about their experience learning with Bapan Mondal."
        url="https://www.bapanphotography.in/testimonials"
      /> 
      <div className="container-page py-16 sm:py-24">
      <SectionHeading
        eyebrow="Client Words"
        title="Testimonials"
        description="A handful of notes from people I've photographed and photographers I've taught."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
    </>
  )
}
