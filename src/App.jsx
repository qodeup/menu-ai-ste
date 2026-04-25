import { useState } from 'react'
import { LanguageProvider, useLang } from './context/LanguageContext'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import ProductGrid from './components/ProductGrid'
import { categories } from './data/menu'
import './App.css'

const HERO = {
  it: 'Il Nostro Menu',
  en: 'Our Menu',
}

function MenuApp() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id)
  const { lang } = useLang()

  return (
    <div className="layout">
      <Header />
      <main className="main">
        <h1 className="hero-title">{HERO[lang]}</h1>
        <div className="nav-sticky">
          <CategoryNav active={activeCategory} onChange={setActiveCategory} />
        </div>
        <ProductGrid category={activeCategory} />
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
