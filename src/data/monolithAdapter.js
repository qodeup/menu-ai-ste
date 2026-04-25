// Monolith allergen keys → internal keys (all 14 EU major allergens)
const ALLERGEN_MAP = {
  gluten: 'gluten',
  milk: 'dairy',
  eggs: 'eggs',
  fish: 'fish',
  sulphur: 'sulphites',
  soya: 'soy',
  nuts: 'nuts',
  peanuts: 'peanuts',
  celery: 'celery',
  crustaceans: 'crustaceans',
  lupin: 'lupin',
  molluscs: 'molluscs',
  mustard: 'mustard',
  sesame: 'sesame',
}

// Monolith price codes for wine and beer
const WINE_GLASS_CODES = ['wg01', 'wg02']
const WINE_BOTTLE_CODES = ['wb01', 'wbl01']
const BEER_GLASS_CODES = ['bg01', 'bg02', 'bg03', 'bg04']
const BEER_BOTTLE_CODES = ['bb01', 'bb02']

function boolMapToKeys(map = {}) {
  return Object.entries(map)
    .filter(([, v]) => v)
    .map(([k]) => ALLERGEN_MAP[k])
    .filter(Boolean)
}

function extractPrice(product) {
  const prices = Object.values(product.prices ?? {})

  if (product.wine || product.beer) {
    const glassCodes = product.wine ? WINE_GLASS_CODES : BEER_GLASS_CODES
    const bottleCodes = product.wine ? WINE_BOTTLE_CODES : BEER_BOTTLE_CODES
    const glassPrice = prices.find(p => glassCodes.includes(p.code))?.price ?? null
    const bottlePrice = prices.find(p => bottleCodes.includes(p.code))?.price ?? null
    if (glassPrice != null || bottlePrice != null) {
      return { priceGlass: glassPrice, priceBottle: bottlePrice }
    }
  }

  const firstPrice = prices.find(p => p.price != null)?.price ?? null
  return { price: firstPrice }
}

function adaptProduct(id, product, lang) {
  const priceData = extractPrice(product)
  const photo = Object.values(product.media ?? {}).find(m => m.type === 'image')?.url ?? null

  return {
    id,
    name: { [lang]: product.name ?? '' },
    description: { [lang]: product.description ?? '' },
    photo,
    vegetarian: product.vegetarian ?? false,
    vegan: product.vegan ?? false,
    glutenFree: product.gluten_free ?? false,
    spicy: product.spicy ?? false,
    frozen: product.frozen ?? false,
    allergens: boolMapToKeys(product.allergenics),
    traces: boolMapToKeys(product.may_contain),
    ...priceData,
    _ordering: parseFloat(product.ordering ?? '0'),
  }
}

export function adaptMonolithSectionProducts(sectionData, lang) {
  return Object.entries(sectionData?.products ?? {})
    .map(([id, product]) => adaptProduct(id, product, lang))
    .sort((a, b) => a._ordering - b._ordering)
    .map(({ _ordering, ...rest }) => rest)
}

// Parses the menu structure response (categories + sections, no products).
// menuData = response.data from GET /businesses/{id}/menu/{lang}?group_by=type
export function adaptMonolithMenuStructure(menuData, lang) {
  const allCategories = {}
  const categoryOrder = {}
  const allSections = {}

  for (const categoryGroup of Object.values(menuData?.menu?.categories ?? {})) {
    if (!categoryGroup) continue
    for (const [catId, cat] of Object.entries(categoryGroup)) {
      allCategories[catId] = {
        id: catId,
        label: { [lang]: cat.name ?? '' },
        description: null,
      }
      categoryOrder[catId] = parseFloat(cat.ordering ?? '999')

      for (const [sectionId, section] of Object.entries(cat.sections ?? {})) {
        allSections[sectionId] = {
          catId,
          sectionId,
          name: { [lang]: section.name ?? '' },
          ordering: parseFloat(section.ordering ?? '999'),
        }
      }
    }
  }

  const categories = Object.values(allCategories)
    .sort((a, b) => (categoryOrder[a.id] ?? 999) - (categoryOrder[b.id] ?? 999))

  return { categories, allSections }
}
