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
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Livraison & retours</h1>
      <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
        Une expérience d'achat à la hauteur de nos parfums.
      </p>

      <div className="mt-8 space-y-3">
        <Card icon={<Truck className="h-4 w-4" />} title="Expédition rapide">
          Commandes préparées et expédiées sous 24 à 48 h ouvrées. Suivi par email.
        </Card>
        <Card icon={<Package className="h-4 w-4" />} title="Livraison soignée">
          Livraison standard <strong className="text-foreground">9,90 €</strong> en France (3 à 5 jours).{" "}
          <strong className="text-foreground">Offerte</strong> dès 200 €.
        </Card>
        <Card icon={<RotateCcw className="h-4 w-4" />} title="Retours sous 14 jours">
          14 jours pour retourner un produit non ouvert dans son emballage d'origine. Remboursement sous 7 jours.
        </Card>
        <Card icon={<ShieldCheck className="h-4 w-4" />} title="Authenticité garantie">
          Tous nos parfums sont 100% authentiques, scellés d'origine.
        </Card>
      </div>
    </div>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-foreground">
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-medium sm:text-base">{title}</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
}
