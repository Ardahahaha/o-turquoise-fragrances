import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Leaf } from "lucide-react";
import { BottlePlaceholder } from "@/components/site/BottlePlaceholder";
import { PRODUCT, formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Turquoise — Parfums d'exception" },
      { name: "description", content: "Boutique indépendante de parfums de luxe. Découvrez Baccarat Rouge 540 — Maison Francis Kurkdjian." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-14 sm:px-8 md:grid-cols-2 md:items-center md:gap-16 md:pb-28 md:pt-24">
          <div className="animate-fade-up text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3 w-3" /> Nouvelle sélection
            </span>
            <h1 className="mt-6 text-balance font-display text-5xl font-light leading-[1.05] sm:text-6xl md:text-7xl">
              L'élégance,<br />
              <span className="italic text-primary">en sillage.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-balance text-base leading-relaxed text-muted-foreground md:mx-0">
              O Turquoise célèbre la haute parfumerie. Une sélection rare, une signature inoubliable.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
              <Link
                to="/produit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background shadow-elegant transition-all hover:bg-primary hover:shadow-glow sm:w-auto"
              >
                Découvrir le parfum
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/a-propos"
                className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background/60 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary hover:text-primary sm:w-auto"
              >
                Notre maison
              </Link>
            </div>
          </div>

          <div className="animate-fade-up delay-200">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-primary opacity-20 blur-2xl" />
              <BottlePlaceholder className="h-[460px] animate-float" label="Baccarat Rouge 540" />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT FEATURE */}
      <section className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
          <BottlePlaceholder className="h-[420px] md:h-[520px]" />

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">{PRODUCT.brand}</p>
            <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">{PRODUCT.name}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{PRODUCT.short}</p>

            <div className="mt-7 rounded-2xl border border-border/60 bg-gradient-soft p-5 shadow-card">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Notes olfactives</p>
              <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                <NoteLine label="Tête" items={PRODUCT.notes.tete} />
                <NoteLine label="Cœur" items={PRODUCT.notes.coeur} />
                <NoteLine label="Fond" items={PRODUCT.notes.fond} />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-baseline gap-4">
              <span className="font-display text-3xl">{formatPrice(PRODUCT.price)}</span>
              <span className="text-sm text-muted-foreground">— 70 ml</span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/produit"
                className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:shadow-elegant"
              >
                Voir le parfum
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border/60 bg-gradient-soft">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-3 sm:px-8">
          <Trust icon={<Truck className="h-5 w-5" />} title="Livraison soignée" text="Expédition sous 24h, emballage premium." />
          <Trust icon={<ShieldCheck className="h-5 w-5" />} title="Paiement sécurisé" text="Vos transactions sont protégées." />
          <Trust icon={<Leaf className="h-5 w-5" />} title="Sélection rare" text="Une boutique indépendante, choisie avec soin." />
        </div>
      </section>
    </div>
  );
}

function NoteLine({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="font-display text-base text-primary">{label}</p>
      <p className="mt-1 text-muted-foreground">{items.join(" · ")}</p>
    </div>
  );
}

function Trust({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/20 bg-background text-primary shadow-soft">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-display text-lg">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
