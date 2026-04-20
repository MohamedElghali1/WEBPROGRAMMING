# SHOP.CO — Project Documentation

**Repository:** https://github.com/MohamedElghali1/WEBPROGRAMMING  
**Author:** MohamedElghali1  
**Date:** April 2026  
**Status:** In Development

---

## Abstract

SHOP.CO is a full-stack e-commerce web application built on the
WEBPROGRAMMING repository stack. The project delivers a fashion retail
experience inspired by real-world e-commerce platforms, featuring product
browsing, category navigation, and customer review showcases. This document
describes the design language, file structure, page anatomy, and technology
underpinning the static HTML/CSS prototype that forms the visual and structural
foundation of the application.

---

## 1. Project Overview

| Property      | Value                                                 |
|---------------|-------------------------------------------------------|
| Brand         | SHOP.CO                                               |
| Type          | E-commerce Fashion Web Application                    |
| Stack         | TypeScript · React 19 · TanStack Start · Tailwind v4  |
| Build Tool    | Vite 7                                                |
| Package Mgr   | Bun                                                   |
| Deployment    | Cloudflare Workers                                    |
| Design Style  | Editorial Fashion · Bold Black & White · Typographic  |

---

## 2. Design System

### 2.1 Aesthetic Direction

The visual language is editorial and typographic — directly influenced by
high-street fashion brands. The palette is deliberately minimal: black and
white form the dominant pairing, with a warm gold accent for prices and
ratings and a red signal for sale labels. This restraint focuses attention on
the product and creates a luxury retail feel without decoration.

### 2.2 Color Tokens

| Token         | Value      | Usage                          |
|---------------|------------|--------------------------------|
| `--black`     | `#000000`  | Primary background, text, CTAs |
| `--white`     | `#ffffff`  | Page background, cards         |
| `--off-white` | `#f5f5f0`  | Section backgrounds            |
| `--gray-100`  | `#f0f0eb`  | Product image placeholders     |
| `--gray-200`  | `#e0e0d8`  | Borders, dividers              |
| `--gray-500`  | `#888880`  | Muted labels, footer links     |
| `--accent`    | `#e8c547`  | Star ratings, price highlights |
| `--red`       | `#e84040`  | Sale tags, discount badges     |

### 2.3 Typography

| Role          | Font                | Weights       |
|---------------|---------------------|---------------|
| Headings      | Barlow Condensed    | 700, 800, 900 |
| Body / UI     | Barlow              | 300, 400, 500, 600 |

Barlow Condensed is used for all headlines, product section titles, stat
numbers, and the brand wordmark — delivering a bold, editorial punch at
large sizes while staying readable. Barlow Regular handles all body copy,
navigation, and UI labels.

### 2.4 Spacing & Layout

- Max content width: `1280px`
- Horizontal padding: `28px` on mobile, scales naturally
- Section vertical padding: `72–80px`
- Card border radius: `4px` (products), `6–8px` (categories, reviews)
- All interactive transitions: `0.18s ease`

---

## 3. File Structure

```
WEBPROGRAMMING/
├── src/                       # React/TypeScript application source
│   └── ...                    # Routes, components, hooks, utilities
│
│── ── Static HTML Prototype ──────────────────────────────────
├── index.html                 # Homepage
├── about.html                 # About Us page
├── styles.css                 # Shared stylesheet (single file)
└── DOCUMENTATION.md           # This file
```

---

## 4. Page Anatomy

### 4.1 Shared Components (both pages)

**Announcement Bar**
- Full-width black strip at the very top
- Displays a promotional message with a highlighted CTA link
- Dismissible via an ✕ button (inline JS `onclick`)

**Navigation Bar**
- Sticky (`position: sticky; top: 0`) with backdrop blur effect
- Contains: brand wordmark, navigation links with dropdown indicator,
  search input with pill border-radius, cart icon with item badge, account icon
- Active page state highlighted via `.active` class

**Newsletter Section**
- Full-width black banner with bold headline and email input
- Positioned above the footer on every page for consistent CTA placement

**Footer**
- 4-column grid: brand description, Company, Help, FAQ links
- Social icon row with circular bordered buttons
- Copyright line in muted gray

---

### 4.2 Homepage (`index.html`)

**Hero Section**
- Full-bleed black background with overlaid fashion photography placeholder
- Left-aligned headline in Barlow Condensed at display scale (up to ~6.8rem)
- Subheadline in light-weight body font
- "Shop Now" CTA button (white, pill-shaped)
- Statistics row: 200+ Brands · 2,000+ Products · 30,000+ Customers
- Right-side visual panel with gradient overlay creating depth

**Brand Strip**
- Thin black band beneath the hero
- Horizontal list of 5 international fashion brand names at reduced opacity
- Hover brightens each brand name

**New Arrivals Grid**
- 4-column responsive product grid (3 col @ 1024px, 2 col @ 680px)
- Each product card contains:
  - Aspect-ratio 3:4 image area with optional New / Sale tag
  - Colour swatch dots
  - Product name, star rating, current price
  - Optional strikethrough original price + discount badge

**Browse By Dress Style (Category Strip)**
- 3-column grid on off-white background
- Each card: black background, category name, product count, diagonal arrow
- Hover lifts card (`translateY(-3px)`) and brightens the arrow

**Top Selling Grid**
- Identical structure to New Arrivals grid
- Different product data / tags

**Customer Reviews**
- 3-column card grid on off-white background
- Each review: star rating, author name, verified badge, review body

---

### 4.3 About Page (`about.html`)

**Breadcrumb**
- Simple `Home › About Us` text trail beneath the nav

**About Hero**
- Two-column grid: text block left, editorial photo placeholder right
- Headline uses outlined text (`-webkit-text-stroke`) for stylistic contrast
- Mission statement paragraph and "Shop The Collection" CTA

**Stats Row**
- 3-column bordered grid reusing the same numbers from the hero stats
- Provides social proof in a structured, scannable format

**Values Section**
- Full-width black background
- 3-column grid with ghost number (`01`, `02`, `03`) as decorative element
- Each box: value title, description paragraph

**Team Grid**
- 4-column responsive grid
- Each card: initials-based avatar placeholder, name, role

**Reviews Section**
- Reuses the same 3-column review card pattern from the homepage

---

## 5. Technology Stack

The HTML/CSS prototype is designed to map directly onto the React/TypeScript
application in the repository. Each structural section corresponds to a
planned React component:

| HTML Section          | React Component (planned)          |
|-----------------------|------------------------------------|
| Announcement bar      | `<AnnouncementBar />`              |
| Navigation            | `<Navbar />`                       |
| Hero                  | `<HeroSection />`                  |
| Brand strip           | `<BrandStrip />`                   |
| Product grid          | `<ProductGrid products={...} />`   |
| Product card          | `<ProductCard product={...} />`    |
| Category strip        | `<CategoryGrid />`                 |
| Reviews               | `<ReviewsCarousel />`              |
| Newsletter            | `<NewsletterCTA />`                |
| Footer                | `<Footer />`                       |

The application stack includes React 19, TanStack Router for page routing,
TanStack Query for product data fetching, shadcn/ui components for accessible
UI primitives, Tailwind CSS v4 for utility-first styling, and Cloudflare
Workers for edge deployment.

---

## 6. Development Setup

```bash
# Clone
git clone https://github.com/MohamedElghali1/WEBPROGRAMMING.git
cd WEBPROGRAMMING

# Install dependencies
bun install

# Start dev server
bun dev
# → http://localhost:5173

# Open the static prototype directly in any browser
# (no server required — open index.html or about.html)
```

---

## 7. Available Scripts

```bash
bun dev        # Vite dev server with HMR
bun build      # Production build
bun preview    # Preview production build
bun lint       # ESLint
bun format     # Prettier
```

---

## 8. Future Work

- [ ] Implement product detail page with size selector, colour picker, add-to-cart
- [ ] Build category / filter page with sidebar (price range, size, colour, brand)
- [ ] Cart page with quantity controls, subtotal, discount code input
- [ ] User authentication (sign up / sign in) via Cloudflare KV sessions
- [ ] Connect to a product database (Cloudflare D1 or Turso)
- [ ] Wishlist functionality with local persistence
- [ ] Mobile navigation drawer
- [ ] Checkout flow with address and payment steps

---

*Documentation generated: April 2026*
