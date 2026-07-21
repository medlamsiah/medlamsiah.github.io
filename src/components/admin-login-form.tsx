"use client";

import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";

export function AdminLoginForm({ configured }: { configured: boolean }) {
  const [email, setEmail] = useState("mohamedlamsiah33@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Connexion impossible.");
        return;
      }

      window.location.reload();
    } catch {
      setError("Le serveur est momentanément indisponible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="admin-login-card">
      <div className="admin-login-intro">
        <span className="admin-icon">
          <LockKeyhole size={24} aria-hidden="true" />
        </span>
        <span className="eyebrow">Espace privé</span>
        <h1>Administration du portfolio</h1>
        <p>
          Connectez-vous pour remplacer le CV publié sans toucher au code ni
          relancer un déploiement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <label htmlFor="admin-email">Adresse e-mail</label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="admin-password">Mot de passe</label>
        <div className="password-field">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
          <button
            type="button"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error ? (
          <p className="form-message form-error" role="alert">
            {error}
          </p>
        ) : null}
        {!configured ? (
          <p className="form-message form-warning">
            Les identifiants seront activés lors de la configuration Vercel.
          </p>
        ) : null}

        <button
          className="button button-primary admin-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>

      <div className="admin-security-note">
        <ShieldCheck size={18} aria-hidden="true" />
        <span>Session sécurisée, cookie HTTP-only et expiration automatique.</span>
      </div>
    </section>
  );
}
