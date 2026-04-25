// Price amounts are in cents → divide by 100 for euros
// Allergen mapping: 'milk' → 'dairy'
// Sections are nested inside categories

export const categories = [
  {
    id: 'pizzeria',
    label: { it: 'Pizzeria', en: 'Pizzeria' },
    description: {
      it: 'Pizze classiche e speciali cotte nel forno a legna.',
      en: 'Classic and special pizzas baked in a wood-fired oven.',
    },
  },
  {
    id: 'bar',
    label: { it: 'Bar', en: 'Bar' },
    description: {
      it: 'Bibite, cocktail e dessert freddi.',
      en: 'Soft drinks, cocktails and chilled desserts.',
    },
  },
]

function loc(localizations, lang, field) {
  return localizations.find(l => l.language === lang)?.[field] ?? ''
}

function allergenMap(raw) {
  const map = { milk: 'dairy', gluten: 'gluten', eggs: 'eggs', fish: 'fish', sulphites: 'sulphites', soy: 'soy', nuts: 'nuts', peanuts: 'peanuts' }
  return (raw ?? []).map(a => map[a]).filter(Boolean)
}

function thumbUrl(images) {
  return images?.find(i => i.kind === 'thumb')?.url ?? null
}

export const products = {
  pizzeria: [
    {
      sectionId: 'pizze-classiche',
      sectionLabel: { it: 'Pizze Classiche', en: 'Classic Pizzas' },
      items: [
        {
          id: '550e8400-e29b-41d4-a716-446655440004',
          name: { it: 'Margherita', en: 'Margherita' },
          description: { it: 'Pomodoro, fiordilatte, basilico e olio EVO', en: 'Tomato sauce, mozzarella, basil and extra virgin olive oil' },
          price: 7.00,
          photo: 'https://cdn.example.com/menu/products/margherita-thumb.jpg',
          vegetarian: true, vegan: false, glutenFree: false, spicy: false, frozen: false,
          allergens: allergenMap(['gluten', 'milk']),
          traces: [],
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440010',
          name: { it: 'Diavola', en: 'Spicy Salami Pizza' },
          description: { it: 'Pomodoro, fiordilatte e salamino piccante', en: 'Tomato sauce, mozzarella and spicy salami' },
          price: 9.00,
          photo: 'https://cdn.example.com/menu/products/diavola-thumb.jpg',
          vegetarian: false, vegan: false, glutenFree: false, spicy: true, frozen: false,
          allergens: allergenMap(['gluten', 'milk']),
          traces: allergenMap(['soy']),
        },
      ],
    },
    {
      sectionId: 'pizze-speciali',
      sectionLabel: { it: 'Pizze Speciali', en: 'Special Pizzas' },
      items: [
        {
          id: '550e8400-e29b-41d4-a716-446655440014',
          name: { it: 'Burrata e Crudo', en: 'Burrata and Prosciutto' },
          description: { it: 'Base bianca, burrata, prosciutto crudo e rucola', en: 'White base, burrata, prosciutto and rocket salad' },
          price: 12.50,
          photo: 'https://cdn.example.com/menu/products/burrata-crudo-thumb.jpg',
          vegetarian: false, vegan: false, glutenFree: false, spicy: false, frozen: false,
          allergens: allergenMap(['gluten', 'milk']),
          traces: allergenMap(['nuts']),
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440018',
          name: { it: 'Vegetarian Deluxe', en: 'Vegetarian Deluxe' },
          description: { it: 'Pomodoro, fiordilatte, zucchine, melanzane, peperoni e olive', en: 'Tomato sauce, mozzarella, zucchini, eggplant, peppers and olives' },
          price: 10.50,
          photo: 'https://cdn.example.com/menu/products/vegetarian-deluxe-thumb.jpg',
          vegetarian: true, vegan: false, glutenFree: false, spicy: false, frozen: false,
          allergens: allergenMap(['gluten', 'milk']),
          traces: [],
        },
      ],
    },
  ],
  bar: [
    {
      sectionId: 'soft-drinks',
      sectionLabel: { it: 'Soft Drinks', en: 'Soft Drinks' },
      items: [
        {
          id: '550e8400-e29b-41d4-a716-446655440025',
          name: { it: 'Tè freddo limone', en: 'Lemon iced tea' },
          description: { it: 'Tè freddo al limone in bottiglia', en: 'Bottled lemon iced tea' },
          price: 3.20,
          photo: 'https://cdn.example.com/menu/products/lemon-tea-thumb.jpg',
          vegetarian: true, vegan: true, glutenFree: true, spicy: false, frozen: false,
          allergens: [],
          traces: [],
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440030',
          name: { it: "Spremuta d'arancia", en: 'Fresh orange juice' },
          description: { it: 'Spremuta fresca preparata al momento', en: 'Freshly squeezed orange juice' },
          price: 4.50,
          photo: 'https://cdn.example.com/menu/products/orange-juice-thumb.jpg',
          vegetarian: true, vegan: true, glutenFree: true, spicy: false, frozen: false,
          allergens: [],
          traces: [],
        },
      ],
    },
    {
      sectionId: 'dessert-freddi',
      sectionLabel: { it: 'Dessert Freddi', en: 'Cold Desserts' },
      items: [
        {
          id: '550e8400-e29b-41d4-a716-446655440034',
          name: { it: 'Tiramisù', en: 'Tiramisu' },
          description: { it: 'Savoiardi, crema al mascarpone, caffè e cacao', en: 'Ladyfingers, mascarpone cream, coffee and cocoa' },
          price: 5.50,
          photo: 'https://cdn.example.com/menu/products/tiramisu-thumb.jpg',
          vegetarian: true, vegan: false, glutenFree: false, spicy: false, frozen: false,
          allergens: allergenMap(['milk', 'eggs', 'gluten']),
          traces: allergenMap(['nuts']),
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440040',
          name: { it: 'Coppetta gelato', en: 'Ice cream cup' },
          description: { it: 'Coppetta con gusti a scelta', en: 'Cup with selectable flavors' },
          price: 4.00,
          photo: 'https://cdn.example.com/menu/products/gelato-cup-thumb.jpg',
          vegetarian: true, vegan: false, glutenFree: true, spicy: false, frozen: true,
          allergens: allergenMap(['milk']),
          traces: allergenMap(['nuts', 'peanuts', 'soy']),
        },
      ],
    },
  ],
}
