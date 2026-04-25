import { createContext, useContext, useState, useEffect } from 'react'
import { adaptMenu } from '../data/adapter'
import { adaptMonolithMenuStructure, adaptMonolithSectionProducts } from '../data/monolithAdapter'
import { useLang } from './LanguageContext'

const MenuContext = createContext({ categories: [], products: {}, loading: true })

const MONOLITH_BASE = (import.meta.env.VITE_MONOLITH_BASE_URL ?? '').replace(/\/$/, '')
const BUSINESS_ID = import.meta.env.VITE_BUSINESS_ID ?? ''
const MENU_ID = import.meta.env.VITE_MENU_ID ?? '0'

// Fetches from static public/menu.json — supports all languages in a single load.
function StaticLoader({ setState }) {
  useEffect(() => {
    fetch('/menu.json')
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json() })
      .then(json => setState({ ...adaptMenu(json), loading: false, error: null }))
      .catch(err => setState(s => ({ ...s, loading: false, error: err.message })))
  }, [])
  return null
}

// Fetches from the Qodeup monolith API. Re-fetches on language change since the
// monolith returns products already translated into the requested language.
function MonolithLoader({ setState }) {
  const { lang } = useLang()

  useEffect(() => {
    setState(s => ({ ...s, loading: true, error: null }))
    const controller = new AbortController()

    async function load() {
      const menuRes = await fetch(
        `${MONOLITH_BASE}/businesses/${BUSINESS_ID}/menu/${lang}?menu=${MENU_ID}&group_by=type`,
        { signal: controller.signal }
      )
      if (!menuRes.ok) throw new Error(menuRes.statusText)
      const menuJson = await menuRes.json()

      const { categories, allSections } = adaptMonolithMenuStructure(menuJson.data, lang)

      const sectionResults = await Promise.all(
        Object.values(allSections).map(async section => {
          const r = await fetch(
            `${MONOLITH_BASE}/businesses/${BUSINESS_ID}/section/${section.sectionId}/${lang}?menu=${MENU_ID}`,
            { signal: controller.signal }
          )
          if (!r.ok) return null
          const json = await r.json()
          return { ...section, sectionData: json.data }
        })
      )

      const products = {}
      for (const cat of categories) products[cat.id] = []

      for (const result of sectionResults) {
        if (!result) continue
        const { catId, sectionId, name, ordering, sectionData } = result
        if (!products[catId]) products[catId] = []
        products[catId].push({
          sectionId,
          sectionLabel: name,
          ordering,
          items: adaptMonolithSectionProducts(sectionData, lang),
        })
      }

      for (const catId of Object.keys(products)) {
        products[catId].sort((a, b) => a.ordering - b.ordering)
      }

      setState({ categories, products, loading: false, error: null })
    }

    load().catch(err => {
      if (err.name === 'AbortError') return
      setState(s => ({ ...s, loading: false, error: err.message }))
    })

    return () => controller.abort()
  }, [lang])

  return null
}

const useMonolith = !!(MONOLITH_BASE && BUSINESS_ID)

export function MenuProvider({ children }) {
  const [state, setState] = useState({ categories: [], products: {}, loading: true, error: null })

  return (
    <MenuContext.Provider value={state}>
      {useMonolith
        ? <MonolithLoader setState={setState} />
        : <StaticLoader setState={setState} />
      }
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  return useContext(MenuContext)
}
