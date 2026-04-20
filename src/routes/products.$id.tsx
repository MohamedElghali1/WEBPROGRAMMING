import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/data/products";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm text-white">
        Back to Shop
      </Link>
    </div>
  ),
});

const TABS = ["Product Details", "Rating & Reviews", "FAQs"] as const;

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const [active, setActive] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Rating & Reviews");

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product, { color, size, quantity: qty });
    toast.success("Added to cart", { description: `${product.name} · ${size}` });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
        <Link to="/products" className="hover:text-foreground">Shop</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        {/* Gallery */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex gap-3 md:flex-col">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-square h-24 w-24 overflow-hidden rounded-xl md:h-28 md:w-28 ${active === i ? "ring-2 ring-black" : ""}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="aspect-square flex-1 overflow-hidden rounded-xl bg-[var(--color-surface)]">
            <img src={product.images[active]} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="font-display text-3xl md:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} size={18} />
            <span className="text-sm text-muted-foreground">· {product.reviewCount} reviews</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold md:text-3xl">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-2xl font-bold text-muted-foreground line-through md:text-3xl">
                  ${product.originalPrice}
                </span>
                <span className="rounded-full bg-[oklch(0.66_0.22_24_/_0.1)] px-3 py-1 text-sm font-medium text-[var(--color-sale)]">
                  -{product.discountPercent}%
                </span>
              </>
            )}
          </div>
          <p className="mt-5 border-t border-border pt-5 text-sm text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-5 border-t border-border pt-5">
            <p className="text-sm text-muted-foreground">Select Colors</p>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c}
                  aria-label={c}
                  onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
                >
                  {color === c && <Check size={16} className={isLight(c) ? "text-black" : "text-white"} />}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-border pt-5">
            <p className="text-sm text-muted-foreground">Choose Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const active = size === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-full px-5 py-3 text-sm transition ${active ? "bg-black text-white" : "bg-[var(--color-surface)] text-muted-foreground hover:bg-secondary"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row">
            <div className="inline-flex items-center gap-4 rounded-full bg-[var(--color-surface)] px-4 py-3">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={16} /></button>
              <span className="w-6 text-center font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase"><Plus size={16} /></button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover:bg-black/90"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 border-b border-border">
        <div className="flex gap-4 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap border-b-2 px-2 py-4 text-sm transition ${tab === t ? "border-black font-medium" : "border-transparent text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {tab === "Product Details" && (
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <Detail k="Category" v={product.category} />
            <Detail k="Style" v={product.style} />
            <Detail k="Available Sizes" v={product.sizes.join(", ")} />
            <Detail k="Material" v="Premium cotton blend, sustainably sourced" />
          </div>
        )}
        {tab === "Rating & Reviews" && (
          <div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">All Reviews <span className="text-muted-foreground">({product.reviewCount})</span></p>
              <button className="rounded-full bg-black px-5 py-3 text-sm text-white">Write a Review</button>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {MOCK_REVIEWS.map((r, i) => (
                <div key={i} className="rounded-2xl border border-border p-6">
                  <StarRating rating={r.rating} size={16} />
                  <p className="mt-2 flex items-center gap-2 font-bold">
                    {r.name}
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-verified)] text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">&ldquo;{r.text}&rdquo;</p>
                  <p className="mt-3 text-xs text-muted-foreground">Posted on {r.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "FAQs" && (
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="group rounded-xl border border-border p-5">
                <summary className="cursor-pointer list-none font-medium">{f.q}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        )}
      </div>

      {/* Related */}
      <section className="mt-20">
        <h2 className="text-center font-display text-3xl md:text-4xl">YOU MIGHT ALSO LIKE</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-[var(--color-surface)] p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
      <p className="mt-1 font-medium">{v}</p>
    </div>
  );
}

function isLight(hex: string) {
  if (!hex.startsWith("#")) return false;
  const c = hex.substring(1);
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

const MOCK_REVIEWS = [
  { name: "Samantha D.", rating: 5, date: "August 14, 2023", text: "I absolutely love this piece! The quality is top-notch and the fit is perfect. The design feels unique and modern — exactly what I was looking for." },
  { name: "Alex M.", rating: 4, date: "August 15, 2023", text: "Great quality, fast shipping, and the fit matches the size guide. Would definitely buy again." },
  { name: "Ethan R.", rating: 5, date: "August 16, 2023", text: "Honestly one of the best purchases I've made this year. Goes with everything and gets compliments every time." },
  { name: "Liam K.", rating: 4, date: "August 18, 2023", text: "Material feels premium. Only minor note — color is slightly different in natural light. Still highly recommended." },
];

const FAQ = [
  { q: "What is your return policy?", a: "Free returns within 30 days of delivery on all unworn items." },
  { q: "How long does shipping take?", a: "Standard shipping takes 3–5 business days. Express options available at checkout." },
  { q: "Do you ship internationally?", a: "Yes — we ship to over 100 countries worldwide." },
];
