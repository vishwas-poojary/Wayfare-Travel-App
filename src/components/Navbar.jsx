import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? 'text-gold-500' : 'text-sand-100/80 hover:text-sand-50'}`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-ink-900/90 backdrop-blur-md shadow-soft' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Primary">
        <Link to="/" className="font-display text-xl tracking-tight text-sand-50">
          Wayfare
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/explore" className={linkClass}>
            Explore
          </NavLink>
          <a href="/explore#assistant" className="text-sm text-sand-100/80 transition-colors hover:text-sand-50">
            Plan a trip
          </a>
        </div>

        <button
          className="rounded-md p-2 text-sand-50 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-sand-50/10 bg-ink-900/95 px-5 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-4">
            <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/explore" className={linkClass} onClick={() => setOpen(false)}>
              Explore
            </NavLink>
            <a href="/explore#assistant" className="text-sm text-sand-100/80" onClick={() => setOpen(false)}>
              Plan a trip
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
