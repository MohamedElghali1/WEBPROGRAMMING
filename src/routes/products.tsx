import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Casual Collection — SHOP.CO" },
      { name: "description", content: "Browse our curated collection of casual, formal, party and gym clothing." },
      { property: "og:title", content: "Casual Collection — SHOP.CO" },
      { property: "og:description", content: "Browse our curated collection of fashion." },
    ],
  }),
});

const CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"] as const;
const STYLES = ["Casual", "Formal", "Party", "Gym"] as const;
const COLORS = [
  { name: "Green", hex: "#16a34a" },
  { name: "Red", hex: "#dc2626" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Orange", hex: "#ea580c" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Purple", hex: "#7c3aed" },
  { name: "Pink", hex: "#db2777" },
  { name: "White", hex: "#ffffff" },
  { name: "Black", hex: "#000000" },
];
const SIZES = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"];
const SORTS = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low"] as const;

function ProductsPage() {
  const [priceMax, setPriceMax] = useState(400);
  const [cats, setCats] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [size, setSize] = useState<string | null>(null);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Most Popular");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (list: string[], setter: (v: string[]) => void, value: string) => {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    let items = PRODUCTS.filter((p) => p.price <= priceMax);
    if (cats.length) items = items.filter((p) => cats.includes(p.category));
    if (styles.length) items = items.filter((p) => styles.includes(p.style));
    if (sort === "Price: Low to High") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "Newest") items = [...items].reverse();
    return items;
  }, [priceMax, cats, styles, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> <span className="mx-1">/</span>
        <span className="text-foreground">Casual</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-[295px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden rounded-2xl border border-border p-5 md:block">
          <FilterPanel
            priceMax={priceMax} setPriceMax={setPriceMax}
            cats={cats} toggleCat={(v) => toggle(cats, setCats, v)}
            styles={styles} toggleStyle={(v) => toggle(styles, setStyles, v)}
            size={size} setSize={setSize}
          />
          <button className="mt-6 w-full rounded-full bg-black py-3 text-sm font-medium text-white hover:bg-black/90">
            Apply Filter
          </button>
        </aside>

        {/* Results */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-display text-2xl md:text-3xl">Casual</h1>
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm md:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <p className="hidden text-sm text-muted-foreground sm:block">
                Showing 1–{filtered.length} of {filtered.length}
              </p>
              <label className="inline-flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
                  className="rounded-md bg-transparent font-medium outline-none"
                >
                  {SORTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-muted-foreground">No products match your filters.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>

      {/* Mobile filter sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Filters</h3>
              <button onClick={() => setMobileOpen(false)} aria-label="Close">
                <X size={22} />
              </button>
            </div>
            <div className="mt-4">
              <FilterPanel
                priceMax={priceMax} setPriceMax={setPriceMax}
                cats={cats} toggleCat={(v) => toggle(cats, setCats, v)}
                styles={styles} toggleStyle={(v) => toggle(styles, setStyles, v)}
                size={size} setSize={setSize}
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="mt-6 w-full rounded-full bg-black py-3 text-sm font-medium text-white"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-border py-5 first:border-t-0 first:pt-0">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between">
        <span className="font-bold">{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function FilterPanel({
  priceMax, setPriceMax, cats, toggleCat, styles, toggleStyle, size, setSize,
}: {
  priceMax: number; setPriceMax: (n: number) => void;
  cats: string[]; toggleCat: (v: string) => void;
  styles: string[]; toggleStyle: (v: string) => void;
  size: string | null; setSize: (v: string | null) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Filters</h3>
        <SlidersHorizontal size={18} className="text-muted-foreground" />
      </div>

      <Section title="Categories">
        <ul className="space-y-3">
          {CATEGORIES.map((c) => (
            <li key={c} className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={cats.includes(c)}
                  onChange={() => toggleCat(c)}
                  className="h-4 w-4 accent-black"
                />
                {c}
              </label>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Price">
        <input
          type="range" min={0} max={400} value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-black"
        />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>$0</span><span>${priceMax}</span>
        </div>
      </Section>

      <Section title="Colors">
        <div className="grid grid-cols-5 gap-2">
          {COLORS.map((c) => (
            <button
              key={c.name}
              aria-label={c.name}
              className="h-8 w-8 rounded-full border border-border"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </Section>

      <Section title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const active = size === s;
            return (
              <button
                key={s}
                onClick={() => setSize(active ? null : s)}
                className={`rounded-full px-4 py-2 text-xs transition ${active ? "bg-black text-white" : "bg-[var(--color-surface)] text-muted-foreground hover:bg-secondary"}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Dress Style">
        <ul className="space-y-3">
          {STYLES.map((s) => (
            <li key={s} className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={styles.includes(s)}
                  onChange={() => toggleStyle(s)}
                  className="h-4 w-4 accent-black"
                />
                {s}
              </label>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
