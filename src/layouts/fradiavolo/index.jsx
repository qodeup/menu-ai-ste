import { useMemo } from 'react'
import { useLayout } from '../../context/LayoutContext'
import { defaults } from './config'

export default function FraDiavoloLayout() {
  const { configOverride } = useLayout()
  const config = useMemo(() => ({ ...defaults, ...configOverride }), [configOverride])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: config.primaryColor, fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Fra Diavolo</h1>
        <p style={{ fontSize: '0.9rem', color: config.spicyAccent, letterSpacing: '0.1em' }}>Layout in costruzione</p>
      </div>
    </div>
  )
}
