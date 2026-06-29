import { createFileRoute, Link } from "@tanstack/react-router";
import { DisplayCards } from "@/components/site/DisplayCards";
import { PRODUCTS } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { SplineScene } from "@/components/site/SplineScene";
import { OttomanRosette } from "@/components/site/OttomanRosette";
import { Marquee } from "@/components/site/Marquee";
import { Parallax } from "@/components/site/Parallax";

export const Route = createFileRoute("/")({
  head: () => {
    const heroImg = PRODUCTS[0]?.image;
    return {
      meta: [
        { title: "O Turquoise — Parfums de luxe authentiques en ligne" },
        { name: "description", content: "Boutique indépendante de parfums d'exception. Baccarat Rouge 540, Bleu de Chanel, Grand Soir. Authenticité garantie, livraison offerte en France." },
        { property: "og:title", content: "O Turquoise — Parfums de luxe authentiques" },
        { property: "og:description", content: "Sélection rare de fragrances iconiques, livrées avec exigence." },
        { property: "og:url", content: "https://oturquoise.lovable.app/" },
        { property: "og:type", content: "website" },
      ],
      links: [
        { rel: "canonical", href: "https://oturquoise.lovable.app/" },
        ...(heroImg ? [{ rel: "preload" as const, as: "image" as const, href: heroImg, fetchpriority: "high" as const }] : []),
      ],
    };
  },
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
                className="mx-auto h-72 w-full overflow-hidden rounded-[2rem] ring-1 ring-black/5 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_20px_40px_-20px_rgba(15,23,42,0.35),0_40px_80px_-40px_rgba(15,23,42,0.25)]"
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
            <div className="mb-2 flex justify-center sm:mb-3">
              <OttomanRosette className="h-8 w-8 text-turquoise/25 sm:h-10 sm:w-10" />
            </div>
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
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[rgba(30,60,110,0.5)] bg-[rgba(40,75,130,0.35)] px-8 py-3.5 text-sm font-medium text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-8px_14px_-6px_rgba(20,45,95,0.75),0_14px_36px_-10px_rgba(20,45,95,0.7)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-0.5 hover:border-[rgba(30,60,110,0.75)] hover:bg-[rgba(40,75,130,0.5)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),inset_0_-10px_18px_-6px_rgba(20,45,95,0.9),0_24px_50px_-12px_rgba(20,45,95,0.85)] sm:px-10 sm:py-4 sm:text-base"
              >
                {/* Specular highlight */}
                <span className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/70 to-transparent opacity-80" />
                {/* Liquid shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                {/* Deep blue glow underlay */}
                <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,45,95,0.85),transparent_70%)] opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
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
            <Parallax amount={28} className="relative mx-auto mt-10 max-w-md sm:mt-14 sm:max-w-lg">
              {/* glow halo */}
              <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.18),transparent_60%)] blur-2xl" />
              <div className="glass mx-auto rounded-3xl p-6 sm:p-10">
                <img
                  src={hero.image}
                  alt={hero.name}
                  width={760}
                  height={760}
                  fetchPriority="high"
                  decoding="async"
                  className="mx-auto w-full max-w-[260px] sm:max-w-[380px]"
                />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* MARQUEE — notes olfactives */}
      <Marquee
        items={[
          "Safran",
          "Ambroxan",
          "Jasmin sambac",
          "Cèdre du Liban",
          "Bergamote",
          "Iris",
          "Oud",
          "Vétiver",
          "Ambre gris",
          "Néroli",
        ]}
      />


      {/* PRODUCT GRID */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-4 sm:px-6 sm:pt-20 sm:pb-6">
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

      {/* TRUST — stacked display cards */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 pb-16 sm:px-6 sm:py-16 sm:pb-20">
          <Reveal>
            <div className="flex w-full items-end justify-center">
              <DisplayCards />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
