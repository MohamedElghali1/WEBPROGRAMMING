import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { PRODUCTS, TESTIMONIALS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import heroImg from "@/assets/hero.jpg";
import casualImg from "@/assets/style-casual.jpg";
import formalImg from "@/assets/style-formal.jpg";
import partyImg from "@/assets/style-party.jpg";
import gymImg from "@/assets/style-gym.jpg";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

const BRANDS = ["VERSACE", "ZARA", "GUCCI", "PRADA", "CALVIN KLEIN"];

function Home() {
  const newArrivals = PRODUCTS.slice(0, 4);
  const topSelling = PRODUCTS.slice(4, 8);

  return (
    <>
      {/* HERO */}
      <section className="bg-[#F2F0F1]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6 md:py-16">
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
              FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
            </h1>
            <p className="mt-6 max-w-md text-sm text-muted-foreground md:text-base">
              Browse through our diverse range of meticulously crafted garments, designed to bring out
              your individuality and cater to your sense of style.
            </p>
            <Link
              to="/products"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-black px-10 py-4 text-sm font-medium text-white transition hover:bg-black/90 sm:w-fit"
            >
              Shop Now
            </Link>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-black/10 pt-6 sm:gap-8">
              {[
                { num: "200+", label: "International Brands" },
                { num: "2,000+", label: "High-Quality Products" },
                { num: "30,000+", label: "Happy Customers" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl sm:text-3xl md:text-4xl">{s.num}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[400px] overflow-hidden rounded-xl md:min-h-[500px]">
            <img
              src={heroImg}
              alt="Two models in stylish outfits"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="bg-black">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-around gap-6 px-4 py-6 md:px-6 md:py-8">
          {BRANDS.map((b) => (
            <span
              key={b}
              className="font-display text-xl text-white opacity-90 sm:text-2xl md:text-3xl"
            >
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <ProductSection title="NEW ARRIVALS" products={newArrivals} />

      <div className="mx-auto max-w-7xl px-4 md:px-6"><hr /></div>

      {/* TOP SELLING */}
      <ProductSection title="TOP SELLING" products={topSelling} />

      {/* BROWSE BY STYLE */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="rounded-2xl bg-[var(--color-surface)] p-6 py-10 md:p-12">
          <h2 className="text-center font-display text-3xl sm:text-4xl md:text-5xl">BROWSE BY DRESS STYLE</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-[1fr_2fr]">
            <StyleCard label="Casual" img={casualImg} />
            <StyleCard label="Formal" img={formalImg} />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-[2fr_1fr]">
            <StyleCard label="Party" img={partyImg} />
            <StyleCard label="Gym" img={gymImg} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />
    </>
  );
}

function ProductSection({ title, products }: { title: string; products: typeof PRODUCTS }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <h2 className="text-center font-display text-3xl sm:text-4xl md:text-5xl">{title}</h2>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          to="/products"
          className="rounded-full border border-border px-10 py-3 text-sm transition hover:bg-black hover:text-white"
        >
          View All
        </Link>
      </div>
    </section>
  );
}

function StyleCard({ label, img }: { label: string; img: string }) {
  return (
    <Link
      to="/products"
      className="group relative block h-56 overflow-hidden rounded-2xl bg-white md:h-72"
    >
      <img
        src={img}
        alt={label}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute left-6 top-5 font-display text-2xl md:text-3xl">{label}</span>
    </Link>
  );
}

function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">OUR HAPPY CUSTOMERS</h2>
        <div className="flex gap-3">
          <button onClick={() => scroll(-1)} aria-label="Previous" className="rounded-full p-2 hover:bg-secondary">
            <ArrowLeft size={20} />
          </button>
          <button onClick={() => scroll(1)} aria-label="Next" className="rounded-full p-2 hover:bg-secondary">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="min-w-[320px] max-w-[400px] snap-start rounded-2xl border border-border p-6"
          >
            <StarRating rating={t.rating} size={18} />
            <div className="mt-3 flex items-center gap-2">
              <span className="font-bold">{t.name}</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-verified)] text-white">
                <Check size={10} strokeWidth={3} />
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>
  );
}
