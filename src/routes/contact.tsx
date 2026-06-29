import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Conseils parfumerie O Turquoise" },
      { name: "description", content: "Une question sur nos parfums ou votre commande ? Contactez l'équipe O Turquoise par email, téléphone ou via notre formulaire." },
      { property: "og:title", content: "Contact — O Turquoise" },
      { property: "og:description", content: "Notre équipe est à votre écoute pour tout conseil parfumerie." },
      { property: "og:url", content: "https://oturquoise.lovable.app/contact" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://oturquoise.lovable.app/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">Contact</h1>
        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
          Une question, un conseil ? Notre équipe est à votre écoute.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.4fr] md:gap-10">
        <div className="space-y-3">
          <Info icon={<Mail className="h-3.5 w-3.5" />} title="Email">contact@oturquoise.com</Info>
          <Info icon={<Phone className="h-3.5 w-3.5" />} title="Téléphone">+33 1 23 45 67 89</Info>
          <Info icon={<MapPin className="h-3.5 w-3.5" />} title="Adresse">Paris, France</Info>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border/70 bg-secondary/40 p-5 sm:p-7"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Nom" id="name" type="text" required />
            <Field label="Email" id="email" type="email" required />
          </div>
          <Field label="Sujet" id="subject" type="text" className="mt-3" />
          <div className="mt-3">
            <label htmlFor="message" className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Message</label>
            <textarea
              id="message"
              rows={5}
              required
              className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={sent}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-70 sm:text-sm"
          >
            {sent ? (<><Check className="h-3.5 w-3.5" /> Message envoyé</>) : (<><Send className="h-3.5 w-3.5" /> Envoyer le message</>)}
          </button>
        </form>
      </div>
    </div>
  );
}

function Info({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-background p-3.5">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-foreground">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{title}</p>
        <p className="mt-0.5 truncate text-sm text-foreground">{children}</p>
      </div>
    </div>
  );
}

function Field({ label, id, type, required, className = "" }: { label: string; id: string; type: string; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-foreground"
      />
    </div>
  );
}
