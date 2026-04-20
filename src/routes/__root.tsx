import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { Layout } from "@/components/Layout";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SHOP.CO — Find Clothes That Match Your Style" },
      {
        name: "description",
        content:
          "SHOP.CO is a modern fashion marketplace with 200+ international brands, 2,000+ high-quality products, and 30,000+ happy customers.",
      },
      { property: "og:title", content: "SHOP.CO — Find Clothes That Match Your Style" },
      { property: "og:description", content: "Modern fashion marketplace with curated brands and styles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CartProvider>
      <Layout>
        <Outlet />
      </Layout>
      <Toaster />
    </CartProvider>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display text-6xl font-black">404</h1>
        <p className="mt-3 text-muted-foreground">Page not found.</p>
        <a
          href="/"
          className="mt-6 inline-flex items-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white hover:bg-black/90"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
