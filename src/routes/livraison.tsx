import { createFileRoute } from "@tanstack/react-router";
import { Truck, RotateCcw, ShieldCheck, Package } from "lucide-react";

export const Route = createFileRoute("/livraison")({
  head: () => ({
    meta: [
      { title: "Livraison & retours — O Turquoise" },
      { name: "description", content: "Modalités de livraison et politique de retours O Turquoise." },
    ],
  }),
  component: Livraison,
});

function Livraison() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="font-display text-5xl font-light sm:text-6xl">Livraison & retours</h1>
      <p className="mt-4 text-base text-muted-foreground">
        Une expérience d'achat à la hauteur de nos parfums.
      </p>

      <div className="mt-12 space-y-5">
        <Card icon={<Truck className="h-5 w-5" />} title="Expédition rapide">
          Vos commandes sont préparées et expédiées sous 24 à 48 heures ouvrées depuis nos ateliers.
          Suivi de colis envoyé par email.
        </Card>

        <Card icon={<Package className="h-5 w-5" />} title="Livraison soignée">
          Livraison standard à <strong className="text-foreground">9,90 €</strong> en France métropolitaine (3 à 5 jours).
          <br />
          <strong className="text-foreground">Livraison offerte</strong> dès 200 € d'achat.
        </Card>

        <Card icon={<RotateCcw className="h-5 w-5" />} title="Retours sous 14 jours">
          Vous disposez de 14 jours pour nous retourner un produit non ouvert et non utilisé, dans son emballage d'origine.
          Le remboursement est effectué sous 7 jours après réception.
        </Card>

        <Card icon={<ShieldCheck className="h-5 w-5" />} title="Authenticité garantie">
          Tous nos parfums sont 100% authentiques, conservés dans des conditions optimales, scellés d'origine.
        </Card>
      </div>
    </div>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-card transition-all hover:shadow-elegant">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-soft text-primary shadow-soft">
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-xl">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
        </div>
      </div>
    </div>
  );
}
