import { useLang } from '../context/LanguageContext'
import { products } from '../data/menu'
import './ProductGrid.css'

const ALLERGEN_ICONS = {
  gluten: { label: { it: 'Glutine', en: 'Gluten' }, icon: '🌾' },
  dairy: { label: { it: 'Latticini', en: 'Dairy' }, icon: '🧀' },
  eggs: { label: { it: 'Uova', en: 'Eggs' }, icon: '🥚' },
  fish: { label: { it: 'Pesce', en: 'Fish' }, icon: '🐟' },
  sulphites: { label: { it: 'Solfiti', en: 'Sulphites' }, icon: '🍷' },
}

export default function ProductGrid({ category }) {
  const { lang } = useLang()
  const items = products[category] ?? []

  return (
    <div className="product-grid">
      {items.map((item) => (
        <article key={item.id} className="product-card">
          <div className="product-card__body">
            <h3 className="product-card__name">{item.name[lang]}</h3>
            <p className="product-card__desc">{item.description[lang]}</p>
            {item.allergens.length > 0 && (
              <div className="product-card__allergens">
                {item.allergens.map((a) => (
                  <span key={a} className="allergen-tag" title={ALLERGEN_ICONS[a]?.label[lang]}>
                    {ALLERGEN_ICONS[a]?.icon} {ALLERGEN_ICONS[a]?.label[lang]}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="product-card__price">
            € {item.price.toFixed(2)}
          </div>
        </article>
      ))}
    </div>
  )
}
