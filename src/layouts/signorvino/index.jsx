import { useMemo } from 'react'
import { useLayout } from '../../context/LayoutContext'
import { defaults } from './config'

export default function SignorVinoLayout() {
  const { configOverride } = useLayout()
  const config = useMemo(() => ({ ...defaults, ...configOverride }), [configOverride])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdf6ee', fontFamily: 'Georgia, serif' }}>
      <div style={{ textAlign: 'center', color: config.accentColor }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Signor Vino</h1>
        <p style={{ fontSize: '0.9rem', color: '#999', letterSpacing: '0.1em' }}>Layout in costruzione</p>
      </div>
    </div>
  )
}
