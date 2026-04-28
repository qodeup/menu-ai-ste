import { lazy, Suspense } from 'react'
import { LayoutProvider, useLayout } from './context/LayoutContext'
import { LanguageProvider } from './context/LanguageContext'
import { MenuProvider } from './context/MenuContext'

const LAYOUTS = {
  qodeup:     lazy(() => import('./layouts/qodeup/index.jsx')),
  signorvino: lazy(() => import('./layouts/signorvino/index.jsx')),
  fradiavolo: lazy(() => import('./layouts/fradiavolo/index.jsx')),
  berbere:    lazy(() => import('./layouts/berbere/index.jsx')),
  eataly:     lazy(() => import('./layouts/eataly/index.jsx')),
}

function ActiveLayout() {
  const { layoutId } = useLayout()
  const Layout = LAYOUTS[layoutId] ?? LAYOUTS.qodeup
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <Layout />
    </Suspense>
  )
}

export default function App() {
  return (
    <LayoutProvider>
      <LanguageProvider>
        <MenuProvider>
          <ActiveLayout />
        </MenuProvider>
      </LanguageProvider>
    </LayoutProvider>
  )
}
