import SectionHeading from '../components/common/SectionHeading.jsx'
import Button from '../components/common/Button.jsx'
import galleryData from '../data/galleryData.js'
import SEO from '../components/SEO.jsx'

const timeline = [
  { year: '2020', event: 'Started as a stringer photographer for a creative photography.' },
  { year: '2021', event: 'First wedding season — six weddings, all shot on borrowed gear.' },
  { year: '2023', event: 'Opened the Thakurpukur studio and began teaching small-group workshops.' },
  { year: '2024', event: 'Work exhibited in a group show on documentary photography in Kolkata.' },
  { year: '2026', event: 'Currently booking creative photography, videography, and wedding work for the year.' },
]

export default function About() {
  return (
    <div>
      <SEO
        title="About Bapan Mondal — Photography Academy"
        description="Learn about Bapan Mondal's background, teaching philosophy, and approach to professional photography education."
        url="https://www.bapanphotography.in/about"
      />
      <section className="border-b border-ink-line">
        <div className="container-page grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow mb-4">About</p>
            <h1 className="font-display text-4xl font-medium leading-tight text-parchment sm:text-5xl">
              I photograph people the way I'd want to be photographed —
              unposed, mostly.
            </h1>
            <p className="mt-6 text-[15px] leading-relaxed text-parchment-dim">
            I'm Bapan Mondal — a creative photographer based in Thakurpukur, Kolkata, 
            specializing in weddings, portraits, and storytelling through images. 
            This is a curated archive of my work, from timeless wedding moments 
            to creative visual projects, alongside the photography, videography, 
            and editing courses I teach at Bapan Mondal Photography Academy.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-parchment-dim">
              Most of my personal and commissioned work is shot on wedding,and creative work
              which forces a kind of patience into every session. I still
              develop and scan everything myself in a small darkroom off my
              studio in Thakurpukur.
            </p>
            <div className="mt-8">
              <Button to="/booking">Work with me</Button>
            </div>
          </div>

          <div className="aspect-[4/5] overflow-hidden border border-ink-line">
            <img
              src={galleryData[18].src}
              alt="Marlowe Reyes at work"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-ink-line py-16 sm:py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Timeline" title="A short version of a long story" />

          <div className="mt-12 space-y-0 divide-y divide-ink-line border-y border-ink-line">
            {timeline.map((item) => (
              <div key={item.year} className="grid gap-2 py-6 sm:grid-cols-[120px_1fr] sm:gap-8">
                <span className="font-mono text-sm text-safelight">{item.year}</span>
                <p className="text-[15px] text-parchment-dim">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-8 sm:grid-cols-3">
          <div className="border border-ink-line p-8">
            <p className="font-display text-3xl text-safelight">150+</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
              Event shot
            </p>
          </div>
          <div className="border border-ink-line p-8">
            <p className="font-display text-3xl text-safelight">200+</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
              Creative and conceptual shoot
            </p>
          </div>
          <div className="border border-ink-line p-8">
            <p className="font-display text-3xl text-safelight">150+</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
              Students taught
            </p>
          </div>
           <div className="border border-ink-line p-8">
            <p className="font-display text-3xl text-safelight">500+</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
              Bridal
            </p>
          </div>
          <div className="border border-ink-line p-8">
            <p className="font-display text-3xl text-safelight">25+</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest2 text-parchment-dim">
              Workshop
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
