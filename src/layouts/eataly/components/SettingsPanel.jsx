import { useEffect } from 'react'
import './SettingsPanel.css'

const COLOR_OPTIONS = ['#7d4000', '#f8ae00', '#003f37']

export default function SettingsPanel({ navStyle, setNavStyle, primaryColor, setPrimaryColor, titleColor, setTitleColor, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="sp-overlay" onClick={onClose}>
      <div className="sp-panel" onClick={e => e.stopPropagation()}>
        <div className="sp-handle" />

        <div className="sp-header">
          <span className="sp-title">Impostazioni</span>
          <button className="sp-close" onClick={onClose}>✕</button>
        </div>

        <div className="sp-body">

          <div className="sp-section-label">Colore primario</div>
          <div className="sp-colors">
            {COLOR_OPTIONS.map(color => (
              <button
                key={color}
                className={`sp-color-swatch ${primaryColor === color ? 'sp-color-swatch--active' : ''}`}
                style={{ background: color }}
                onClick={() => setPrimaryColor(color)}
                aria-label={color}
              />
            ))}
          </div>

          <div className="sp-divider" />

          <div className="sp-section-label">Colore titoli prodotti</div>
          <div className="sp-toggle">
            <button
              className={`sp-toggle__btn ${titleColor === 'black' ? 'sp-toggle__btn--active' : ''}`}
              onClick={() => setTitleColor('black')}
            >Nero</button>
            <button
              className={`sp-toggle__btn ${titleColor === 'primary' ? 'sp-toggle__btn--active' : ''}`}
              onClick={() => setTitleColor('primary')}
            >Colore primario</button>
          </div>

          <div className="sp-divider" />

          <div className="sp-section-label">Stile navigazione</div>
          <div className="sp-options">

            <button
              className={`sp-nav-option ${navStyle === 1 ? 'sp-nav-option--active' : ''}`}
              onClick={() => setNavStyle(1)}
            >
              <div className="sp-preview sp-preview--underline" style={{ '--sp-color': primaryColor }}>
                <div className="sp-preview__bar">
                  <span className="sp-preview__tab sp-preview__tab--sel-underline">Tab</span>
                  <span className="sp-preview__tab">Tab</span>
                </div>
              </div>
              <span className="sp-nav-option__label">Sottolineato</span>
            </button>

            <button
              className={`sp-nav-option ${navStyle === 2 ? 'sp-nav-option--active' : ''}`}
              onClick={() => setNavStyle(2)}
            >
              <div className="sp-preview sp-preview--pill" style={{ '--sp-color': primaryColor }}>
                <div className="sp-preview__bar">
                  <span className="sp-preview__tab sp-preview__tab--sel-pill">Tab</span>
                  <span className="sp-preview__tab">Tab</span>
                </div>
              </div>
              <span className="sp-nav-option__label">Pillola</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
