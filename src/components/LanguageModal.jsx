import { useEffect } from 'react'
import { LANGUAGES, useLang } from '../context/LanguageContext'
import './LanguageModal.css'

export default function LanguageModal({ onClose }) {
  const { lang, setLang } = useLang()

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function select(code) {
    setLang(code)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <span className="modal__title">Seleziona lingua</span>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="modal__grid">
          {LANGUAGES.map(({ code, label, flag }) => (
            <button
              key={code}
              className={`lang-option ${lang === code ? 'lang-option--active' : ''}`}
              onClick={() => select(code)}
            >
              <span className="lang-option__flag">{flag}</span>
              <span className="lang-option__label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
