import { useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import './AllergenModal.css'

const ALLERGENS = {
  gluten:    { it: 'Glutine',          en: 'Gluten',      icon: '🌾' },
  dairy:     { it: 'Latticini',        en: 'Dairy',       icon: '🧀' },
  eggs:      { it: 'Uova',            en: 'Eggs',        icon: '🥚' },
  fish:      { it: 'Pesce',           en: 'Fish',        icon: '🐟' },
  sulphites: { it: 'Solfiti',         en: 'Sulphites',   icon: '🍷' },
  soy:       { it: 'Soia',            en: 'Soy',         icon: '🫘' },
  nuts:      { it: 'Frutta a guscio', en: 'Tree nuts',   icon: '🥜' },
  peanuts:   { it: 'Arachidi',        en: 'Peanuts',     icon: '🥜' },
}

const LABELS = {
  allergens:   { it: 'Allergeni',                        en: 'Allergens' },
  traces:      { it: 'Può contenere tracce di',          en: 'May contain traces of' },
  noAllergens: { it: 'Nessun allergene dichiarato',      en: 'No declared allergens' },
  badges: {
    vegetarian: { it: 'Vegetariano', en: 'Vegetarian' },
    vegan:      { it: 'Vegano',      en: 'Vegan' },
    glutenFree: { it: 'Senza glutine', en: 'Gluten free' },
    spicy:      { it: 'Piccante',    en: 'Spicy' },
    frozen:     { it: 'Surgelato',   en: 'Frozen' },
  },
}

const BADGES = [
  { key: 'vegetarian', icon: '🌿', color: '#2e7d32' },
  { key: 'vegan',      icon: '🌱', color: '#388e3c' },
  { key: 'glutenFree', icon: '🌾', color: '#f57c00' },
  { key: 'spicy',      icon: '🌶️',  color: '#c62828' },
  { key: 'frozen',     icon: '❄️',  color: '#0277bd' },
]

export default function InfoSheet({ item, onClose }) {
  const { lang } = useLang()

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const activeBadges = BADGES.filter(b => item[b.key])

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet__handle" />

        {item.photo ? (
          <div className="sheet__photo">
            <img src={item.photo} alt={item.name[lang]} />
          </div>
        ) : (
          <div className="sheet__photo-placeholder">
            <span>📷</span>
          </div>
        )}

        <div className="sheet__header">
          <span className="sheet__title">{item.name[lang]}</span>
          <button className="sheet__close" onClick={onClose}>✕</button>
        </div>

        <div className="sheet__body">
          {activeBadges.length > 0 && (
            <div className="badge-row">
              {activeBadges.map(b => (
                <span key={b.key} className="badge" style={{ '--badge-color': b.color }}>
                  <span>{b.icon}</span>
                  <span>{LABELS.badges[b.key][lang]}</span>
                </span>
              ))}
            </div>
          )}

          <p className="sheet__section-label">{LABELS.allergens[lang]}</p>
          {item.allergens.length === 0 ? (
            <p className="sheet__empty">{LABELS.noAllergens[lang]}</p>
          ) : (
            <ul className="allergen-list">
              {item.allergens.map(a => (
                <li key={a} className="allergen-item">
                  <span className="allergen-item__icon">{ALLERGENS[a]?.icon}</span>
                  <span className="allergen-item__name">{ALLERGENS[a]?.[lang]}</span>
                </li>
              ))}
            </ul>
          )}

          {item.traces?.length > 0 && (
            <>
              <p className="sheet__section-label sheet__section-label--traces">{LABELS.traces[lang]}</p>
              <p className="sheet__traces">
                {item.traces.map(a => ALLERGENS[a]?.[lang]).filter(Boolean).join(', ')}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
