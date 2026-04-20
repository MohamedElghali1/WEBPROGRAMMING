import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, User, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const NAV: { label: string; to: "/products"; hasChevron?: boolean }[] = [
  { label: "Shop", to: "/products", hasChevron: true },
  { label: "On Sale", to: "/products" },
  { label: "New Arrivals", to: "/products" },
  { label: "Brands", to: "/products" },
];

export function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="font-display text-2xl font-black tracking-tight">
          SHOP.CO
        </Link>

        <nav className="ml-6 hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="inline-flex items-center gap-1 text-sm hover:opacity-70"
            >
              {n.label}
              {n.hasChevron && <ChevronDown size={14} />}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3 md:flex-none md:w-auto">
          <div className="hidden flex-1 items-center rounded-full bg-[var(--color-surface)] px-4 py-2.5 md:flex md:max-w-sm">
            <Search size={18} className="text-muted-foreground" />
            <input
              placeholder="Search for products..."
              className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button className="md:hidden" aria-label="Search"><Search size={22} /></button>
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button aria-label="Account" className="hidden sm:inline-flex"><User size={22} /></button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col p-4">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
