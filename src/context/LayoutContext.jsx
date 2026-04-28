import { createContext, useContext, useMemo } from 'react'

const LayoutContext = createContext(null)

const layoutId = (() => {
  const params = new URLSearchParams(window.location.search)
  return params.get('layout') || import.meta.env.VITE_LAYOUT || 'qodeup'
})()

export function LayoutProvider({ children }) {
  const configOverride = useMemo(() => {
    try {
      return JSON.parse(import.meta.env.VITE_LAYOUT_CONFIG || '{}')
    } catch {
      return {}
    }
  }, [])

  return (
    <LayoutContext.Provider value={{ layoutId, configOverride }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  return useContext(LayoutContext)
}
