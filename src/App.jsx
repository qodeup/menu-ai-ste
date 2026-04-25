import { useState } from 'react'
import { LanguageProvider, useLang } from './context/LanguageContext'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import CategoryDescription from './components/CategoryDescription'
import ProductGrid from './components/ProductGrid'
import { categories } from './data/menu'
import './App.css'

function MenuApp() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id)
  const { lang } = useLang()
  const activeCategory = categories.find(c => c.id === activeCategoryId)

  return (
    <div className="layout">
      <Header />
      <main className="main">
        <h1 className="hero-title">menu</h1>
        <div className="nav-sticky">
          <CategoryNav active={activeCategoryId} onChange={setActiveCategoryId} />
        </div>
        <div className="content">
          <CategoryDescription category={activeCategory} />
          <ProductGrid category={activeCategoryId} />
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <MenuApp />
    </LanguageProvider>
  )
}
