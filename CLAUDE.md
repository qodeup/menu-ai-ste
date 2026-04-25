# menu-v2 — Digital Restaurant Menu

## Product Overview

A mobile-first web application for restaurant digital menus, designed to be browsed by customers directly on their smartphones. It displays categories, products with descriptions and prices, dietary attributes, and allergens. Supports 12 languages and integrates with a structured JSON format for content management.

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| Plain CSS (per-component) | — | Component-scoped styling |
| JavaScript (ESM) | — | No TypeScript |

No external component libraries. No global state manager (only `useState` / `useContext`).

---

## Project Structure

```
src/
├── context/
│   └── LanguageContext.jsx      # Language provider + list of 12 languages
├── data/
│   └── menu.js                  # Menu data (categories + products)
├── components/
│   ├── Header.jsx / .css        # Logo + language selector
│   ├── LanguageModal.jsx / .css # Language selection modal (12 languages)
│   ├── CategoryNav.jsx / .css   # Horizontal scrollable nav bar
│   ├── CategoryDescription.jsx / .css # Introductory text per category
│   ├── ProductGrid.jsx / .css   # Product list (flat or sectioned)
│   └── AllergenModal.jsx / .css # Product info bottom sheet
├── App.jsx / .css               # Main layout + category routing
├── main.jsx                     # React entry point
└── index.css                    # Global reset + fonts
public/
└── logo.png                     # Qodeup logo (replace with the real file)
```

---

## Design System

| Token | Value |
|---|---|
| Primary color | `#DC0746` |
| App background | `#f0f0f0` |
| Card / list background | `white` |
| Primary text | `#1a1a1a` |
| Secondary text | `#888` |
| Font | `system-ui, -apple-system, sans-serif` |

### Key UI Components

**Header** — `#f0f0f0` background, sticky top, subtle shadow. Contains logo (`public/logo.png`) and a language button that opens `LanguageModal`.

**CategoryNav** — `#DC0746` background, horizontal touch scroll. Active category: white underline + 8px red gap below. Implementation note: uses `background-image: linear-gradient(...)` instead of `::after` pseudo-element because `overflow-x: auto` clips children positioned outside the element bounds.

**ProductGrid** — continuous list on white background. Supports two data formats:
- **Flat**: direct array of products (legacy)
- **Sectioned**: array of sections, each with `sectionLabel` and `items`

Category change animation: slide-out left (160ms) → data swap → slide-in from right (220ms). Managed with `useState` + `setTimeout` inside `ProductGrid`.

**AllergenModal (InfoSheet)** — bottom sheet (82vh), slide-up animation. Contains: product photo (or 📷 placeholder), dietary attribute badges, allergen list, and traces.

---

## Menu Data Structure (`src/data/menu.js`)

### Categories

```js
export const categories = [
  {
    id: 'pizzeria',                           // used as key in products{}
    label: { it: 'Pizzeria', en: 'Pizzeria' },
    description: { it: '...', en: '...' },   // null hides the intro text
  },
]
```

### Products — flat format (single price)

```js
export const products = {
  category_id: [
    {
      id: 'uuid',
      name: { it: '...', en: '...' },
      description: { it: '...', en: '...' },
      price: 12.50,          // in euros; null if dual pricing
      photo: 'https://...',  // null shows 📷 placeholder
      vegetarian: true,
      vegan: false,
      glutenFree: false,
      spicy: false,
      frozen: false,
      allergens: ['gluten', 'dairy'],  // see keys below
      traces: ['nuts'],                // may contain traces of
    },
  ],
}
```

### Products — sectioned format

```js
export const products = {
  category_id: [
    {
      sectionId: 'section-id',
      sectionLabel: { it: 'Pizze Classiche', en: 'Classic Pizzas' },
      items: [ /* same product structure as above */ ],
    },
  ],
}
```

### Products — dual pricing (e.g. wines)

```js
{
  priceGlass: 4.00,    // replaces price
  priceBottle: 16.00,
}
```

### Supported Allergen Keys

| Key | IT | EN | Icon |
|---|---|---|---|
| `gluten` | Glutine | Gluten | 🌾 |
| `dairy` | Latticini | Dairy | 🧀 |
| `eggs` | Uova | Eggs | 🥚 |
| `fish` | Pesce | Fish | 🐟 |
| `sulphites` | Solfiti | Sulphites | 🍷 |
| `soy` | Soia | Soy | 🫘 |
| `nuts` | Frutta a guscio | Tree nuts | 🥜 |
| `peanuts` | Arachidi | Peanuts | 🥜 |

### Price Formatting

The `fmt(price)` function in `ProductGrid.jsx` applies these rules:
- Integer → no decimals (`14.00` → `14`)
- One significant decimal → one decimal (`6.50` → `6.5`)
- Two significant decimals → two decimals (`6.75` → `6.75`)

### Importing from External JSON

The source JSON uses prices in **cents** (`amount: 700` = €7.00) and different allergen names (`"milk"` → `"dairy"`). The `allergenMap()` function in `menu.js` handles the mapping. `storage: "frozen"` maps to `frozen: true`.

---

## Supported Languages

Managed in `src/context/LanguageContext.jsx`. Current list:

`it` · `en` · `fr` · `de` · `es` · `pt` · `ru` · `zh` · `ja` · `ar` · `nl` · `pl`

To add a language: add the `{ code, label, flag }` object to the `LANGUAGES` array and add translations to `menu.js` and all component label objects.

---

## GitHub Repository

- **Org**: `qodeup`
- **Repo**: [qodeup/menu-v2](https://github.com/qodeup/menu-v2)
- **Main branch**: `main`
- **Active development branch**: `initial-draft`
- **Open PR**: [#1 — Initial draft](https://github.com/qodeup/menu-v2/pull/1)

---

## How to Add Content

### New category

1. Add an object to `categories[]` with `id`, `label`, `description`
2. Add the matching key to `products{}` with the products/sections array

### New product

Copy an existing product, update `id` (unique UUID), multilingual fields, price, and flags.

### Category with introductory description

Set `description: { it: '...', en: '...' }` on the category object. `null` hides the text automatically.

---

## Dev Commands

```bash
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview production build
```
