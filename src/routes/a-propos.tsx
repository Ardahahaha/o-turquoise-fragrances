import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Heart, Award } from "lucide-react";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — O Turquoise" },
      { name: "description", content: "L'histoire et les valeurs de O Turquoise, boutique indépendante de parfums d'exception." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-20">
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">La Maison</p>
          <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-5xl">
            L'art du parfum, en toute simplicité.
          </h1>
          <p className="mt-3 text-balance text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
            O Turquoise est une boutique indépendante dédiée à la haute parfumerie. Un parfum est bien plus qu'une fragrance : c'est une signature, un souvenir, une émotion.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          <Value icon={<Sparkles className="h-4 w-4" />} title="Sélection rare" text="Chaque création est choisie pour son caractère et sa qualité." />
          <Value icon={<Heart className="h-4 w-4" />} title="Service attentif" text="Un conseil personnalisé, une attention sincère." />
          <Value icon={<Award className="h-4 w-4" />} title="Authenticité" text="Des produits authentiques, soigneusement vérifiés." />
        </div>

        <div className="mt-10 rounded-2xl border border-border/70 bg-secondary/40 p-5 sm:mt-14 sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-2xl">Notre engagement</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Nous travaillons avec exigence. Chaque commande est préparée avec soin, expédiée rapidement, parce que la haute parfumerie mérite un service à sa hauteur.
          </p>
        </div>
      </section>
    </div>
  );
}

function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background p-4 sm:p-5">
      <div className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background">
        {icon}
      </div>
      <p className="mt-3 text-sm font-medium sm:text-base">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{text}</p>
    </div>
  );
}
