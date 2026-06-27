import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — O Turquoise" },
      { name: "description", content: "Contactez O Turquoise pour toute question sur nos parfums." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="font-display text-5xl font-light sm:text-6xl">Contact</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Une question, un conseil ? Notre équipe est à votre écoute.
        </p>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-14">
        <div className="space-y-5">
          <Info icon={<Mail className="h-4 w-4" />} title="Email">contact@oturquoise.com</Info>
          <Info icon={<Phone className="h-4 w-4" />} title="Téléphone">+33 1 23 45 67 89</Info>
          <Info icon={<MapPin className="h-4 w-4" />} title="Adresse">Paris, France</Info>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-3xl border border-border/60 bg-gradient-soft p-6 shadow-elegant sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom" id="name" type="text" required />
            <Field label="Email" id="email" type="email" required />
          </div>
          <Field label="Sujet" id="subject" type="text" className="mt-4" />
          <div className="mt-4">
            <label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Message</label>
            <textarea
              id="message"
              rows={5}
              required
              className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <button
            type="submit"
            disabled={sent}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background shadow-elegant transition-all hover:bg-primary hover:shadow-glow disabled:opacity-70"
          >
            {sent ? (<><Check className="h-4 w-4" /> Message envoyé</>) : (<><Send className="h-4 w-4" /> Envoyer le message</>)}
          </button>
        </form>
      </div>
    </div>
  );
}

function Info({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background p-5 shadow-card">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
        <p className="mt-1 truncate text-sm text-foreground">{children}</p>
      </div>
    </div>
  );
}

function Field({ label, id, type, required, className = "" }: { label: string; id: string; type: string; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
    </div>
  );
}
