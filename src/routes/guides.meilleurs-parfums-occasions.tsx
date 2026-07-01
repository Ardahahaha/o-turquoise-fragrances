import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export const Route = createFileRoute("/guides/meilleurs-parfums-occasions")({
  component: GuidePage,
  head: () => ({
    meta: [
      { title: "Les meilleurs parfums de luxe pour les grandes occasions — EAU TURQUOISE" },
      { name: "description", content: "Découvrez notre guide des parfums de luxe idéaux pour les grandes occasions : Baccarat Rouge 540, Grand Soir, Bleu de Chanel. Conseils et sélection EAU TURQUOISE." },
      { name: "keywords", content: "parfum luxe, parfum occasion, Baccarat Rouge 540, Grand Soir, Bleu de Chanel, parfum soirée, parfum cadeau" },
      { property: "og:title", content: "Les meilleurs parfums de luxe pour les grandes occasions — EAU TURQUOISE" },
      { property: "og:description", content: "Guide parfum : quels flacons de luxe choisir pour un mariage, un gala ou un dîner romantique ?" },
      { property: "og:url", content: "https://eauturquoise.lovable.app/guides/meilleurs-parfums-occasions" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Les meilleurs parfums de luxe pour les grandes occasions — EAU TURQUOISE" },
      { name: "twitter:description", content: "Guide parfum : quels flacons de luxe choisir pour un mariage, un gala ou un dîner romantique ?" },
    ],
    links: [
      { rel: "canonical", href: "https://eauturquoise.lovable.app/guides/meilleurs-parfums-occasions" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Les meilleurs parfums de luxe pour les grandes occasions",
          author: { "@type": "Organization", name: "EAU TURQUOISE" },
          publisher: { "@type": "Organization", name: "EAU TURQUOISE", url: "https://eauturquoise.lovable.app" },
          datePublished: "2026-07-01",
          dateModified: "2026-07-01",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://eauturquoise.lovable.app/guides/meilleurs-parfums-occasions",
          },
        }),
      },
    ],
  }),
});

function GuidePage() {
  const baccarat = PRODUCTS.find((p) => p.id === "baccarat-rouge-540");
  const grandSoir = PRODUCTS.find((p) => p.id === "grand-soir");
  const bleuChanel = PRODUCTS.find((p) => p.id === "bleu-de-chanel");

  return (
    <main className="relative mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l'accueil
      </Link>

      <h1 className="mb-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Les meilleurs parfums de luxe pour les grandes occasions
      </h1>
      <p className="mb-10 text-sm leading-relaxed text-muted-foreground">
        Choisir un parfum pour un événement important, c'est comme choisir une tenue : l'odeur doit
        marquer les esprits sans jamais les assommer. Voici notre sélection de parfums d'exception,
        disponibles chez EAU TURQUOISE, pour sublimer vos soirées, cérémonies et moments inoubliables.
      </p>

      <section className="mb-12">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">
          Pour les soirées chics et les cérémonies
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les fragrances orientales et ambrées ont ce pouvoir hypnotique qui accompagne parfaitement une
          robe de soirée ou un smoking. Elles laissent une trainée élégante et sophistiquée.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[baccarat, grandSoir].filter(Boolean).map((product) => (
            <Link
              key={product!.id}
              to="/produit/$id"
              params={{ id: product!.id }}
              className="group rounded-2xl border border-border/70 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60">
                <Sparkles className="h-5 w-5 text-turquoise" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{product!.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{product!.price} €</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">
          Pour un quotidien raffiné
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Un parfum d'exception n'est pas réservé aux grands soirs. Certains flacons apportent une
          signature fraîche et distinguée qui convient aussi bien au bureau qu'à un rendez-vous.
        </p>
        <div className="mt-6">
          {bleuChanel && (
            <Link
              to="/produit/$id"
              params={{ id: bleuChanel.id }}
              className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/60">
                <Sparkles className="h-5 w-5 text-turquoise" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{bleuChanel.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{bleuChanel.price} €</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">
          Comment choisir son parfum de luxe ?
        </h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="font-medium text-foreground">1.</span>
            <span>
              <strong className="text-foreground">L'occasion :</strong> un parfum puissant et boisé pour
              le soir, un citrus frais pour la journée.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-medium text-foreground">2.</span>
            <span>
              <strong className="text-foreground">La saison :</strong> les notes ambrées et épicées
              réchauffent l'hiver ; les notes aquatiques et florales rafraîchissent l'été.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-medium text-foreground">3.</span>
            <span>
              <strong className="text-foreground">La personnalité :</strong> choisissez une fragrance qui
              vous ressemble et qui vous accompagne au fil des heures.
            </span>
          </li>
        </ul>
      </section>

      <div className="rounded-2xl border border-border/70 bg-white p-6 text-center shadow-sm">
        <p className="mb-4 text-sm text-muted-foreground">
          Découvrez toute notre sélection de parfums authentiques en ligne.
        </p>
        <Button asChild className="h-11 rounded-full px-6 text-sm font-medium shadow-md">
          <Link to="/boutique">Voir la boutique</Link>
        </Button>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        EAU TURQUOISE est une boutique indépendante et n'est pas affiliée officiellement aux maisons de
        parfum mentionnées. Tous les flacons sont garantis authentiques et scellés d'origine.
      </p>
    </main>
  );
}
