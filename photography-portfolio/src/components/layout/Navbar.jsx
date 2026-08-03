import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { House } from 'lucide-react'

const links = [
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/blog', label: 'Journal' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-ink-line bg-ink/90 backdrop-blur'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <NavLink to="/" className="group flex items-baseline gap-2">
         <span className="inline-block cursor-pointer font-display text-xl font-medium tracking-wide text-parchment transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          Bapan Mondal
          <br />
          Photography Academy
        </span>
          {/* <span className="hidden font-mono text-[10px] uppercase tracking-widest2 text-safelight sm:inline">
             <House />
          </span> */}
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
                  isActive
                    ? 'text-safelight'
                    : 'text-parchment-dim hover:text-parchment'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/booking" className="btn-primary">
            Book Seat
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-ink-line md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`h-px w-5 bg-parchment transition-transform ${
              menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-5 bg-parchment transition-transform ${
              menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-ink-line bg-ink md:hidden">
          <div className="container-page flex flex-col py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `border-b border-ink-line py-3 font-mono text-xs uppercase tracking-widest2 last:border-none ${
                    isActive ? 'text-safelight' : 'text-parchment-dim'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/booking"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-4"
            >
              Book a Session
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
