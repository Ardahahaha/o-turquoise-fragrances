import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Se connecter — EAU TURQUOISE" },
      { name: "description", content: "Connexion et création de compte EAU TURQUOISE." },
    ],
  }),
  component: ConnexionPage,
});

function ConnexionPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (mode === "signup" && password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/connexion` },
        });
    setLoading(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    setMessage(
      mode === "signup"
        ? "Compte créé. Consultez votre boîte mail pour confirmer votre adresse."
        : "Connexion réussie.",
    );
  }

  async function handleOAuth(provider: "google" | "apple") {
    setMessage("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/connexion` },
    });
    if (error) {
      setLoading(false);
      setMessage(error.message);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setMessage("Saisissez d'abord votre adresse email.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/connexion`,
    });
    setLoading(false);
    setMessage(error ? error.message : "Un email de réinitialisation vous a été envoyé.");
  }

  if (userEmail) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-16">
        <div className="auth-form text-center">
          <h1 className="text-2xl font-semibold">Vous êtes connecté</h1>
          <p className="auth-description">{userEmail}</p>
          <button className="auth-submit" type="button" onClick={() => supabase.auth.signOut()}>
            Se déconnecter
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-12 sm:py-16">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <p className="auth-eyebrow">EAU TURQUOISE</p>
          <h1 className="auth-title">{mode === "signin" ? "Se connecter" : "Créer un compte"}</h1>
          <p className="auth-description">
            {mode === "signin" ? "Retrouvez votre espace personnel." : "Rejoignez la maison EAU TURQUOISE."}
          </p>
        </div>

        <div className="auth-field">
          <label htmlFor="auth-email">Email</label>
          <div className="auth-input-form">
            <Mail aria-hidden size={20} />
            <input
              id="auth-email"
              className="auth-input"
              type="email"
              autoComplete="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="auth-password">Mot de passe</label>
          <div className="auth-input-form">
            <LockKeyhole aria-hidden size={20} />
            <input
              id="auth-password"
              className="auth-input"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="Votre mot de passe"
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              className="auth-eye"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        {mode === "signup" && (
          <div className="auth-field">
            <label htmlFor="auth-confirm-password">Confirmer le mot de passe</label>
            <div className="auth-input-form">
              <LockKeyhole aria-hidden size={20} />
              <input
                id="auth-confirm-password"
                className="auth-input"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirmez votre mot de passe"
                minLength={6}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          </div>
        )}

        {mode === "signin" && (
          <div className="auth-row">
            <label className="auth-remember"><input type="checkbox" defaultChecked /> Se souvenir de moi</label>
            <button className="auth-link" type="button" onClick={handleForgotPassword}>Mot de passe oublié ?</button>
          </div>
        )}

        {message && <p className="auth-message" role="status">{message}</p>}

        <button className="auth-submit" type="submit" disabled={loading}>
          {loading ? "Chargement…" : mode === "signin" ? "Se connecter" : "S'inscrire"}
        </button>

        <p className="auth-switch">
          {mode === "signin" ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}{" "}
          <button
            className="auth-link"
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setMessage("");
            }}
          >
            {mode === "signin" ? "S'inscrire" : "Se connecter"}
          </button>
        </p>

        <div className="auth-divider"><span>ou continuer avec</span></div>
        <div className="auth-social-row">
          <button className="auth-social" type="button" onClick={() => handleOAuth("google")} disabled={loading}>
            <svg aria-hidden width="20" height="20" viewBox="0 0 512 512">
              <path fill="#FBBB00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732l58.006 10.632 25.404 57.644A152.4 152.4 0 0 0 103.821 256c0 18.792 3.404 36.797 9.649 53.408Z" />
              <path fill="#518EF8" d="M507.527 208.176A257.2 257.2 0 0 1 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-73.058-3.741-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899Z" />
              <path fill="#28B446" d="M416.253 455.624C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262Z" />
              <path fill="#F14336" d="m419.404 58.936-82.933 67.896c-23.335-14.586-50.919-23.012-80.471-23.012-66.729 0-123.429 42.957-143.965 102.724l-83.411-68.276C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936Z" />
            </svg>
            Google
          </button>
          <button className="auth-social" type="button" onClick={() => handleOAuth("apple")} disabled={loading}>
            <svg aria-hidden width="20" height="20" viewBox="0 0 22.773 22.773">
              <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0Zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209Z" />
            </svg>
            Apple
          </button>
        </div>
      </form>
    </section>
  );
}
