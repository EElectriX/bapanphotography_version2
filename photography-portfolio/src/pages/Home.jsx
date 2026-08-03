import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import TestimonialSlider from '../components/testimonials/TestimonialSlider.jsx'
import FacebookReel from '../components/media/FacebookReel.jsx'
import galleryData from '../data/galleryData.js'
import testimonials from '../data/testimonialsData.json'
import useScrollAnimation from '../hooks/useScrollAnimation.js'
import SEO from '../components/SEO.jsx'

const featured = galleryData.slice(0, 6)

function Reveal({ children, className = '' }) {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div
      ref={ref}
      className={`${isVisible ? 'animate-fadeUp' : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <div>
        <SEO
        title="Bapan Mondal Photography Academy — Learn Professional Photography"
        description="Join Bapan Mondal Photography Academy for expert-led courses and workshops in portrait, editorial & documentary photography."
        url="https://www.bapanphotography.in/"
        image="https://www.bapanphotography.in/images/gallery/class9.jpg"
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-line">
        <div className="container-page grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow mb-6">Roll 01 · Frame 01 · Kolkata</p>
            <h1 className="font-display text-4xl font-medium leading-[1.05] text-parchment sm:text-6xl">
              Photographs that still look like{' '}
              <span className="italic text-safelight">something happened.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-parchment-dim">
            I'm Bapan Mondal — a creative, wedding, and portrait photographer based in Thakurpukur,
             Kolkata. This is a working archive of weddings, creative sessions, 
             and visual stories, plus the photography, videography, 
            and editing workshops I teach through Bapan Mondal Photography Academy.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/gallery">View the Gallery</Button>
              <Button to="/booking" variant="ghost">Book a Seat</Button>
              <Button to="/contact" variant="ghost">Book for Photography/contact</Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden border border-ink-line shadow-frame animate-shutter">
              <img
                src={galleryData[3].src}
                alt={galleryData[3].title}
                className="h-full w-full object-cover"
              />
            </div>
            {/* <div className="absolute -bottom-5 -left-5 hidden border border-ink-line bg-ink px-4 py-3 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim sm:block">
              {galleryData[1].camera}
            </div> */}
          </div>
        </div>
      </section>

      {/* Featured contact sheet */}
      <section className="border-b border-ink-line py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Selected Frames"
              title="A working contact sheet"
              description="A handful of frames pulled from recent rolls — artwork,  educational, and wedding work made without an assignment."
            />
          </Reveal>

          <Reveal className="mt-12">
            <div className="grid grid-cols-2 gap-px bg-ink-line md:grid-cols-3">
              {featured.map((image) => (
                <Link
                  key={image.id}
                  to="/gallery"
                  className="group relative aspect-[4/5] overflow-hidden bg-ink-soft"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  {/* <div className="absolute left-2 top-2 border border-parchment/30 bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-parchment/80">
                    {image.roll}·{image.frame}
                  </div> */}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10 text-center">
            <Button to="/gallery" variant="ghost">See the Full Gallery</Button>
          </Reveal>
        </div>
      </section>

      {/* Featured reel */}
      <section className="border-b border-ink-line py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow mb-4">On Set</p>
            <h2 className="font-display text-3xl font-medium text-parchment sm:text-4xl">
             A lesson in visual storytelling.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-parchment-dim">
             Watch how thoughtful shot selection, camera movement, 
             and editing can transform simple moments into cinematic stories.
            </p>
          </Reveal>
          <Reveal>
            <FacebookReel
              href="https://www.facebook.com/reel/1523270599153113"
              className="mx-auto aspect-[9/16] max-w-xs"
            />
          </Reveal>
        </div>
      </section>

      {/* About teaser */}
      <section className="border-b border-ink-line py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="aspect-[4/5] max-w-md overflow-hidden border border-ink-line">
              <img
                src={galleryData[21].src}
                alt="Marlowe Reyes portrait"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow mb-4">The Photographer</p>
            <h2 className="font-display text-3xl font-medium text-parchment sm:text-4xl">
              Six years behind the camera, still shooting like it's the first roll.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-parchment-dim">
            I started my journey capturing everyday moments and local stories around Kolkata, 
            and that instinct — observe, anticipate, never interrupt — 
            still shapes every wedding, portrait, and creative photograph I create today. 
            Through Bapan Mondal Photography Academy, I also share that approach by teaching photography, 
            videography, and editing to the next generation of visual storytellers.
            </p>
            <div className="mt-8">
              <Button to="/about" variant="ghost">Read the Full Story</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-ink-line py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Kind Words"
              title="From recent clients"
              align="center"
              className="mx-auto"
            />
          </Reveal>
          <Reveal className="mt-12">
            <TestimonialSlider testimonials={testimonials} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-medium text-parchment sm:text-4xl">
              Have a date in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-parchment-dim">
              Sessions and wedding dates for 2026 are booking now. Tell me a
              little about what you have in mind.
            </p>
            <div className="mt-8">
              <Button to="/booking">Start a Booking</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}