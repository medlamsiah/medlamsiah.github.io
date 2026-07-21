"use client";

import {
  CheckCircle2,
  Download,
  FileText,
  LogOut,
  RefreshCw,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import type { CvInfo } from "@/lib/cv-storage";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} octets`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function formatDate(value: string | null) {
  if (!value) return "Version incluse au portfolio";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminDashboard({
  initialCv,
  blobConfigured,
  adminEmail,
}: {
  initialCv: CvInfo;
  blobConfigured: boolean;
  adminEmail: string;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [cv, setCv] = useState(initialCv);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.set("file", selectedFile);
      const response = await fetch("/api/admin/cv", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { error?: string; cv?: CvInfo };

      if (!response.ok || !data.cv) {
        setError(data.error ?? "Le remplacement du CV a échoué.");
        return;
      }

      setCv(data.cv);
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
      setMessage("Le nouveau CV est maintenant publié.");
      router.refresh();
    } catch {
      setError("Le serveur est momentanément indisponible.");
    } finally {
      setUploading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-heading">
        <div>
          <span className="eyebrow">Tableau de bord</span>
          <h1>Bonjour Mohamed.</h1>
          <p>Gérez la version publique de votre CV depuis un seul endroit.</p>
        </div>
        <button className="admin-logout" type="button" onClick={logout}>
          <LogOut size={17} aria-hidden="true" /> Déconnexion
        </button>
      </div>

      <div className="admin-status-grid">
        <article className="admin-status-card">
          <span className="admin-status-icon">
            <FileText size={22} aria-hidden="true" />
          </span>
          <small>Document public</small>
          <strong>{cv.pathname.split("/").at(-1)}</strong>
          <p>{formatBytes(cv.size)} · {formatDate(cv.uploadedAt)}</p>
          <a href="/api/cv" target="_blank" rel="noreferrer">
            <Download size={16} aria-hidden="true" /> Ouvrir le CV actuel
          </a>
        </article>

        <article className="admin-status-card">
          <span className="admin-status-icon admin-status-success">
            <CheckCircle2 size={22} aria-hidden="true" />
          </span>
          <small>Compte administrateur</small>
          <strong>Accès protégé</strong>
          <p>{adminEmail}</p>
          <span className="status-chip">Session active</span>
        </article>
      </div>

      <form className="cv-upload-card" onSubmit={handleUpload}>
        <div className="upload-card-copy">
          <span className="admin-icon"><UploadCloud size={24} /></span>
          <div>
            <h2>Remplacer le CV</h2>
            <p>
              Choisissez un PDF de moins de 8 Mo. L’ancienne version sera
              remplacée immédiatement, sans déploiement.
            </p>
          </div>
        </div>

        <label className="file-drop" htmlFor="cv-file">
          <input
            ref={inputRef}
            id="cv-file"
            name="file"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(event) => {
              setSelectedFile(event.target.files?.[0] ?? null);
              setError("");
              setMessage("");
            }}
          />
          <FileText size={25} aria-hidden="true" />
          <span>
            {selectedFile ? selectedFile.name : "Sélectionner un nouveau PDF"}
          </span>
          <small>
            {selectedFile
              ? formatBytes(selectedFile.size)
              : "PDF uniquement · 8 Mo maximum"}
          </small>
        </label>

        {message ? (
          <p className="form-message form-success" role="status">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="form-message form-error" role="alert">
            {error}
          </p>
        ) : null}
        {!blobConfigured ? (
          <p className="form-message form-warning">
            Le stockage sera actif dès que Vercel Blob sera connecté au projet.
          </p>
        ) : null}

        <button
          className="button button-primary upload-button"
          type="submit"
          disabled={!selectedFile || uploading || !blobConfigured}
        >
          <RefreshCw
            className={uploading ? "is-spinning" : ""}
            size={18}
            aria-hidden="true"
          />
          {uploading ? "Publication…" : "Publier ce CV"}
        </button>
      </form>
    </section>
  );
}
