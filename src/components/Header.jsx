import { useState } from 'react'
import { LANGUAGES, useLang } from '../context/LanguageContext'
import LanguageModal from './LanguageModal'
import './Header.css'

export default function Header() {
  const { lang } = useLang()
  const [modalOpen, setModalOpen] = useState(false)
  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src="/logo.png" alt="Qodeup" className="header__logo-img" />
        </div>

        <button className="lang-trigger" onClick={() => setModalOpen(true)}>
          <span className="lang-trigger__flag">{current.flag}</span>
          <span className="lang-trigger__code">{current.code.toUpperCase()}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      {modalOpen && <LanguageModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
