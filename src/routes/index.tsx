import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, Gift } from "lucide-react";
import { PRODUCTS } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { SplineScene } from "@/components/site/SplineScene";
import { OttomanRosette } from "@/components/site/OttomanRosette";
import { Marquee } from "@/components/site/Marquee";
import { Parallax } from "@/components/site/Parallax";

const FAQ = [
  {
    q: "Quels parfums propose O Turquoise ?",
    a: "O Turquoise propose une sélection rare de parfums de luxe : Baccarat Rouge 540 de Maison Francis Kurkdjian, Bleu de Chanel et Grand Soir. Une boutique indépendante dédiée à la haute parfumerie.",
  },
  {
    q: "Le parfum Baccarat Rouge 540 est-il disponible ?",
    a: "Oui. Baccarat Rouge 540 — Maison Francis Kurkdjian est disponible en flacon 70 ml sur O Turquoise, authentique et scellé d'origine.",
  },
  {
    q: "La livraison est-elle proposée en France ?",
    a: "Oui, la livraison standard est offerte en France métropolitaine. Vos commandes sont expédiées sous 24 à 48 h ouvrées avec un suivi par email.",
  },
  {
    q: "Comment commander un parfum sur O Turquoise ?",
    a: "Sélectionnez votre parfum dans la boutique, ajoutez-le au panier puis validez la commande. L'achat se fait en quelques clics, en ligne, en toute sécurité.",
  },
  {
    q: "Les parfums vendus sont-ils 100% authentiques et officiels ?",
    a: "Tous nos parfums sont garantis 100% authentiques, neufs et scellés d'origine, issus du circuit de distribution officiel des maisons. O Turquoise est une boutique indépendante non affiliée officiellement aux marques distribuées.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => {
    const heroImg = PRODUCTS[0]?.image;
    return {
      meta: [
        { title: "O Turquoise — Boutique de parfum premium en ligne" },
        { name: "description", content: "O Turquoise, boutique indépendante de parfums de luxe en ligne. Baccarat Rouge 540, Bleu de Chanel, Grand Soir. Authenticité garantie, livraison offerte en France." },
        { name: "keywords", content: "O Turquoise, parfum, boutique de parfum, parfum de luxe, parfum premium, parfum en ligne, Baccarat Rouge 540, Maison Francis Kurkdjian, Bleu de Chanel, Grand Soir" },
        { property: "og:title", content: "O Turquoise — Boutique de parfum premium en ligne" },
        { property: "og:description", content: "Sélection rare de parfums de luxe authentiques. Baccarat Rouge 540, Bleu de Chanel, Grand Soir — livraison offerte en France." },
        { property: "og:url", content: "https://oturquoise.lovable.app/" },
        { property: "og:type", content: "website" },
        ...(heroImg ? [
          { property: "og:image" as const, content: heroImg },
          { name: "twitter:image" as const, content: heroImg },
        ] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "O Turquoise — Boutique de parfum premium en ligne" },
        { name: "twitter:description", content: "Parfums de luxe authentiques. Livraison offerte en France." },
      ],
      links: [
        { rel: "canonical", href: "https://oturquoise.lovable.app/" },
        ...(heroImg ? [{ rel: "preload" as const, as: "image" as const, href: heroImg, fetchpriority: "high" as const }] : []),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
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
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-turquoise/20 bg-turquoise/5 px-2.5 py-1">
              <ShieldCheck className="h-3 w-3 text-turquoise" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-turquoise">Parfums authentiques officiels</span>
            </div>
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
                  alt={`Flacon ${hero.name} — ${hero.brand}, parfum de luxe disponible sur O Turquoise`}
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

      {/* TRUST — simple reassurance cards */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 pb-16 sm:px-6 sm:py-20 sm:pb-28">
          <Reveal>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.1)] ring-1 ring-black/[0.03]">
                <span className="inline-flex rounded-full bg-turquoise/10 p-1.5 text-turquoise">
                  <Truck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Livraison soignée</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Expédition rapide et suivie.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.1)] ring-1 ring-black/[0.03]">
                <span className="inline-flex rounded-full bg-turquoise/10 p-1.5 text-turquoise">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Parfums authentiques officiels</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Flacons neufs, scellés et issus du circuit de distribution officiel.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.1)] ring-1 ring-black/[0.03]">
                <span className="inline-flex rounded-full bg-turquoise/10 p-1.5 text-turquoise">
                  <Gift className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">Livraison offerte</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Sur toutes les commandes.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BRAND PRESENTATION — discreet SEO content */}
      <section className="border-t border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              O Turquoise, une boutique de parfum premium en ligne
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              O Turquoise est une boutique indépendante dédiée à la haute parfumerie. Nous sélectionnons
              quelques fragrances iconiques — comme <strong className="text-foreground">Baccarat Rouge 540</strong> de
              Maison Francis Kurkdjian, <strong className="text-foreground">Bleu de Chanel</strong> ou{" "}
              <strong className="text-foreground">Grand Soir</strong> — pour offrir une expérience d'achat
              raffinée, claire et sans compromis.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Produits authentiques officiels</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Tous nos parfums sont 100% authentiques, neufs, scellés et issus du circuit de distribution officiel des maisons.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Livraison soignée</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Expédition sous 24–48 h, livraison offerte en France métropolitaine.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Expérience client</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Conseils personnalisés et accompagnement attentif à chaque commande.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ — SEO */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Questions fréquentes</h2>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              Tout ce qu'il faut savoir avant de commander un parfum sur O Turquoise.
            </p>
            <dl className="mt-6 divide-y divide-border/60 rounded-2xl border border-border/60 bg-white">
              {FAQ.map((f) => (
                <details key={f.q} className="group p-4 sm:p-5">
                  <summary className="flex cursor-pointer items-start justify-between gap-3 text-sm font-medium text-foreground marker:hidden sm:text-base">
                    <span>{f.q}</span>
                    <span aria-hidden className="mt-0.5 text-turquoise transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <dd className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{f.a}</dd>
                </details>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
