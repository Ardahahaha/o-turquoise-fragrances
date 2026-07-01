import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import ogImage from "@/assets/og-image.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AmbientBackground } from "@/components/site/AmbientBackground";
import { ShaderBackground } from "@/components/site/ShaderBackground";
import { SplashScreen } from "@/components/site/SplashScreen";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-light text-foreground">404</h1>
        <h2 className="mt-4 font-display text-xl text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-elegant"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-foreground">Cette page n'a pas pu se charger</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur est survenue. Essayez de rafraîchir ou retournez à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-elegant"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "uKnL5hKLieW0mgPdZAG-Gp1k2fm-XwCVI9NLU3f0uIw" },
      { title: "EAU TURQUOISE — Parfums d'exception" },
      { name: "description", content: "EAU TURQUOISE, boutique indépendante de parfums de luxe. Découvrez Baccarat Rouge 540 — Maison Francis Kurkdjian." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "EAU TURQUOISE" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "EAU TURQUOISE",
          url: "https://eauturquoise.lovable.app",
          logo: ogImage.url,
          description:
            "EAU TURQUOISE — boutique indépendante en ligne de parfums de luxe : Baccarat Rouge 540, Bleu de Chanel, Grand Soir. Authenticité garantie, livraison offerte en France.",
          contactPoint: {
            "@type": "ContactPoint",
            email: "contact@eauturquoise.com",
            contactType: "customer support",
            areaServed: "FR",
            availableLanguage: ["French"],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "EAU TURQUOISE",
          url: "https://eauturquoise.lovable.app",
          inLanguage: "fr-FR",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://eauturquoise.lovable.app/boutique?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <SplashScreen />
        <ShaderBackground />
        <AmbientBackground />
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
