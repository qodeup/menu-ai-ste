import { useState, useMemo } from 'react'
import { useLang } from '../../context/LanguageContext'
import { useMenu } from '../../context/MenuContext'
import { useLayout } from '../../context/LayoutContext'
import { defaults } from './config'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import CategoryDescription from './components/CategoryDescription'
import ProductGrid from './components/ProductGrid'
import SettingsPanel from './components/SettingsPanel'
import './layout.css'

export default function EatalyLayout() {
  const { lang } = useLang()
  const { categories, loading, error } = useMenu()
  const { configOverride } = useLayout()
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [navStyle, setNavStyle] = useState(1)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const config = useMemo(() => ({ ...defaults, ...configOverride }), [configOverride])
  const [primaryColor, setPrimaryColor] = useState(config.primaryColor)
  const [titleColor, setTitleColor] = useState('black')

  const activeId = activeCategoryId ?? categories[0]?.id ?? null
  const activeCategory = categories.find(c => c.id === activeId) ?? null

  const cssVars = {
    '--color-primary': primaryColor,
    '--title-color': titleColor === 'primary' ? 'var(--color-primary)' : '#1a1a1a',
    '--section-title-color': titleColor === 'primary' ? '#1a1a1a' : 'var(--color-primary)',
  }

  if (loading) {
    return (
      <div className="layout" style={cssVars}>
        <Header onSettingsOpen={() => setSettingsOpen(true)} />
        <div className="loading">
          <div className="loading__spinner" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="layout" style={cssVars}>
        <Header onSettingsOpen={() => setSettingsOpen(true)} />
        <div className="loading">
          <p className="loading__error">Failed to load menu: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="layout" style={cssVars}>
      <Header onSettingsOpen={() => setSettingsOpen(true)} />
      <main className="main">
        <h1 className="hero-title">{config.heroTitle}</h1>
        <div className="nav-sticky">
          <CategoryNav active={activeId} onChange={setActiveCategoryId} navStyle={navStyle} />
        </div>
        <div className="content">
          <CategoryDescription category={activeCategory} />
          {activeId && <ProductGrid category={activeId} />}
        </div>
      </main>

      {settingsOpen && (
        <SettingsPanel
          navStyle={navStyle}
          setNavStyle={setNavStyle}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          titleColor={titleColor}
          setTitleColor={setTitleColor}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  )
}
