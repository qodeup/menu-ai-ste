import { useState } from 'react'
import { LanguageProvider, useLang } from './context/LanguageContext'
import { MenuProvider, useMenu } from './context/MenuContext'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import CategoryDescription from './components/CategoryDescription'
import ProductGrid from './components/ProductGrid'
import './App.css'

function MenuApp() {
  const { lang } = useLang()
  const { categories, loading, error } = useMenu()
  const [activeCategoryId, setActiveCategoryId] = useState(null)

  const activeId = activeCategoryId ?? categories[0]?.id ?? null
  const activeCategory = categories.find(c => c.id === activeId) ?? null

  if (loading) {
    return (
      <div className="layout">
        <Header />
        <div className="loading">
          <div className="loading__spinner" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="layout">
        <Header />
        <div className="loading">
          <p className="loading__error">Failed to load menu: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="layout">
      <Header />
      <main className="main">
        <h1 className="hero-title">menu</h1>
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

export default function App() {
  return (
    <LanguageProvider>
      <MenuProvider>
        <MenuApp />
      </MenuProvider>
    </LanguageProvider>
  )
}
