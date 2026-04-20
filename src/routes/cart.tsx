import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Tag, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your Cart — SHOP.CO" }] }),
});

function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const [promo, setPromo] = useState("");

  const discountRate = 0.2;
  const discount = subtotal * discountRate;
  const delivery = items.length > 0 ? 15 : 0;
  const total = Math.max(0, subtotal - discount + delivery);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">Cart</span>
      </nav>
      <h1 className="font-display text-3xl md:text-4xl">YOUR CART</h1>

      {items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-2xl border border-border py-20 text-center">
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="mt-2 text-sm text-muted-foreground">Browse our collection and find something you love.</p>
          <Link to="/products" className="mt-6 rounded-full bg-black px-8 py-3 text-sm font-medium text-white">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="rounded-2xl border border-border p-5">
            {items.map((item, i) => (
              <div key={item.id}>
                {i > 0 && <hr className="my-5" />}
                <div className="flex gap-4">
                  <div className="aspect-square h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface)] md:h-28 md:w-28">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Size: <span className="text-foreground">{item.size}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Color: <span className="inline-block h-3 w-3 translate-y-[2px] rounded-full border border-border" style={{ backgroundColor: item.color }} />
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove"
                        className="text-[var(--color-sale)]"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <span className="text-lg font-bold md:text-xl">${item.price * item.quantity}</span>
                      <div className="inline-flex items-center gap-4 rounded-full bg-[var(--color-surface)] px-4 py-2">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease"><Minus size={14} /></button>
                        <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-border p-6">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(0)}`} />
              <Row label="Discount (-20%)" value={`-$${discount.toFixed(0)}`} valueClass="text-[var(--color-sale)]" />
              <Row label="Delivery Fee" value={`$${delivery.toFixed(0)}`} />
              <hr />
              <div className="flex items-center justify-between text-base">
                <span>Total</span>
                <span className="text-xl font-bold">${total.toFixed(0)}</span>
              </div>
            </dl>

            <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-full bg-[var(--color-surface)] px-4 py-3">
                <Tag size={16} className="text-muted-foreground" />
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Add promo code"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
              <button className="rounded-full bg-black px-5 text-sm font-medium text-white">Apply</button>
            </form>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-sm font-medium text-white transition hover:bg-black/90">
              Go to Checkout <ArrowRight size={16} />
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`font-bold ${valueClass}`}>{value}</dd>
    </div>
  );
}
