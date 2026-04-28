import { useState, useEffect, useRef } from 'react'
import { useLang } from '../../../context/LanguageContext'
import { useMenu } from '../../../context/MenuContext'
import AllergenModal from './AllergenModal'
import './ProductGrid.css'

function fmt(price) {
  if (price == null) return ''
  if (Number.isInteger(price)) return String(price)
  const one = parseFloat(price.toFixed(1))
  return one === price ? price.toFixed(1) : price.toFixed(2)
}

const PRICE_LABELS = {
  glass:  { it: 'bic.', en: 'glass' },
  bottle: { it: 'bot.', en: 'bottle' },
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="8"/>
      <path d="M8 7v5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="4.5" r="0.85" fill="white"/>
    </svg>
  )
}

function hasInfo(item) {
  return item.allergens?.length > 0 || item.traces?.length > 0 ||
    item.vegetarian || item.vegan || item.glutenFree || item.spicy || item.frozen
}

function ProductRow({ item, onSelect, lang, isFirst }) {
  const isDual = item.priceGlass != null && item.priceBottle != null
  return (
    <article className="product-row">
      {!isFirst && <div className="product-divider" />}
      <div className="product-row__main">
        <div className="product-row__info">
          <div className="product-row__name-row">
            <h3 className="product-row__name">{item.name[lang]}</h3>
            {hasInfo(item) && (
              <button className="info-btn" onClick={() => onSelect(item)} aria-label="Informazioni prodotto">
                <InfoIcon />
              </button>
            )}
          </div>
          <p className="product-row__desc">{item.description[lang]}</p>
        </div>
        {isDual ? (
          <div className="product-row__dual-price">
            <span className="dual-price__item">
              <span className="dual-price__label">{PRICE_LABELS.glass[lang]}</span>
              <span className="dual-price__value">{fmt(item.priceGlass)}</span>
            </span>
            <span className="dual-price__item">
              <span className="dual-price__label">{PRICE_LABELS.bottle[lang]}</span>
              <span className="dual-price__value">{fmt(item.priceBottle)}</span>
            </span>
          </div>
        ) : (
          <span className="product-row__price">{fmt(item.price)}</span>
        )}
      </div>
    </article>
  )
}

export default function ProductGrid({ category }) {
  const { lang } = useLang()
  const { products } = useMenu()
  const [selected, setSelected] = useState(null)
  const [displayed, setDisplayed] = useState(category)
  const [phase, setPhase] = useState('idle')
  const timerRef = useRef(null)

  useEffect(() => {
    if (category === displayed) return
    clearTimeout(timerRef.current)
    setPhase('out')
    timerRef.current = setTimeout(() => {
      setDisplayed(category)
      setPhase('in')
      timerRef.current = setTimeout(() => setPhase('idle'), 220)
    }, 160)
    return () => clearTimeout(timerRef.current)
  }, [category])

  const sections = products[displayed]

  // Flat list (legacy format: array of items directly)
  if (sections && !sections[0]?.sectionId) {
    const items = sections
    return (
      <>
        <div className={`product-list product-list--${phase}`}>
          {items.map((item, i) => (
            <ProductRow key={item.id} item={item} onSelect={setSelected} lang={lang} isFirst={i === 0} />
          ))}
        </div>
        {selected && <AllergenModal item={selected} onClose={() => setSelected(null)} />}
      </>
    )
  }

  // Sectioned format
  return (
    <>
      <div className={`product-list product-list--${phase}`}>
        {(sections ?? []).map((section, si) => (
          <div key={section.sectionId} className="product-section">
            <h2 className="product-section__title">{section.sectionLabel[lang]}</h2>
            {section.items.map((item, i) => (
              <ProductRow key={item.id} item={item} onSelect={setSelected} lang={lang} isFirst={i === 0} />
            ))}
          </div>
        ))}
      </div>
      {selected && <AllergenModal item={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
