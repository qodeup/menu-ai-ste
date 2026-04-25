import { useLang } from '../context/LanguageContext'
import './CategoryDescription.css'

export default function CategoryDescription({ category }) {
  const { lang } = useLang()
  if (!category?.description) return null
  return (
    <div className="cat-desc">
      <p className="cat-desc__text">{category.description[lang]}</p>
    </div>
  )
}
