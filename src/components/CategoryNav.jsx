import { useRef } from 'react'
import { useLang } from '../context/LanguageContext'
import { useMenu } from '../context/MenuContext'
import './CategoryNav.css'

export default function CategoryNav({ active, onChange }) {
  const { lang } = useLang()
  const { categories } = useMenu()
  const trackRef = useRef(null)
  const dragRef = useRef({ dragging: false, startX: 0, scrollLeft: 0 })

  function onMouseDown(e) {
    const d = dragRef.current
    d.dragging = true
    d.startX = e.pageX - trackRef.current.offsetLeft
    d.scrollLeft = trackRef.current.scrollLeft
  }

  function onMouseMove(e) {
    const d = dragRef.current
    if (!d.dragging) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = d.scrollLeft - (x - d.startX)
  }

  function onMouseUp() {
    dragRef.current.dragging = false
  }

  return (
    <nav
      className="cat-nav"
      ref={trackRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`cat-btn ${active === cat.id ? 'cat-btn--active' : ''}`}
          onClick={() => onChange(cat.id)}
        >
          {cat.label[lang]}
        </button>
      ))}
    </nav>
  )
}
