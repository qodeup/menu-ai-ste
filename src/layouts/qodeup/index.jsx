import { useState, useMemo } from 'react'
import { useLang } from '../../context/LanguageContext'
import { useMenu } from '../../context/MenuContext'
import { useLayout } from '../../context/LayoutContext'
import { defaults } from './config'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import CategoryDescription from './components/CategoryDescription'
import ProductGrid from './components/ProductGrid'
import './layout.css'

export default function QodeupLayout() {
  const { lang } = useLang()
  const { categories, loading, error } = useMenu()
  const { configOverride } = useLayout()
  const [activeCategoryId, setActiveCategoryId] = useState(null)

  const config = useMemo(() => ({ ...defaults, ...configOverride }), [configOverride])

  const activeId = activeCategoryId ?? categories[0]?.id ?? null
  const activeCategory = categories.find(c => c.id === activeId) ?? null

  const cssVars = { '--color-primary': config.primaryColor }

  if (loading) {
    return (
      <div className="layout" style={cssVars}>
        <Header />
        <div className="loading">
          <div className="loading__spinner" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="layout" style={cssVars}>
        <Header />
        <div className="loading">
          <p className="loading__error">Failed to load menu: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="layout" style={cssVars}>
      <Header />
      <main className="main">
        <h1 className="hero-title">{config.heroTitle}</h1>
        <div className="nav-sticky">
          <CategoryNav active={activeId} onChange={setActiveCategoryId} />
        </div>
        <div className="content">
          <CategoryDescription category={activeCategory} />
          {activeId && <ProductGrid category={activeId} />}
        </div>
      </main>
    </div>
  )
}
