import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { PRODUCTS } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { SplineScene } from "@/components/site/SplineScene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Turquoise — Parfums d'exception" },
      { name: "description", content: "Boutique indépendante de parfums de luxe. Baccarat Rouge 540, Bleu de Chanel, Grand Soir." },
    ],
  }),
  component: Home,
});

function Home() {
  const hero = PRODUCTS[0];

  return (
    <div>
      {/* HERO — glass card floating over ambient orbs */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 text-center sm:px-6 sm:pb-16 sm:pt-20">
          <Reveal>
            <div className="relative mx-auto mb-6 w-full max-w-md">
              <SplineScene
                scene="https://prod.spline.design/YRhHJGoKUEx8ehQd/scene.splinecode"
                className="mx-auto h-72 w-full overflow-hidden"
                zoom={0.3}
              />
              {/* Texte O Turquoise par-dessus l'animation */}
              <div className="pointer-events-none absolute inset-x-0 bottom-12 flex justify-center sm:bottom-16">
                <span className="text-2xl font-semibold tracking-[-0.04em] text-foreground/60 sm:text-3xl">
                  O TURQUOISE
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Maison indépendante</p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              La haute parfumerie.
              <br />
              <span className="text-muted-foreground">Choisie avec soin.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:mt-5 sm:max-w-lg sm:text-base">
              Une sélection rare de fragrances iconiques, livrées avec exigence.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-5 flex items-center justify-center gap-3 sm:mt-7">
              <Link
                to="/boutique"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[rgba(198,160,110,0.45)] bg-[rgba(220,185,140,0.35)] px-8 py-3.5 text-sm font-medium text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7),inset_0_-8px_14px_-6px_rgba(190,150,95,0.7),0_14px_36px_-10px_rgba(190,150,95,0.75)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-0.5 hover:border-[rgba(198,160,110,0.7)] hover:bg-[rgba(220,185,140,0.5)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),inset_0_-10px_18px_-6px_rgba(190,150,95,0.85),0_24px_50px_-12px_rgba(190,150,95,0.9)] sm:px-10 sm:py-4 sm:text-base"
              >
                {/* Specular highlight */}
                <span className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/70 to-transparent opacity-80" />
                {/* Liquid shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                {/* Beige glow underlay */}
                <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(190,150,95,0.85),transparent_70%)] opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative">Acheter</span>
                <svg className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <Link
                to="/produit/$id"
                params={{ id: hero.id }}
                className="inline-flex items-center justify-center text-xs font-medium text-foreground underline-offset-4 hover:underline sm:text-sm"
              >
                En savoir plus &rsaquo;
              </Link>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="relative mx-auto mt-10 max-w-md sm:mt-14 sm:max-w-lg">
              {/* glow halo */}
              <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,191,166,0.10),transparent_60%)] blur-2xl" />
              <div className="glass mx-auto rounded-3xl p-6 sm:p-10">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="mx-auto w-full max-w-[260px] sm:max-w-[380px]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <Reveal>
          <div className="mb-6 flex items-end justify-between sm:mb-10">
            <div>
              <h2 className="text-xl font-semibold tracking-tight sm:text-3xl">Nos parfums</h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Trois signatures, trois univers.</p>
            </div>
            <Link to="/boutique" className="text-xs font-medium text-foreground underline-offset-4 hover:underline sm:text-sm">
              Tout voir &rsaquo;
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <Reveal>
            <div className="glass grid gap-5 rounded-2xl p-5 sm:grid-cols-3 sm:gap-6 sm:p-8">
              <Trust icon={<Truck className="h-4 w-4" />} title="Livraison soignée" text="Expédition rapide et suivie." />
              <Trust icon={<ShieldCheck className="h-4 w-4" />} title="Authenticité garantie" text="Flacons originaux scellés." />
              <Trust icon={<RotateCcw className="h-4 w-4" />} title="Retours 14 jours" text="Simple, sans condition." />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Trust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/70 text-foreground ring-1 ring-white/80 backdrop-blur">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
