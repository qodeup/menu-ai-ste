const ALLERGEN_MAP = {
  milk: 'dairy', gluten: 'gluten', eggs: 'eggs', fish: 'fish',
  sulphites: 'sulphites', soy: 'soy', nuts: 'nuts', peanuts: 'peanuts',
  celery: 'celery', crustaceans: 'crustaceans', lupin: 'lupin',
  molluscs: 'molluscs', mustard: 'mustard', sesame: 'sesame',
}

function loc(localizations, lang, field) {
  return localizations?.find(l => l.language === lang)?.[field] ?? ''
}

function mapAllergens(raw = []) {
  return raw.map(a => ALLERGEN_MAP[a]).filter(Boolean)
}

function adaptProduct(p) {
  const tags = p.dietary?.tags ?? []
  return {
    id: p.id,
    name: {
      it: loc(p.localizations, 'it', 'name'),
      en: loc(p.localizations, 'en', 'name'),
    },
    description: {
      it: loc(p.localizations, 'it', 'description'),
      en: loc(p.localizations, 'en', 'description'),
    },
    price: (p.price?.amount ?? 0) / 100,
    photo: p.images?.find(i => i.kind === 'thumb')?.url ?? null,
    vegetarian: tags.includes('vegetarian'),
    vegan: tags.includes('vegan'),
    glutenFree: tags.includes('gluten-free'),
    spicy: tags.includes('spicy'),
    frozen: p.storage === 'frozen',
    allergens: mapAllergens(p.dietary?.allergens),
    traces: mapAllergens(p.dietary?.traces),
  }
}

function adaptSection(s) {
  return {
    sectionId: s.id,
    sectionLabel: {
      it: loc(s.localizations, 'it', 'name'),
      en: loc(s.localizations, 'en', 'name'),
    },
    items: (s.products ?? [])
      .filter(p => !p.hidden)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(adaptProduct),
  }
}

export function adaptMenu(json) {
  const sorted = [...(json.categories ?? [])].sort((a, b) => a.sortOrder - b.sortOrder)

  const categories = sorted.map(c => {
    const descIt = loc(c.localizations, 'it', 'description')
    const descEn = loc(c.localizations, 'en', 'description')
    return {
      id: c.id,
      label: {
        it: loc(c.localizations, 'it', 'name'),
        en: loc(c.localizations, 'en', 'name'),
      },
      description: descIt || descEn ? { it: descIt, en: descEn } : null,
    }
  })

  const products = {}
  for (const cat of sorted) {
    products[cat.id] = [...(cat.sections ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(adaptSection)
  }

  return { categories, products }
}
