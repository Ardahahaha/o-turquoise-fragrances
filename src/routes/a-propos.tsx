import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Heart, Award } from "lucide-react";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — O Turquoise" },
      { name: "description", content: "Découvrez l'histoire et les valeurs de O Turquoise, boutique indépendante de parfums d'exception." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
            La Maison
          </span>
          <h1 className="mt-6 text-balance font-display text-5xl font-light leading-tight sm:text-6xl">
            L'art du parfum,<br />en toute simplicité.
          </h1>
          <p className="mt-6 text-balance text-base leading-relaxed text-muted-foreground">
            O Turquoise est une boutique indépendante dédiée à la haute parfumerie. Nous croyons qu'un parfum est bien plus qu'une fragrance : c'est une signature, un souvenir, une émotion.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <Value icon={<Sparkles className="h-5 w-5" />} title="Sélection rare" text="Chaque création est choisie pour son caractère, son histoire et sa qualité." />
          <Value icon={<Heart className="h-5 w-5" />} title="Service attentif" text="Une relation directe, un conseil personnalisé, une attention sincère." />
          <Value icon={<Award className="h-5 w-5" />} title="Authenticité" text="Des produits authentiques, soigneusement vérifiés et préservés." />
        </div>

        <div className="mt-16 rounded-3xl border border-border/60 bg-gradient-soft p-8 shadow-card sm:p-12">
          <h2 className="font-display text-3xl font-light sm:text-4xl">Notre engagement</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Nous travaillons avec une exigence d'orfèvre. Chaque commande est préparée avec soin, expédiée rapidement et accompagnée d'un mot. Parce que la haute parfumerie mérite un service à sa hauteur.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Notre première proposition met à l'honneur <span className="text-primary">Baccarat Rouge 540</span> de la Maison Francis Kurkdjian — une fragrance iconique, intemporelle et magnétique.
          </p>
        </div>
      </section>
    </div>
  );
}

function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
      <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft">
        {icon}
      </div>
      <p className="mt-4 font-display text-xl">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
