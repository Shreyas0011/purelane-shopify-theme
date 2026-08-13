# Purelane Shopify Theme

A production-ready Shopify OS 2.0 theme implementation converting the static Purelane homecare prototype into a merchant-editable storefront built on an official Shopify Dawn foundation. The implementation replaces hardcoded prototype content with dynamic Shopify product models, variant pricing, collection grids, custom metafields, and section schemas while preserving the original visual design, glassmorphism aesthetics, and micro-interactions.

---

## Live Development Store

- **Store URL**: https://purelane-troopod-ss7aluxx.myshopify.com/
- **Password**: `purelane2026`

---

## Assignment Overview

This assignment converts the `purelane-homepage.html` visual prototype into five fully merchant-editable Shopify OS 2.0 sections integrated into an official Shopify Dawn theme:

1. **Purelane Hero** (`sections/purelane-hero.liquid`): Auto-rotating product stage, floating value badge rail, mobile badge strip, and merchant CTA controls.
2. **Purelane Shop Grid** (`sections/purelane-shop.liquid`): Collection-driven product grid powered by reusable product card snippets.
3. **Best Selling Combos** (`sections/purelane-combos.liquid`): Pre-built combo rail with automatic variant price summation, dynamic savings calculation, price overrides, and highlight card toggles.
4. **Tiered Bundles** (`sections/purelane-bundles.liquid`): Custom bundle box builder cards with multiline feature list parsing, unit-price calculation notes, and preview product imagery.
5. **Customer Reviews** (`sections/purelane-reviews.liquid`): Continuous CSS marquee review rail with duplicate pass `aria-hidden="true"` screen reader protection and reduced-motion fallback.

---

## Key Features

- **Shopify OS 2.0 Architecture**: Full Theme Editor section reordering, block additions, removals, and duplication via `templates/index.json`.
- **Dynamic Data Integrity**: Sourced strictly from native Shopify product fields (`title`, `url`, `featured_image`, `variant.price`, `variant.compare_at_price`) and custom product metafields. Unpopulated metafields hide gracefully without displaying fake fallbacks.
- **Production Edge-Case Protection**:
  - **Sold-Out Products**: Displays "Sold out" pill, renders disabled CTA button, and blocks cart form submission.
  - **Missing Images**: Renders vector SVG bottle illustration (`.purelane-image-fallback`) preserving layout dimensions.
  - **Long Product Titles**: Full title wraps naturally across multiple lines with flexbox-pinned footers (**No text truncation / line-clamp**).
  - **Bundle Count Consistency**: Prioritizes `preview_products.size` over merchant `product_count` when preview products are assigned.
- **Accessibility & Reduced Motion**: Full `Tab` / `Shift+Tab` keyboard reachability, visible `:focus-visible` outlines, accessible screen reader text, and `@media (prefers-reduced-motion: reduce)` fallbacks halting animations into native horizontal scroll rails.
- **Performance & Zero Dependencies**: Written in pure Liquid, vanilla JavaScript (`assets/purelane.js`), and modular CSS (`assets/purelane.css`). Zero third-party JavaScript libraries or external frameworks.

---

## Shopify Architecture

- **Shopify OS 2.0**: Built on official Shopify Dawn foundation files (`layout/theme.liquid`, `config/settings_schema.json`, `config/settings_data.json`, `locales/en.default.json`).
- **Sections**: 5 custom Liquid sections (`purelane-hero`, `purelane-shop`, `purelane-combos`, `purelane-bundles`, `purelane-reviews`).
- **Templates**: `templates/index.json` assembling the 5 core sections in default order with explicit section settings objects.
- **Snippets**: Reusable components (`purelane-product-card.liquid`, `purelane-product-image.liquid`, `purelane-stars.liquid`, `purelane-icons.liquid`).
- **JSON Schemas**: Strict Theme Editor-compatible block schemas and settings defaults.
- **Theme Editor Integration**: Bound to `shopify:section:load` and `shopify:section:unload` lifecycle events.

---

## India Market

- **Market Activation**: Configured India as an active Shopify Market.
- **Currency**: Indian Rupee (INR `₹`) configured as market currency with storefront money formatting (`variant.price | money_with_currency`).
- **Store Location**: Primary store location set to India.
- **Storefront Testing**: Verified product pricing, combo summation, and bundle tier displays under the India market context.

---

## Documentation

- **[Build Notes & Architecture Breakdown](docs/build-notes.md)**
- **[AI Workflow Diagram](docs/ai-workflow.png)**

![AI-Assisted Shopify Development Workflow](docs/ai-workflow.png)

---

## Metafields / Metaobjects

### Product Metafields

- `product.metafields.custom.rating` (Decimal): Star rating score (e.g. `4.8`).
- `product.metafields.custom.review_count` (Integer): Total review count (e.g. `237`).
- `product.metafields.custom.badge` (Single line text): Custom product badge text (e.g. `Bestseller`).

### Metaobjects

None created.
