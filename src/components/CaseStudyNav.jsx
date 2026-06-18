import { useState, useEffect } from 'react'

export default function CaseStudyNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const goTo = (id) => {
    window.location.href = `/#${id}`
    setMenuOpen(false)
  }

  const sections = ['about', 'experience', 'projects', 'technologies', 'contact']

  return (
    <nav className="nav nav--solid">
      <ul className="nav__links">
        {sections.map(s => (
          <li key={s}>
            <button onClick={() => goTo(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <button className="nav__hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
      </button>

      {menuOpen && (
        <div className="nav__mobile">
          {sections.map(s => (
            <button key={s} onClick={() => goTo(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
