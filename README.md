# crystal. — Products Page

A responsive cosmetics-store products page built from the Figma "Cosmetics E-commerce"
design, powered by the [DummyJSON](https://dummyjson.com) products API.

**Stack:** Next.js (App Router) · TypeScript · TanStack React Query · shadcn/ui · Tailwind CSS

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

The API base URL defaults to `https://dummyjson.com` and can be overridden with
`NEXT_PUBLIC_DUMMYJSON_URL` (see `.env.example`). No API key is required.

## What's implemented

| Requirement | Where |
| --- | --- |
| Products listing in a responsive grid of shadcn/ui `Card`s | `src/components/product-grid.tsx`, `src/components/product-card.tsx` |
| React Query fetching + caching (no `useEffect`/`useState` data fetching) | `src/lib/queries.ts`, `src/components/shop-browser.tsx` |
| Product card with image, title, price, rating, details link | `src/components/product-card.tsx` |
| Product details page fetching by id | `src/app/products/[id]/page.tsx`, `src/components/product-detail.tsx` |
| Keyword search via `/products/search?q=` | `src/components/search-field.tsx`, `src/components/header-search.tsx` |
| Pagination via `limit` + `skip` | `src/components/pagination-controls.tsx` |
| Loading, error, and empty-search states | `src/components/product-grid-skeleton.tsx`, `src/components/results-states.tsx` |

Extra polish beyond the brief: category filtering, a discount/list-price display on the
details page, an image gallery with thumbnails, and a session-scoped cart so the header's
"View cart" is functional.

## How it works

### Data layer

`src/lib/api.ts` owns every request and normalises failures into an `ApiError`. One
`productsPath()` builder picks the right endpoint and always pages with `limit`/`skip`:

```
/products?limit=12&skip=12
/products/search?q=lipstick&limit=12&skip=0
/products/category/skin-care?limit=12&skip=0
```

`src/lib/queries.ts` is the single cache contract. Screens never hand-write query keys:

```ts
productKeys.list({ page, pageSize, search, category })  // changes with search + pagination
productKeys.detail(id)
```

Lists use `placeholderData: keepPreviousData`, so paging and re-searching keep the current
results on screen (dimmed, `aria-busy`) instead of flashing back to a skeleton. Server
responses are never copied into React state.

### URL as the browse state

Search, category, and page live in the URL (`/?q=lipstick&category=beauty&page=3`), so a
filtered grid is shareable, survives the back button, and rebuilds the React Query key from
one source of truth. Typing stays instant in local component state and is debounced for
300 ms before it touches the URL.

Out-of-range pages are clamped to the last real page, so a stale or hand-edited link like
`?category=skin-care&page=4` never shows a false "no products" state.

Because those components read `useSearchParams()`, they render inside `<Suspense>`
boundaries — which also satisfies Next's Cache Components prerendering rules, leaving the
header, hero, and shell static.

## Notes and decisions

- **Category pills.** The design's labels (Skincare, Haircare, Makeup, Bath & Body) do not
  exist in the DummyJSON catalogue, so the pills map onto real categories —
  `skin-care`, `beauty`, `fragrances`, `womens-jewellery` — and every pill returns real
  results. See `src/lib/catalog.ts`.
- **Search results are the API's.** DummyJSON matches titles/descriptions only, so a keyword
  like "perfume" legitimately returns the empty state.
- **Nav and cart.** "Collections", "Contact", and "About" are design chrome with no matching
  screens, so they render as disabled items. The cart is session-scoped (in memory, cleared
  on reload) and has no checkout.
