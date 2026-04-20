import { Link } from "@tanstack/react-router";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

const COLS = [
  { title: "Company", links: ["About", "Features", "Works", "Career"] },
  { title: "Help", links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"] },
  { title: "FAQ", links: ["Account", "Manage Deliveries", "Orders", "Payments"] },
  { title: "Resources", links: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"] },
];

function PayBadge({ label }: { label: string }) {
  return (
    <div className="flex h-7 w-12 items-center justify-center rounded-md border border-border bg-white text-[10px] font-semibold text-black">
      {label}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 bg-[var(--color-surface)] pb-6 pt-24">
      {/* Newsletter overlap */}
      <div id="newsletter" className="absolute inset-x-0 -top-28 px-4 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-black px-6 py-8 text-white md:flex-row md:items-center md:px-12 md:py-10">
          <h2 className="font-display text-3xl leading-tight md:text-4xl md:max-w-md">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full flex-col gap-3 md:w-auto md:min-w-[350px]"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full rounded-full bg-white px-5 py-3 text-sm text-black outline-none placeholder:text-muted-foreground"
            />
            <button className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90">
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="font-display text-2xl font-black">SHOP.CO</Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              We have clothes that suit your style and which you're proud to wear. From women to men.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Twitter, Facebook, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-black transition hover:bg-black hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="mb-5 text-sm font-medium uppercase tracking-[0.15em]">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">Shop.co © 2000-2025, All Rights Reserved</p>
          <div className="flex items-center gap-2">
            <PayBadge label="VISA" />
            <PayBadge label="MC" />
            <PayBadge label="PYPL" />
            <PayBadge label="APAY" />
            <PayBadge label="GPAY" />
          </div>
        </div>
      </div>
    </footer>
  );
}
