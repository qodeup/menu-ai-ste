import { useState } from 'react'
import { LANGUAGES, useLang } from '../../../context/LanguageContext'
import LanguageModal from './LanguageModal'
import './Header.css'

export default function Header({ onSettingsOpen }) {
  const { lang } = useLang()
  const [modalOpen, setModalOpen] = useState(false)
  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src="/logoEataly.svg" alt="Eataly" className="header__logo-img" />
        </div>

        <div className="header__actions">
          <button className="lang-trigger" onClick={() => setModalOpen(true)}>
            <span className="lang-trigger__flag">{current.flag}</span>
            <span className="lang-trigger__code">{current.code.toUpperCase()}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="hamburger-btn" onClick={onSettingsOpen} aria-label="Impostazioni">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <rect width="18" height="2" rx="1" fill="currentColor"/>
              <rect y="5" width="18" height="2" rx="1" fill="currentColor"/>
              <rect y="10" width="18" height="2" rx="1" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </header>

      {modalOpen && <LanguageModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
