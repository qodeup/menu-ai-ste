import { useEffect } from 'react'
import { useLang } from '../context/LanguageContext'
import './AllergenModal.css'

const ALLERGENS = {
  gluten:    { label: { it: 'Glutine', en: 'Gluten' }, icon: '🌾' },
  dairy:     { label: { it: 'Latticini', en: 'Dairy' }, icon: '🧀' },
  eggs:      { label: { it: 'Uova', en: 'Eggs' }, icon: '🥚' },
  fish:      { label: { it: 'Pesce', en: 'Fish' }, icon: '🐟' },
  sulphites: { label: { it: 'Solfiti', en: 'Sulphites' }, icon: '🍷' },
}

const LABELS = {
  allergens: { it: 'Allergeni', en: 'Allergens' },
  noInfo:    { it: 'Nessun allergene dichiarato.', en: 'No declared allergens.' },
}

export default function AllergenModal({ item, onClose }) {
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

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet__handle" />
        <div className="sheet__header">
          <span className="sheet__title">{item.name[lang]}</span>
          <button className="sheet__close" onClick={onClose}>✕</button>
        </div>
        <div className="sheet__body">
          <p className="sheet__section-label">{LABELS.allergens[lang]}</p>
          {item.allergens.length === 0 ? (
            <p className="sheet__empty">{LABELS.noInfo[lang]}</p>
          ) : (
            <ul className="allergen-list">
              {item.allergens.map(a => (
                <li key={a} className="allergen-item">
                  <span className="allergen-item__icon">{ALLERGENS[a]?.icon}</span>
                  <span className="allergen-item__name">{ALLERGENS[a]?.label[lang]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
