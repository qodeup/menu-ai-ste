import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { products } from '../data/menu'
import AllergenModal from './AllergenModal'
import './ProductGrid.css'

function formatPrice(price) {
  if (Number.isInteger(price)) return String(price)
  const one = parseFloat(price.toFixed(1))
  return one === price ? price.toFixed(1) : price.toFixed(2)
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

export default function ProductGrid({ category }) {
  const { lang } = useLang()
  const [selected, setSelected] = useState(null)
  const items = products[category] ?? []

  return (
    <>
      <div className="product-list">
        {items.map((item, index) => (
          <article key={item.id} className="product-row">
            {index > 0 && <div className="product-divider" />}
            <div className="product-row__main">
              <div className="product-row__info">
                <h3 className="product-row__name">{item.name[lang]}</h3>
                <p className="product-row__desc">
                  {item.description[lang]}
                  {item.allergens.length > 0 && (
                    <button
                      className="info-btn"
                      onClick={() => setSelected(item)}
                      aria-label="Informazioni allergeni"
                    >
                      <InfoIcon />
                    </button>
                  )}
                </p>
              </div>
              <span className="product-row__price">{formatPrice(item.price)}</span>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <AllergenModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
